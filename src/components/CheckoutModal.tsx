import React, { useState, useEffect } from 'react';
import { doc, serverTimestamp, writeBatch, setDoc } from 'firebase/firestore';
import { db, signInWithGoogle } from '../firebase.ts';
import { CartItem, Order, OrderItem } from '../types.ts';
import { DELIVERY_FEES, VIBER_PHONE } from '../products.ts';
import { ShieldCheck, Truck, Sparkles, AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, Upload, Phone, Copy } from 'lucide-react';
import { GcashQrCode } from './GcashQrCode.tsx';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  user: any;
  clearCart: () => void;
  toast: (msg: string, type?: 'success' | 'error' | 'info') => void;
  navigateToTracker: (orderId: string) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  user,
  clearCart,
  toast,
  navigateToTracker
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'Lalamove' | 'GrabExpress'>('Lalamove');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  // Payment Proof Screenshot State
  const [paymentProofBase64, setPaymentProofBase64] = useState('');
  const [proofImageName, setProofImageName] = useState('');

  // Final Order Response ID
  const [completedOrderId, setCompletedOrderId] = useState('');

  // Auto pre-fill with Google details on login
  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);


  const handleGoogleSignIn = async () => {
    try {
      const loggedUser = await signInWithGoogle();
      if (loggedUser) {
        toast(`Signed in as ${loggedUser.displayName || 'Researcher'}`, 'success');
      }
    } catch (err: any) {
      console.error("Google authentication failed in checkout:", err);
      toast(err?.message || 'Google Sign-In failed', 'error');
    }
  };

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const itemPrice = (item.product?.price ?? item.price ?? 0) + (item.selectedAddonPrice ?? 0);
    const itemQty = item.quantity ?? item.qty ?? 0;
    return acc + (itemPrice * itemQty);
  }, 0);
  const shippingFee = DELIVERY_FEES[deliveryMethod];
  const totalAmount = subtotal + shippingFee;

  // Phone validator
  const validatePhone = (num: string) => {
    const reg = /^09\d{9}$/;
    return reg.test(num);
  };

  // Step 1 Validation
  const handleNextStep1 = () => {
    if (!name.trim()) return toast('Please enter your full name', 'error');
    if (!email.trim() || !email.includes('@')) return toast('Please provide a valid email address', 'error');
    if (!validatePhone(phone)) return toast('Mobile phone must be in standard PH format: 09XXXXXXXXX', 'error');
    if (!address.trim()) return toast('Please specify your delivery address', 'error');
    if (!city.trim()) return toast('Please specify your city or municipality', 'error');
    setStep(2);
  };

  // GCash file upload proof
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Enforce 500KB constraint
    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      toast('File is too large! Standardize screenshot to be under 500KB', 'error');
      return;
    }

    setProofImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentProofBase64(reader.result as string);
      toast('Payment receipt uploaded successfully', 'success');
    };
    reader.readAsDataURL(file);
  };

  // Step 2 Validation
  const handleNextStep2 = () => {
    if (!paymentProofBase64) {
      return toast('Please upload GCash payment proof to continue', 'error');
    }
    setStep(3);
  };

  // Copy GCash number helper
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast('GCash registration detail copied', 'success');
  };

  // Cryptographically unique 6 chars order generation
  const generateOrderId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'PT-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Submit Order Final Setup
  const handleSubmitOrder = async () => {
    setLoading(true);
    const orderId = generateOrderId();

    const parsedItems: OrderItem[] = cartItems.map(item => {
      const price = (item.product?.price ?? item.price ?? 0) + (item.selectedAddonPrice ?? 0);
      const name = (item.product?.name ?? item.name ?? '') + (item.selectedAddonName && item.selectedAddonId !== 'vial_only' ? ` (${item.selectedAddonName})` : '');
      const quantity = item.quantity ?? item.qty ?? 0;
      return {
        product_id: String(item.product?.id ?? item.id ?? ''),
        product_name: name,
        quantity: quantity,
        price: price,
        subtotal: price * quantity
      };
    });

    const orderPayload: Order = {
      order_id: orderId,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      shipping_address: `${address}${notes ? ` (Notes: ${notes})` : ''}`,
      city: city,
      delivery_method: deliveryMethod,
      payment_method: 'GCash',
      payment_proof: paymentProofBase64,
      items: parsedItems,
      subtotal,
      shipping_fee: shippingFee,
      total_amount: totalAmount,
      status: 'Pending',
      created_at: new Date(), // Local fallback, serverTimestamp writes to firestore
      updated_at: new Date()
    };

    try {
      // Use Batch or Atomic Write to insert order and create initial status history subcollection
      const batch = writeBatch(db);
      
      const orderDocRef = doc(db, 'orders', orderId);
      batch.set(orderDocRef, {
        ...orderPayload,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
      });

      const historyDocRef = doc(db, `orders/${orderId}/status_history`, 'initial_placed');
      batch.set(historyDocRef, {
        status: 'Pending',
        updated_by: email,
        created_at: serverTimestamp()
      });

      // Deduct stocks in dynamic catalog database atomically
      for (const item of cartItems) {
        const productId = String(item.product?.id ?? item.id ?? '');
        if (productId) {
          const productRef = doc(db, 'products', productId);
          
          const currentStock = Number(item.product?.stock ?? item.stock ?? 10);
          const quantityOrdered = Number(item.quantity ?? item.qty ?? 0);
          const newStock = Math.max(0, currentStock - quantityOrdered);
          
          batch.set(productRef, {
            stock: newStock,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        }
      }

      await batch.commit();

      // Trigger EmailJS REST Confirmation trigger
      await triggerConfirmationEmail(orderPayload);

      setCompletedOrderId(orderId);
      setStep(4);
      toast('Order registered successfully ✔', 'success');
      clearCart();
    } catch (err: any) {
      console.error("Firestore order error:", err);
      const errMsg = err?.message || err?.code || String(err) || 'Unknown error';
      toast(`Order failed: ${errMsg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // EmailJS Direct Rest trigger to guard secrets
  const triggerConfirmationEmail = async (order: Order) => {
    // Standard system placeholders. Admins configure this.
    const serviceId = "default_service";
    const templateId = "EMAILJS_ORDER_TEMPLATE";
    const publicKey = "USER_PUBLIC_KEY";

    const formattedProductList = order.items.map(i => `${i.product_name} x ${itemLabel(i)} — ₱${i.price.toLocaleString()}`).join('\n');

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            order_id: order.order_id,
            order_date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            product_list: formattedProductList,
            subtotal: order.subtotal,
            shipping_fee: order.shipping_fee,
            total_amount: order.total_amount,
            delivery_method: order.delivery_method,
            shipping_address: `${order.shipping_address}, ${order.city}`
          }
        })
      });

      if (response.ok) {
        console.log("EmailJS order receipt dispatch complete.");
      } else {
        console.warn("EmailJS dispatcher returned status:", response.status);
      }
    } catch (err) {
      console.warn("Could not dispatch EmailJS dispatch. Offline mode active:", err);
    }
  };

  const itemLabel = (i: OrderItem) => `${i.quantity}v`;

  // Viber details pre-fill
  const openViber = () => {
    const itemsText = cartItems.map(i => `${i.product?.name ?? i.name ?? ''} x${i.quantity ?? i.qty ?? 0}`).join(', ');
    const msg = encodeURIComponent(
      `Hi VitaPep! My Order Details:\n` +
      `Order ID: ${completedOrderId}\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Address: ${address}, ${city}\n` +
      `Delivery: ${deliveryMethod}\n` +
      `Items: ${itemsText}\n` +
      `Total: ₱${totalAmount.toLocaleString()}\n` +
      `Payment: GCash (proof uploaded)`
    );
    window.open(`viber://chat?number=${VIBER_PHONE}&text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl rounded-2xl border border-border bg-bg-elevated shadow-2xl p-6 md:p-8 animate-scale-up max-h-[90vh] overflow-y-auto"
        id="checkout-modal-container"
        data-lenis-prevent
      >
        {/* Progress header slider */}
        {step < 4 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase text-text-muted mb-2">
              <span className={step === 1 ? 'text-accent font-bold' : ''}>1. Logistics</span>
              <span className={step === 2 ? 'text-accent font-bold' : ''}>2. Remittance</span>
              <span className={step === 3 ? 'text-accent font-bold' : ''}>3. Final Dispatch</span>
            </div>
            
            <div className="h-1.5 w-full bg-bg-deep rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 1: Logistics info or Sign-In barrier */}
        {step === 1 && !user && (
          <div className="space-y-6 py-6 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 border border-accent/25 text-accent mb-2">
              <ShieldCheck className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">Researcher Session Required</h3>
              <p className="text-xs text-text-muted mt-1.5 max-w-sm mx-auto leading-relaxed">
                To initialize chemical allocation and secure order tracking, please sign in with your Google account.
              </p>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="mx-auto w-full max-w-xs py-3 px-4 rounded-xl bg-white text-bg-deep font-bold text-xs hover:bg-white/90 flex items-center justify-center space-x-2.5 transition shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              <svg className="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.0.0.0/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.28c1.92,-1.78 3.03,-4.4 3.03,-7.4c0,-0.6 -0.05,-1.18 -0.16,-1.7Z" fill="#4285F4" />
                  <path d="M12,20.5c2.3,0 4.22,-0.76 5.62,-2.1l-3.28,-2.6c-0.9,0.6 -2.06,0.97 -3.34,0.97 -2.57,0 -4.75,-1.73 -5.53,-4.07H2.1v2.7c1.5,2.98 4.6,5.1 8.2,5.1Z" fill="#34A853" />
                  <path d="M6.47,12.7c-0.2,-0.6 -0.31,-1.24 -0.31,-1.9c0,-0.66 0.11,-1.3 0.31,-1.9V6.2H2.1C1.37,7.66 0.95,9.3 0.95,11c0,1.7 0.42,3.34 1.15,4.8l3.27,-2.5c-0.19,-0.6 -0.3,-1.24 -0.3,-1.9Z" fill="#FBBC05" />
                  <path d="M12,5.15c1.25,0 2.37,0.43 3.25,1.27l2.43,-2.43C16.21,2.53 14.29,1.7 12,1.7c-3.6,0 -6.7,2.12 -8.2,5.1l4.37,3.37c0.78,-2.34 2.96,-4.07 5.53,-4.07Z" fill="#EA4335" />
                </g>
              </svg>
              <span>Sign in with Google</span>
            </button>
            <div className="pt-4 border-t border-border flex justify-center">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono border border-border hover:bg-white/[0.02] rounded-lg text-text-muted hover:text-white cursor-pointer"
              >
                Abort
              </button>
            </div>
          </div>
        )}

        {step === 1 && user && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-white">Delivery & Client Logistics</h3>
              <p className="text-xs text-text-muted mt-0.5">Please provide Philippine local delivery destinations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Receiver Name</label>
                <input
                  type="text"
                  placeholder="Full legal name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-bg-deep px-3 py-2.5 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Email Coordinates</label>
                <input
                  type="email"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-bg-deep px-3 py-2.5 text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Mobile Cell (09xxxxxxxxx)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                  <input
                    type="tel"
                    placeholder="09171234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    className="w-full text-xs rounded-lg border border-border bg-bg-deep pl-9 pr-3 py-2.5 text-white focus:border-accent focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Carrier Dispatcher</label>
                <div className="grid grid-cols-2 gap-2">
                  <label className={`flex items-center justify-center p-2.5 border rounded-lg cursor-pointer text-xs font-semibold ${deliveryMethod === 'Lalamove' ? 'border-accent bg-accent/5 text-white' : 'border-border text-text-muted hover:text-white'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      className="sr-only"
                      checked={deliveryMethod === 'Lalamove'}
                      onChange={() => setDeliveryMethod('Lalamove')}
                    />
                    🚗 Lalamove (₱150)
                  </label>

                  <label className={`flex items-center justify-center p-2.5 border rounded-lg cursor-pointer text-xs font-semibold ${deliveryMethod === 'GrabExpress' ? 'border-accent bg-accent/5 text-white' : 'border-border text-text-muted hover:text-white'}`}>
                    <input
                      type="radio"
                      name="delivery"
                      className="sr-only"
                      checked={deliveryMethod === 'GrabExpress'}
                      onChange={() => setDeliveryMethod('GrabExpress')}
                    />
                    🚙 Grab (₱130)
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1">
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">MUNICIPALITY / CITY</label>
                <input
                  type="text"
                  placeholder="e.g. Makati City, Taguig"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-bg-deep px-3 py-2.5 text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Notes to Courier (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Lobby 2, color red gate"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs rounded-lg border border-border bg-bg-deep px-3 py-2.5 text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-text-muted uppercase mb-1">Street Address Details</label>
              <textarea
                placeholder="Complete block, apartment, and barangay specifications"
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-bg-deep px-3 py-2.5 text-white focus:border-accent focus:outline-none font-sans"
              />
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-xs font-mono border border-border hover:bg-white/[0.02] rounded-lg text-text-muted hover:text-white cursor-pointer"
              >
                Abort
              </button>
              <button
                onClick={handleNextStep1}
                className="px-5 py-2.5 text-xs font-bold bg-accent text-bg-deep rounded-lg flex items-center space-x-1 hover:bg-accent-dim cursor-pointer"
              >
                <span>Financial Remittance</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: GCash Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-white">GCash Secure Remittance</h3>
              <p className="text-xs text-text-muted mt-0.5">Please transfer exact funds, then upload proof of transaction.</p>
            </div>

            <GcashQrCode />

            <div className="bg-bg-deep/40 rounded-xl border border-border p-4 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-text-muted uppercase">Amount Due</span>
                <span className="text-lg font-display font-black text-accent">₱{totalAmount.toLocaleString()}</span>
              </div>

              <div className="space-y-1.5">
                <p className="text-[10px] font-mono text-text-muted uppercase">Upload Transaction Screenshot</p>
                
                <label className="flex flex-col items-center justify-center border border-dashed border-border hover:border-accent/30 rounded-xl bg-bg-deep hover:bg-bg-deep/60 p-4 cursor-pointer text-center group transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                  <Upload className="h-6 w-6 text-text-muted group-hover:text-accent mb-2" />
                  <span className="text-[11px] text-white">Select Screenshot Receipt</span>
                  <span className="text-[9px] text-text-muted mt-1 leading-none">Max upload weight: 500KB PNG/JPG</span>
                </label>

                {proofImageName && (
                  <p className="text-[10px] font-mono text-success text-center truncate">
                    ✓ {proofImageName} attached
                  </p>
                )}
              </div>
            </div>

            {paymentProofBase64 && (
              <div className="p-2 border border-border rounded-lg bg-bg-deep text-center">
                <p className="text-[9px] font-mono text-text-muted uppercase mb-1">Receipt Preview</p>
                <img 
                  src={paymentProofBase64} 
                  alt="GCash Receipt Proof" 
                  className="max-h-24 mx-auto rounded object-contain border border-border"
                />
              </div>
            )}

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <button 
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold border border-border hover:bg-white/[0.02] rounded-lg text-text-muted hover:text-white flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNextStep2}
                className="px-5 py-2.5 text-xs font-bold bg-accent text-bg-deep rounded-lg flex items-center space-x-1 hover:bg-accent-dim"
              >
                <span>Review Order</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review and Final Submit */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg text-white">Final Integrity Review</h3>
              <p className="text-xs text-text-muted mt-0.5 font-sans">Verify chemical allocation and target coordinates before finalizing dispatch.</p>
            </div>

            <div className="rounded-xl border border-border bg-bg-deep divide-y divide-border/60 overflow-hidden">
              <div className="p-4 bg-bg-card/30">
                <p className="text-[9px] font-mono text-text-muted uppercase mb-2">Cartridge Compounds</p>
                <div className="space-y-1.5 max-h-28 overflow-y-auto">
                  {cartItems.map((item, idx) => {
                    const itemId = item.product?.id ?? item.id ?? idx;
                    const itemName = item.product?.name ?? item.name ?? '';
                    const itemPrice = (item.product?.price ?? item.price ?? 0) + (item.selectedAddonPrice ?? 0);
                    const itemQty = item.quantity ?? item.qty ?? 0;
                    return (
                      <div key={String(itemId)} className="flex justify-between items-center text-xs">
                        <span className="text-white font-medium">{itemName} <span className="text-accent text-[10px] font-mono">x {itemQty}</span></span>
                        <span className="font-mono text-text-muted">₱{(itemPrice * itemQty).toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <p className="text-[9px] font-mono text-text-muted uppercase mb-1">Dispatch Target</p>
                  <p className="text-white font-medium">{name}</p>
                  <p className="text-text-muted text-[10px] truncate">{phone}</p>
                </div>
                <div>
                  <p className="text-[9px] font-mono text-text-muted uppercase mb-1">Destination Location</p>
                  <p className="text-white font-medium truncate">{address}</p>
                  <p className="text-text-muted text-[10px] truncate">{city}</p>
                </div>
              </div>

              <div className="p-4 bg-bg-card/25 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-text-muted">Compounds Subtotal</span>
                  <span className="text-white">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-text-muted">{deliveryMethod} Fee</span>
                  <span className="text-white">₱{shippingFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-border/40 font-bold text-sm">
                  <span className="text-accent font-display">Grand Total Settlement</span>
                  <span className="text-white">₱{totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <button 
                onClick={() => setStep(2)}
                className="px-4 py-2.5 text-xs font-semibold border border-border hover:bg-white/[0.02] rounded-lg text-text-muted text-left flex items-center space-x-1"
                disabled={loading}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Verify Payment</span>
              </button>
              
              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="px-6 py-3 text-xs font-bold bg-accent text-bg-deep rounded-lg flex items-center space-x-1.5 hover:bg-accent-dim shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] duration-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-bg-deep border-t-transparent animate-spin" />
                    <span>Disbursing Database Entry...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4.5 w-4.5" />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Success confirmation */}
        {step === 4 && (
          <div className="text-center space-y-5 py-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15 border border-success/30 text-success mb-2">
              <CheckCircle2 className="h-6 w-6 animate-pulse" />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-xl text-white">Order Dispatch Authorized!</h3>
              <p className="text-xs text-text-muted mt-1 select-none">Our laboratory is now validating your GCash settlement receipt.</p>
            </div>

            <div className="bg-bg-deep p-4 rounded-xl border border-border inline-block min-w-[220px]">
              <p className="text-[9px] font-mono text-text-muted uppercase">Your Order ID Ref</p>
              <p className="text-lg font-mono font-bold text-accent tracking-widest mt-1 select-all">{completedOrderId}</p>
            </div>

            <p className="text-xs text-text-muted font-sans leading-relaxed max-w-sm mx-auto">
              A transactional confirmation ticket has been dispatched to your email at <strong className="text-white">{email}</strong>. 
            </p>

            <div className="flex flex-col gap-2.5 max-w-xs mx-auto pt-4 border-t border-border/40">
              <button
                onClick={openViber}
                className="w-full py-2.5 px-4 rounded-lg bg-[#7360F2] text-white text-xs font-bold hover:bg-[#624edb] flex items-center justify-center space-x-2 transition"
              >
                <span>Send details via Viber</span>
              </button>

              <button
                onClick={() => navigateToTracker(completedOrderId)}
                className="w-full py-2.5 px-4 rounded-lg bg-accent text-bg-deep text-xs font-bold hover:bg-accent-dim flex items-center justify-center space-x-2 transition"
              >
                <span>Track My Order Timeline</span>
              </button>

              <button
                onClick={() => { setStep(1); onClose(); }}
                className="text-xs text-text-muted hover:text-white transition pt-1"
                id="btn-continue-shopping"
              >
                Close and Go Back to Shop
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
