import React, { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, loginWithGoogle, logoutUser, syncUserProfile, handleRedirectResult } from './firebase.ts';
import { collection, query, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { Product, CartItem, ToastMessage, Review } from './types.ts';
import { PRODUCTS, ADMIN_EMAILS } from './products.ts';

// Component imports
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Products from './components/Products.tsx';
import PeptideCalculator from './components/PeptideCalculator.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import CheckoutModal from './components/CheckoutModal.tsx';
import OrderTracker from './components/OrderTracker.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import MyOrders from './components/MyOrders.tsx';
import Toast from './components/Toast.tsx';

// Ported Premium Components
import { BiotechVideoEffect } from './components/BiotechVideoEffect.tsx';
import { ProductAddonsSelector, ADDON_OPTIONS } from './components/ProductAddons.tsx';
import { ProductImage } from './components/ProductImage.tsx';

// Icons for layout
import { 
  KeyRound, ShieldCheck, Mail, Database, HelpCircle, Dna, 
  Settings, Heart, Star, Plus, Minus, X, ShoppingCart, 
  LogIn, LogOut, Award, ClipboardList, Activity, Scale, 
  Brain, Beaker, Zap, Target, Eye, SlidersHorizontal, FlaskConical,
  MessageCircle
} from 'lucide-react';
import AnimateIn from './components/AnimateIn.tsx';
import { motion, AnimatePresence } from 'motion/react';

// Mock review pool
const reviewPool = [
  "HPLC purity verified at 99.4%. Reconstituted instantly and cleanly without residue.",
  "Excellent packaging with secure vacuum seals. Prompt shipping to Taguig.",
  "Outstanding research standards. Consistent results across several trial groups.",
  "Highly reliable peptide structure. Vacuum in vial was fully intact upon arrival.",
  "Lalamove delivery arrived within 3 hours. Packed perfectly with insulation."
];
const mockUsers = ["Dr. Santos", "R. Alvarez", "Lab-Tech Manila", "P. Gomez", "Quantum Bio-Lab"];

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);



  // SPA View Routing States
  const [currentView, setCurrentView] = useState<'shop' | 'track' | 'orders' | 'admin' | 'coa'>('shop');
  const [trackOrderId, setTrackOrderId] = useState<string>('');

  // Cart Status States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Toast System States
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Background Customization States
  const [bgShowGrid, setBgShowGrid] = useState<boolean>(() => {
    const saved = localStorage.getItem('vpep_bg_grid');
    return saved !== 'false';
  });
  const [bgShowMolecules, setBgShowMolecules] = useState<boolean>(() => {
    const saved = localStorage.getItem('vpep_bg_molecules');
    return saved !== 'false';
  });
  const [bgGlowIntensity, setBgGlowIntensity] = useState<number>(() => {
    const saved = localStorage.getItem('vpep_bg_glow_intensity');
    return saved ? parseFloat(saved) : 0.65;
  });
  const [bgVideoSpeed, setBgVideoSpeed] = useState<'slow' | 'medium' | 'fast'>(() => {
    return (localStorage.getItem('vpep_bg_speed') as 'slow' | 'medium' | 'fast') || 'medium';
  });
  const [bgVideoMode, setBgVideoMode] = useState<'cellular' | 'plexus' | 'dna'>(() => {
    return (localStorage.getItem('vpep_bg_mode') as 'cellular' | 'plexus' | 'dna') || 'plexus';
  });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [supportChatOpen, setSupportChatOpen] = useState(false);

  // Wishlist and Product Monograph Details Drawer States
  const [wishlist, setWishlist] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('vpep_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerQty, setDrawerQty] = useState(1);
  const [selectedAddonId, setSelectedAddonId] = useState<string>('vial_only');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Real-time products listener
  useEffect(() => {
    const productsColRef = collection(db, 'products');
    const q = query(productsColRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setProductsList(PRODUCTS);
        
        // Auto-seed Firestore with PRODUCTS if current user is admin
        const isAdminUser = user && ADMIN_EMAILS.map(e => e.toLowerCase()).includes((user.email || '').toLowerCase());
        if (isAdminUser) {
          const seedProducts = async () => {
            try {
              for (const p of PRODUCTS) {
                await setDoc(doc(db, 'products', String(p.id)), p);
              }
              console.log("Firestore products collection seeded successfully ✔");
            } catch (err) {
              console.error("Error seeding products to Firestore:", err);
            }
          };
          seedProducts();
        }
      } else {
        const fetched: Product[] = [];
        snapshot.forEach(docSnap => {
          const rawData = docSnap.data();
          const template = PRODUCTS.find(p => String(p.id) === String(rawData.id));
          
          fetched.push({
            ...template,
            ...rawData,
            id: rawData.id ?? template?.id ?? docSnap.id,
            name: rawData.name ?? template?.name ?? '',
            price: Number(rawData.price ?? template?.price ?? 0),
            stock: Number(rawData.stock ?? template?.stock ?? 0),
            category: rawData.category || rawData.cat || template?.category || 'Wellness',
            cat: rawData.cat || rawData.category || template?.cat || 'Wellness',
            description: rawData.description || rawData.desc || template?.description || '',
            desc: rawData.desc || rawData.description || template?.desc || '',
            image: rawData.image ?? template?.image ?? '',
            unit: rawData.unit ?? template?.unit ?? '',
            concentration: rawData.concentration ?? template?.concentration ?? '',
            coaUrl: rawData.coaUrl ?? template?.coaUrl ?? '',
            coaSummary: {
              purity: rawData.coaSummary?.purity ?? template?.coaSummary?.purity ?? '99.5%',
              appearance: rawData.coaSummary?.appearance ?? template?.coaSummary?.appearance ?? 'White sterile lyophilized powder',
              batchNo: rawData.coaSummary?.batchNo ?? template?.coaSummary?.batchNo ?? '',
              testDate: rawData.coaSummary?.testDate ?? template?.coaSummary?.testDate ?? 'February 2026',
              method: rawData.coaSummary?.method ?? template?.coaSummary?.method ?? 'HPLC & Mass Spectrometry',
            }
          } as Product);
        });
        fetched.sort((a, b) => Number(a.id) - Number(b.id));
        setProductsList(fetched);
      }
      setLoadingProducts(false);
    }, (err) => {
      console.warn("Could not query products collection from Firestore. Using static fallback:", err);
      setProductsList(PRODUCTS);
      setLoadingProducts(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Interactive Scientific Quiz States
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState(1);
  const [quizSelectedGoal, setQuizSelectedGoal] = useState<string | null>(null);
  const [quizSelectedPurity, setQuizSelectedPurity] = useState<string | null>(null);

  // Centralized body scroll lock for all modal overlays to prevent background scrolling
  useEffect(() => {
    const isAnyOverlayOpen = !!(selectedProduct || cartOpen || checkoutOpen || settingsOpen || wishlistOpen || quizOpen);
    const lenis = (window as any).__lenis;
    
    if (isAnyOverlayOpen) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedProduct, cartOpen, checkoutOpen, settingsOpen, wishlistOpen, quizOpen]);

  // 1. Listen for Firebase Auth alterations and handle Redirect results
  useEffect(() => {
    // Handle redirect result (mobile sign-in fallback) — safely waits for auth readiness
    handleRedirectResult().then((redirectUser) => {
      if (redirectUser) {
        setUser(redirectUser);
        triggerToast(`Signed in as ${redirectUser.displayName || 'Researcher'}`, 'success');
      }
    });

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
      if (firebaseUser) {
        try {
          await syncUserProfile(firebaseUser);
        } catch (err) {
          console.warn('[App] syncUserProfile from onAuthStateChanged failed:', err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser) {
        setUser(loggedUser);
        triggerToast(`Signed in as ${loggedUser.displayName || 'Researcher'}`, 'success');
      }
    } catch (err: any) {
      console.error("Google authentication failed:", err);
      const errCode = err?.code || (err && err.message) || '';
      if (!errCode.includes('auth/popup-closed-by-user') && !errCode.includes('auth/cancelled-popup-request')) {
        triggerToast(err?.message || 'Google Sign-In failed', 'error');
      }
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logoutUser();
      setUser(null);
      setCurrentView('shop');
      triggerToast("Signed out of researcher session", 'info');
    } catch (err) {
      console.error("Logout failed:", err);
      triggerToast("Logout failed", 'error');
    }
  };



  // 2. Synchronize active cart in localStorage state
  useEffect(() => {
    const savedCart = localStorage.getItem('vitapep_cart_items');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.warn("Could not deserialize saved client cart items");
      }
    }
  }, []);

  const saveCartToStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('vitapep_cart_items', JSON.stringify(items));
  };

  // Save background settings to localStorage
  useEffect(() => {
    localStorage.setItem('vpep_bg_grid', String(bgShowGrid));
  }, [bgShowGrid]);

  useEffect(() => {
    localStorage.setItem('vpep_bg_molecules', String(bgShowMolecules));
  }, [bgShowMolecules]);

  useEffect(() => {
    localStorage.setItem('vpep_bg_glow_intensity', String(bgGlowIntensity));
  }, [bgGlowIntensity]);

  useEffect(() => {
    localStorage.setItem('vpep_bg_speed', bgVideoSpeed);
  }, [bgVideoSpeed]);

  useEffect(() => {
    localStorage.setItem('vpep_bg_mode', bgVideoMode);
  }, [bgVideoMode]);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('vpep_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast notifier triggers
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const newToast: ToastMessage = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      message
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Actions (unified package addons support)
  const handleAddToCart = (product: Product, quantity = 1, addonId = 'vial_only') => {
    const addon = ADDON_OPTIONS.find(opt => opt.id === addonId) || ADDON_OPTIONS[0];
    const finalPrice = product.price + addon.priceModifier;

    const existing = cartItems.find(item => {
      const isMatch = (
        (String(item.product?.id) === String(product.id) || String(item.id) === String(product.id)) &&
        (item.selectedAddonId || 'vial_only') === addonId
      );
      return isMatch;
    });

    if (existing) {
      const currentQty = existing.quantity ?? existing.qty ?? 0;
      const updated = cartItems.map(item => {
        const isMatch = (
          (String(item.product?.id) === String(product.id) || String(item.id) === String(product.id)) &&
          (item.selectedAddonId || 'vial_only') === addonId
        );
        return isMatch
          ? { ...item, quantity: currentQty + quantity, qty: currentQty + quantity }
          : item;
      });
      saveCartToStorage(updated);
    } else {
      const updated = [...cartItems, { 
        product, 
        quantity,
        
        // P Project compatibility fields
        id: product.id,
        name: product.name,
        unit: product.unit || product.concentration || '5mg',
        price: finalPrice,
        qty: quantity,
        stock: product.stock || 10,
        image: product.image || '',
        abbr: product.abbr || '',
        selectedAddonId: addonId,
        selectedAddonName: addon.name,
        selectedAddonPrice: addon.priceModifier
      }];
      saveCartToStorage(updated);
    }
  };

  const updateCartQuantity = (productId: string | number, delta: number, addonId = 'vial_only') => {
    const updated = cartItems.map(item => {
      const isMatch = (
        (String(item.product?.id) === String(productId) || String(item.id) === String(productId)) &&
        (item.selectedAddonId || 'vial_only') === addonId
      );
      if (isMatch) {
        const currentQty = item.quantity ?? item.qty ?? 1;
        const nextQty = Math.max(1, currentQty + delta);
        return { ...item, quantity: nextQty, qty: nextQty };
      }
      return item;
    });
    saveCartToStorage(updated);
  };

  const removeCartItem = (productId: string | number, addonId = 'vial_only') => {
    const updated = cartItems.filter(item => {
      const isMatch = (
        (String(item.product?.id) === String(productId) || String(item.id) === String(productId)) &&
        (item.selectedAddonId || 'vial_only') === addonId
      );
      return !isMatch;
    });
    saveCartToStorage(updated);
    triggerToast("Item removed from cartridge logs", 'info');
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const handleToggleWishlist = (productId: string | number) => {
    const p = productsList.find(x => x.id === productId);
    if (!p) return;
    setWishlist(prev => {
      const isExist = prev.includes(productId);
      if (isExist) {
        triggerToast(`${p.name} removed from wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        triggerToast(`${p.name} added to wishlist`, 'success');
        return [...prev, productId];
      }
    });
  };

  // Determinstic Mock reviews helper
  const getProductReviews = (product: Product): Review[] => {
    let numericId = 0;
    if (typeof product.id === 'number') {
      numericId = product.id;
    } else {
      for (let i = 0; i < String(product.id).length; i++) {
        numericId += String(product.id).charCodeAt(i);
      }
    }

    const seed1 = numericId % mockUsers.length;
    const seed2 = (numericId + 1) % reviewPool.length;
    const seed3 = (numericId + 2) % mockUsers.length;
    const seed4 = (numericId + 3) % reviewPool.length;

    return [
      {
        user: mockUsers[seed1],
        rating: 5,
        comment: reviewPool[seed2]
      },
      {
        user: mockUsers[seed3],
        rating: 5,
        comment: reviewPool[seed4]
      }
    ];
  };

  // Safe navigation triggers
  const navigateToTracker = (orderId: string) => {
    setTrackOrderId(orderId);
    setCurrentView('track');
    setCheckoutOpen(false);
    setCartOpen(false);
  };

  const handleHeroShopScroll = () => {
    const element = document.getElementById('shop-grid-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quiz calculations
  const quizRecommendedProducts = useMemo(() => {
    if (!quizSelectedGoal) return [];
    
    const categoryMapping: Record<string, string> = {
      'healing': 'Healing',
      'weight': 'Metabolic',
      'brain': 'Wellness',
      'standards': 'Wellness'
    };

    const targetCat = categoryMapping[quizSelectedGoal];
    let recs = productsList.filter(p => p.category === targetCat);
    
    if (quizSelectedPurity === 'high') {
      recs = recs.filter(p => p.price > 2500);
    } else {
      recs = recs.filter(p => p.price <= 3500);
    }

    return recs.slice(0, 3);
  }, [quizSelectedGoal, quizSelectedPurity]);

  const handleQuizNext = () => {
    if (quizStep === 1 && !quizSelectedGoal) {
      triggerToast("Please select a research pathway", "error");
      return;
    }
    if (quizStep === 2 && !quizSelectedPurity) {
      triggerToast("Please select a strength or budget choice", "error");
      return;
    }
    setQuizStep(prev => prev + 1);
  };

  const handleAddQuizProductsToCart = () => {
    if (quizRecommendedProducts.length === 0) return;
    
    quizRecommendedProducts.forEach(product => {
      if ((product.stock ?? 1) > 0) {
        handleAddToCart(product, 1, 'vial_only');
      }
    });
    setQuizOpen(false);
    triggerToast("Added recommended compounds to cart", "success");
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.quantity ?? item.qty ?? 0), 0);

  return (
    <div className="min-h-screen bg-bg-deep flex flex-col text-text-primary antialiased font-sans relative overflow-x-hidden">
      
      {/* Background Molecular Plexus Effect */}
      {bgShowMolecules && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <BiotechVideoEffect 
            glowIntensity={bgGlowIntensity}
            showGrid={bgShowGrid}
            showMolecules={bgShowMolecules}
            speed={bgVideoSpeed}
            mode={bgVideoMode}
          />
        </div>
      )}

      {/* Floating Viber / WhatsApp Chat Support Widget */}
      <div className="fixed bottom-6 left-6 z-40">
        <AnimatePresence>
          {supportChatOpen && (
            <>
              {/* Tap backdrop to close */}
              <div className="fixed inset-0 z-30" onClick={() => setSupportChatOpen(false)} />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 16 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="relative mb-4 w-72 rounded-2xl border border-border bg-[#0A0F1E]/95 backdrop-blur-xl p-5 shadow-2xl z-40 text-left"
              >
                {/* Header panel */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2D45] mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <MessageCircle className="h-5 w-5 text-accent" />
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success animate-ping" />
                      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-white text-xs uppercase tracking-wider">Peptide Support</h4>
                      <p className="text-[8.5px] font-mono text-success uppercase tracking-wider">Online Consultation</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSupportChatOpen(false)}
                    className="p-1 text-[10px] font-mono text-[#8896B3] hover:text-white cursor-pointer"
                  >
                    [X]
                  </button>
                </div>

                <p className="text-[10.5px] text-[#8896B3] leading-relaxed mb-4">
                  Have questions about peptide assays, reconstitution ratios, or GCash logistics? Connect directly:
                </p>

                {/* Chat triggers */}
                <div className="space-y-2">
                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/639171234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSupportChatOpen(false)}
                    className="btn-ripple w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2.5 transition"
                  >
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>Message WhatsApp</span>
                  </a>
                  
                  {/* Viber */}
                  <a
                    href="viber://chat?number=%2B639171234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSupportChatOpen(false)}
                    className="btn-ripple w-full py-2.5 px-4 rounded-xl bg-[#7360F2] hover:bg-[#6250dc] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2.5 transition"
                  >
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.99 15.02c-.59-.34-2.11-1.04-2.45-1.16-.34-.12-.59-.18-.84.2-.3.42-1.16 1.46-1.42 1.76-.26.3-.52.33-.94.11-2.95-1.43-3.8-3.08-4.22-3.8-.42-.72.07-.63.45-1.19.14-.2.27-.42.41-.63.26-.41.13-.77-.07-1.12l-.84-2c-.34-.84-.71-.78-.97-.79-.26 0-.56-.01-.86-.01-.3 0-.79.11-1.2.56-.51.56-1.97 1.92-1.97 4.69 0 2.77 2.02 5.44 2.3 5.82.28.38 3.97 6.07 9.62 8.5 1.34.58 2.39.93 3.21 1.19 1.35.43 2.58.37 3.55.22 1.08-.16 3.33-1.36 3.8-2.67.47-1.31.47-2.43.33-2.67-.14-.24-.52-.38-1.11-.72zM21.9 8.2c.07.72-.08 1.43-.45 2.05-.34.56-.84.97-1.44 1.18-.32.11-.64.16-.96.16-.62 0-1.21-.2-1.72-.57-.45-.33-.78-.79-.93-1.32-.14-.49-.13-1 .03-1.49.19-.58.58-1.06 1.09-1.37.52-.32 1.14-.44 1.74-.35.61.1 1.16.4 1.56.85.4.45.62 1.01.68 1.66zm1.1-2.3c.09 1.08-.14 2.14-.68 3.08-.51.88-1.29 1.57-2.22 1.98-.55.24-1.14.36-1.74.36-1.07 0-2.1-.38-2.92-1.07-.79-.66-1.34-1.57-1.55-2.58-.2-.96-.13-1.96.22-2.88.4-1.04 1.18-1.89 2.17-2.41.98-.51 2.1-.64 3.16-.36.96.25 1.8.79 2.42 1.54.62.75.99 1.67 1.05 2.67c.02.22.03.45.03.67z"/>
                    </svg>
                    <span>Message Viber</span>
                  </a>

                  {/* Facebook Messenger */}
                  <a
                    href="https://m.me/vitapep"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setSupportChatOpen(false)}
                    className="btn-ripple w-full py-2.5 px-4 rounded-xl bg-[#0084FF] hover:bg-[#0073e6] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2.5 transition"
                  >
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.745 6.613 4.469 8.627V24l4.089-2.247c1.096.303 2.256.469 3.442.469 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.31 14.286l-2.619-2.793-5.111 2.793 5.619-5.959 2.619 2.793 5.111-2.793-5.619 5.959z"/>
                    </svg>
                    <span>Message Messenger</span>
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating trigger button */}
        <motion.button
          onClick={() => setSupportChatOpen(!supportChatOpen)}
          className="p-3 bg-bg-card hover:bg-bg-elevated border border-border rounded-full text-accent hover:text-white shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:border-accent transition-all duration-300 cursor-pointer relative"
          title="Peptide Support Chat"
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.94 }}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-bg-card" />
        </motion.button>
      </div>

      {/* Floating Lab Settings Control Trigger */}
      <button
        onClick={() => setSettingsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3 bg-bg-card hover:bg-bg-elevated border border-border rounded-full text-accent hover:text-white shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] hover:border-accent transition-all duration-300 cursor-pointer"
        title="Assay Lab Settings"
        id="lab-settings-trigger"
      >
        <Settings className="h-5 w-5 animate-spin-slow" />
      </button>

      {/* Dynamic Notifications Stack */}
      <Toast toasts={toasts} removeToast={removeToast} />

      {/* Persistent Navigation Header */}
      <Header 
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        openCart={() => setCartOpen(true)}
        user={user}
        setTrackOrderId={setTrackOrderId}
        wishlistCount={wishlist.length}
        openWishlist={() => setWishlistOpen(true)}
        onSignIn={handleGoogleSignIn}
        onSignOut={handleGoogleSignOut}
      />

      {/* Core View Router Frame */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">

        {currentView === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Landing welcome Hero Banner */}
            <Hero user={user} onShopClick={handleHeroShopScroll} onSignIn={handleGoogleSignIn} />

            {/* Interactive Shop area — Uniform grid for ALL categories */}
            <div id="shop-grid-anchor" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8">
                
                {/* Products Grid Column — always full width */}
                <div className="w-full">
                  <AnimateIn delay={0.08} duration={0.65}>
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="text-left">
                        <h3 className="font-display font-black text-white text-2xl sm:text-3xl uppercase tracking-tighter">
                          Chemical Catalog
                        </h3>
                        <p className="text-[11px] font-mono text-[#8896B3] mt-1.5 uppercase tracking-wider">
                          Batch-validated peptide compounds with HPLC certification.
                        </p>
                      </div>
                      
                      <motion.button
                        onClick={() => {
                          setQuizStep(1);
                          setQuizSelectedGoal(null);
                          setQuizSelectedPurity(null);
                          setQuizOpen(true);
                        }}
                        className="px-5 py-2.5 bg-accent/10 border border-accent/25 hover:border-accent text-accent hover:bg-accent/15 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-300 flex items-center space-x-2 cursor-pointer"
                        id="shop-quiz-trigger-btn"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                      >
                        <FlaskConical className="h-4 w-4" />
                        <span>Pathway Recommendation Quiz</span>
                      </motion.button>
                    </div>
                  </AnimateIn>
                  
                  <Products 
                    products={productsList}
                    addToCart={handleAddToCart}
                    toast={triggerToast}
                    onOpenProduct={(product) => {
                      setSelectedProduct(product);
                      setDrawerQty(1);
                      setSelectedAddonId('vial_only');
                    }}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'track' && (
          <motion.div
            key="track"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          >
            <OrderTracker initialOrderId={trackOrderId} toast={triggerToast} />
          </motion.div>
        )}

        {currentView === 'orders' && (
          <motion.div
            key="orders"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          >
            <MyOrders user={user} onTrackOrder={navigateToTracker} />
          </motion.div>
        )}

        {currentView === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
          >
            <AdminDashboard user={user} toast={triggerToast} />
          </motion.div>
        )}

        </AnimatePresence>
      </main>

      {/* Right sliding cartridge list drawer */}
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateCartQuantity}
        removeItem={removeCartItem}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true); }}
      />

      {/* Multi-step GCash logistics checkout manager */}
      <CheckoutModal 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        user={user}
        clearCart={clearCart}
        toast={triggerToast}
        navigateToTracker={navigateToTracker}
      />

      {/* --- FLOATING SCIENTIFIC LAB CONFIGURATION PANEL DRAWER --- */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/80 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSettingsOpen(false)} />
          <div 
            className="relative w-full max-w-md rounded-2xl border border-border bg-bg-card p-6 shadow-2xl z-10 text-left"
            data-lenis-prevent
          >
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <h4 className="font-display font-extrabold text-white text-base flex items-center space-x-2">
                <SlidersHorizontal className="h-5 w-5 text-accent" />
                <span>Assay Plexus Settings</span>
              </h4>
              <button 
                onClick={() => setSettingsOpen(false)}
                className="p-1 px-2.5 text-[10px] font-mono rounded border border-border text-text-muted hover:text-white cursor-pointer"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-bg-deep/40">
                <input 
                  type="checkbox" 
                  checked={bgShowGrid} 
                  onChange={(e) => setBgShowGrid(e.target.checked)} 
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="font-mono text-text-primary">Enable Grid Overlay</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-bg-deep/40">
                <input 
                  type="checkbox" 
                  checked={bgShowMolecules} 
                  onChange={(e) => setBgShowMolecules(e.target.checked)} 
                  className="rounded border-border text-accent focus:ring-accent"
                />
                <span className="font-mono text-text-primary">Enable Molecular Plexus Background</span>
              </label>

              {bgShowMolecules && (
                <>
                  <div className="space-y-2 p-2">
                    <span className="font-mono text-[#8896B3] block">Simulation Mode:</span>
                    <div className="flex space-x-2">
                      {['cellular', 'plexus', 'dna'].map(mode => (
                        <button
                          key={mode}
                          onClick={() => setBgVideoMode(mode as any)}
                          className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] uppercase transition cursor-pointer ${
                            bgVideoMode === mode 
                              ? 'bg-accent/15 border-accent text-accent' 
                              : 'border-border text-text-muted hover:text-white hover:border-text-muted'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 p-2">
                    <span className="font-mono text-[#8896B3] block">Molecular Velocity:</span>
                    <div className="flex space-x-2">
                      {['slow', 'medium', 'fast'].map(sp => (
                        <button
                          key={sp}
                          onClick={() => setBgVideoSpeed(sp as any)}
                          className={`px-3 py-1.5 rounded-lg border font-mono text-[10px] uppercase transition cursor-pointer ${
                            bgVideoSpeed === sp 
                              ? 'bg-accent/15 border-accent text-accent' 
                              : 'border-border text-text-muted hover:text-white hover:border-text-muted'
                          }`}
                        >
                          {sp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 p-2">
                    <div className="flex justify-between font-mono text-[#8896B3]">
                      <span>Glow Intensity:</span>
                      <span className="text-accent">{Math.round(bgGlowIntensity * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.1" 
                      max="1.5" 
                      step="0.05"
                      value={bgGlowIntensity} 
                      onChange={(e) => setBgGlowIntensity(parseFloat(e.target.value))} 
                      className="w-full accent-accent bg-bg-deep rounded-lg appearance-none h-1 cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- PRODUCT MONOGRAPH VIEW DRAWER OVERLAY --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/80 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProduct(null)} />
          
          <div 
            className="relative w-full max-w-4xl rounded-3xl border border-border bg-bg-card p-0 shadow-2xl z-10 flex flex-col md:flex-row text-left max-h-[90vh] overflow-y-auto overflow-x-hidden"
            data-lenis-prevent
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* Left Graphics aspect — optimized height for mobile to save space */}
            <div className="w-full md:w-1/2 bg-bg-deep relative h-[25vh] md:h-auto md:min-h-[300px] flex items-center justify-center border-b md:border-b-0 md:border-r border-border overflow-hidden">
              <ProductImage 
                productId={selectedProduct.id}
                productName={selectedProduct.name}
                imageUrl={selectedProduct.image}
                className="w-full h-full relative overflow-hidden"
                imgClassName="w-full h-full object-cover"
              />
              <span className="absolute bottom-4 left-4 bg-[#0A0F1E]/80 backdrop-blur-sm border border-border text-text-muted text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full">
                {selectedProduct.category} Chemical
              </span>
            </div>

            {/* Right Form & details monograph aspect */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="text-left">
                    <h3 className="font-display font-extrabold text-white text-xl uppercase tracking-tight">{selectedProduct.name}</h3>
                    <p className="text-[10px] font-mono text-accent mt-0.5 uppercase tracking-wider">{selectedProduct.concentration || selectedProduct.unit}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="p-1.5 px-3 text-[9px] font-mono rounded bg-bg-deep border border-border text-[#8896B3] hover:text-white cursor-pointer"
                  >
                    CLOSE [X]
                  </button>
                </div>

                {/* Abstract info */}
                <div className="mt-4 space-y-2 text-left">
                  <h4 className="text-[9px] font-mono text-[#8896B3] uppercase tracking-widest font-semibold">Reagent Monograph Abstract</h4>
                  <p className="text-xs text-[#8896B3] leading-relaxed">
                    {selectedProduct.description || selectedProduct.desc}
                  </p>
                  <p className="text-[10px] text-accent/80 italic leading-snug">
                    *Requires reconstitution using sterile bacteriostatic solutes (BacWater) before clinical validation tests.
                  </p>
                </div>

                {/* Addon Options selection */}
                <ProductAddonsSelector 
                  basePrice={selectedProduct.price}
                  selectedAddonId={selectedAddonId}
                  onChange={(id) => setSelectedAddonId(id)}
                />

                {/* Qty count selector */}
                <div className="mt-6 flex items-center justify-between bg-bg-deep/40 p-3.5 border border-border rounded-xl">
                  <span className="text-[10px] font-mono text-[#8896B3] uppercase tracking-widest font-semibold">Select Quantity</span>
                  <div className="flex items-center bg-bg-deep rounded border border-border px-1">
                    <button 
                      onClick={() => setDrawerQty(prev => Math.max(1, prev - 1))}
                      className="p-1 px-2.5 hover:text-accent font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono font-bold text-white min-w-[20px] text-center">{drawerQty}</span>
                    <button 
                      onClick={() => setDrawerQty(prev => Math.min(selectedProduct.stock || 10, prev + 1))}
                      className="p-1 px-2.5 hover:text-accent font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Determinstic mock reviews references */}
                <div className="mt-5 pt-4 border-t border-border/50 text-left">
                  <h5 className="font-mono text-[9px] font-bold text-[#8896B3] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>Peer Review Assessments</span>
                  </h5>
                  <div className="space-y-2">
                    {getProductReviews(selectedProduct).map((r, ri) => (
                      <div key={ri} className="bg-bg-deep/30 border border-border/60 p-2.5 rounded-lg text-[10.5px]">
                        <div className="flex justify-between font-semibold text-white/95 font-mono mb-1">
                          <span>{r.user}</span>
                          <span className="text-amber-500 font-sans">⭐ {r.rating}/5</span>
                        </div>
                        <p className="text-[#8896B3] italic leading-relaxed">&quot;{r.comment}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Purchase / Wishlist Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleAddToCart(selectedProduct, drawerQty, selectedAddonId);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-4 rounded-xl bg-accent text-bg-deep hover:bg-accent-dim font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-[0_0_15px_rgba(0,212,255,0.15)] cursor-pointer"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>
                    Add to Cartridge — ₱{
                      (((selectedProduct.price + (ADDON_OPTIONS.find(a => a.id === selectedAddonId)?.priceModifier || 0)) * drawerQty)).toLocaleString()
                    }
                  </span>
                </button>

                <button
                  onClick={() => handleToggleWishlist(selectedProduct.id)}
                  className="w-full py-2.5 border border-border hover:border-accent/30 bg-bg-deep/40 hover:bg-bg-deep/80 text-text-muted hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {wishlist.includes(selectedProduct.id) ? '♥ Remove from Biological wishlist' : '♡ Add to Biological wishlist'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- WISHLIST SLIDING DRAWER --- */}
      {wishlistOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-bg-deep/80 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setWishlistOpen(false)} />
          <div 
            className="relative w-full max-w-md bg-bg-card border-l border-border flex flex-col justify-between shadow-2xl z-10 text-left"
            data-lenis-prevent
          >
            <div>
              {/* Header */}
              <div className="p-6 border-b border-border bg-gradient-to-r from-accent/5 to-transparent flex justify-between items-center">
                <h3 className="font-display font-extrabold text-white text-base flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-accent fill-accent" />
                  <span>Biological Wishlist</span>
                </h3>
                <button 
                  onClick={() => setWishlistOpen(false)}
                  className="p-1 px-2.5 text-[10px] font-mono rounded bg-bg-deep border border-border text-text-muted hover:text-white cursor-pointer"
                >
                  CLOSE [X]
                </button>
              </div>

              {/* Items List */}
              <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                {wishlist.length === 0 ? (
                  <div className="text-center py-20 text-[#8896B3] space-y-2 border border-dashed border-border rounded-2xl bg-bg-deep/30">
                    <Heart className="h-10 w-10 text-[#1E2D45] mx-auto animate-pulse" />
                    <p className="text-xs font-semibold uppercase tracking-wider">Wishlist empty</p>
                    <p className="text-[10px] max-w-xs mx-auto leading-normal">Explore our compounds and tag molecular structures to pin references.</p>
                  </div>
                ) : (
                  wishlist.map(id => {
                    const item = productsList.find(p => p.id === id);
                    if (!item) return null;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedProduct(item);
                          setWishlistOpen(false);
                        }}
                        className="flex items-center justify-between p-3.5 bg-bg-deep/30 border border-border hover:border-accent/15 rounded-xl cursor-pointer transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <ProductImage 
                            productId={item.id}
                            productName={item.name}
                            imageUrl={item.image}
                            className="w-11 h-11 rounded-lg overflow-hidden shrink-0"
                          />
                          <div className="text-left overflow-hidden pr-2">
                            <h4 className="font-bold text-xs text-white truncate">{item.name}</h4>
                            <p className="text-[9px] font-mono text-accent mt-0.5">{item.concentration || item.unit}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          <span className="font-mono text-xs font-bold text-white">₱{item.price.toLocaleString()}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleWishlist(item.id);
                            }}
                            className="text-[10px] font-mono text-danger hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <div className="p-6 border-t border-border bg-bg-deep/40">
              <button
                onClick={() => setWishlistOpen(false)}
                className="w-full py-3 bg-bg-deep border border-border hover:border-accent/30 text-text-muted hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Return to Shop Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- INTERACTIVE BIOCHEMICAL QUIZ MODAL --- */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/85 backdrop-blur-md">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setQuizOpen(false)} />
          <div 
            className="relative w-full max-w-md rounded-2xl border border-border bg-bg-card p-6 shadow-2xl z-10 text-left"
            data-lenis-prevent
          >
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h4 className="font-display font-extrabold text-accent text-base flex items-center space-x-2">
                <FlaskConical className="h-5 w-5" />
                <span>Molecular Recommendation Quiz</span>
              </h4>
              <button 
                onClick={() => setQuizOpen(false)}
                className="p-1 px-2.5 text-[9px] font-mono rounded bg-bg-deep border border-border text-text-muted hover:text-white cursor-pointer"
              >
                [X]
              </button>
            </div>

            {/* Steps indicator */}
            <div className="flex justify-between items-center text-[9px] font-mono text-[#8896B3] mt-3 uppercase tracking-wider">
              <span>Pathway Wizard</span>
              <span>Step {quizStep} of 3</span>
            </div>
            
            <div className="h-1 bg-bg-deep rounded-full mt-2 overflow-hidden flex space-x-0.5">
              <div className={`h-full flex-1 transition-all duration-300 ${quizStep >= 1 ? 'bg-accent' : 'bg-transparent'}`} />
              <div className={`h-full flex-1 transition-all duration-300 ${quizStep >= 2 ? 'bg-accent' : 'bg-transparent'}`} />
              <div className={`h-full flex-1 transition-all duration-300 ${quizStep >= 3 ? 'bg-accent' : 'bg-transparent'}`} />
            </div>

            {/* Quiz Step 1 */}
            {quizStep === 1 && (
              <div className="mt-5 space-y-4">
                <div className="text-left">
                  <h5 className="font-display font-black text-white text-sm leading-normal">
                    Q1: What is the primary biological target of your research group?
                  </h5>
                  <p className="text-[10.5px] text-[#8896B3] mt-1 font-sans leading-normal">
                    Our peptide formulas are designed to validate specific metabolic or healing cellular pathways.
                  </p>
                </div>

                <div className="grid gap-2 text-xs">
                  {[
                    { key: 'healing', label: 'Cellular recovery, tissue repair, gut barrier validation', icon: <Activity className="h-4 w-4 text-accent" /> },
                    { key: 'weight', label: 'Lipolytic acceleration, GLP-1/GIP receptor saturation', icon: <Scale className="h-4 w-4 text-emerald-500" /> },
                    { key: 'brain', label: 'Neurogenesis, sirtuin cofactor pathways, Pineal longevity assays', icon: <Brain className="h-4 w-4 text-indigo-400" /> },
                    { key: 'standards', label: 'Solvents, pens, syringes, basic lab essentials', icon: <Beaker className="h-4 w-4 text-amber-500" /> }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setQuizSelectedGoal(opt.key)}
                      className={`p-3.5 rounded-xl border transition-all text-left flex items-center space-x-3 cursor-pointer ${
                        quizSelectedGoal === opt.key 
                          ? 'bg-accent/10 border-accent text-accent font-bold' 
                          : 'border-border bg-bg-deep/30 text-text-muted hover:text-white hover:border-border/80 hover:bg-bg-deep/60'
                      }`}
                    >
                      <div className="p-1 bg-bg-deep rounded border border-border">
                        {opt.icon}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 2 */}
            {quizStep === 2 && (
              <div className="mt-5 space-y-4">
                <div className="text-left">
                  <h5 className="font-display font-black text-white text-sm leading-normal">
                    Q2: What is the concentration or budget scope for your assay protocols?
                  </h5>
                  <p className="text-[10.5px] text-[#8896B3] mt-1 font-sans leading-normal">
                    Assay strength determines the concentration and baseline purity modifier.
                  </p>
                </div>

                <div className="grid gap-2 text-xs">
                  {[
                    { key: 'high', label: 'High Yield Compounds (Maximum Concentration, >₱2,500)', icon: <Zap className="h-4 w-4 text-amber-500" /> },
                    { key: 'standard', label: 'Standard Titration Portion (Calibrated levels, ≤₱3,500)', icon: <Target className="h-4 w-4 text-accent" /> }
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setQuizSelectedPurity(opt.key)}
                      className={`p-4 rounded-xl border transition-all text-left flex items-center space-x-3 cursor-pointer ${
                        quizSelectedPurity === opt.key 
                          ? 'bg-accent/10 border-accent text-accent font-bold' 
                          : 'border-border bg-bg-deep/30 text-text-muted hover:text-white hover:border-border/80 hover:bg-bg-deep/60'
                      }`}
                    >
                      <div className="p-1 bg-bg-deep rounded border border-border">
                        {opt.icon}
                      </div>
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Step 3 */}
            {quizStep === 3 && (
              <div className="mt-5 space-y-4">
                <div className="text-left">
                  <h5 className="font-display font-black text-white text-sm">We detected matching molecular structures!</h5>
                  <p className="text-[10.5px] text-[#8896B3] mt-1">Based on your pathways, we suggest adding these HPLC verified validation assays:</p>
                </div>

                <div className="space-y-2.5">
                  {quizRecommendedProducts.length === 0 ? (
                    <p className="text-xs text-text-muted italic py-8 text-center bg-bg-deep/30 border border-border rounded-xl">
                      No matches found. Select other options and retry.
                    </p>
                  ) : (
                    quizRecommendedProducts.map(p => (
                      <div key={p.id} className="p-3 bg-bg-deep/40 border border-border rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <ProductImage 
                            productId={p.id}
                            productName={p.name}
                            imageUrl={p.image}
                            className="w-10 h-10 rounded overflow-hidden shrink-0"
                          />
                          <div className="text-left">
                            <h6 className="font-bold text-xs text-white leading-none">{p.name}</h6>
                            <span className="text-[9px] font-mono text-[#8896B3]">{p.concentration || p.unit}</span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-accent font-bold">₱{p.price.toLocaleString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Footer controls */}
            <div className="mt-6 pt-3.5 border-t border-border flex justify-between gap-3 text-xs font-semibold">
              <button
                onClick={() => setQuizStep(prev => Math.max(1, prev - 1))}
                className={`px-4 py-2 border border-border text-[#8896B3] hover:text-white rounded-lg transition cursor-pointer ${
                  quizStep === 1 ? 'invisible' : 'visible'
                }`}
              >
                Back
              </button>

              {quizStep < 3 ? (
                <button
                  onClick={handleQuizNext}
                  className="px-5 py-2 bg-accent text-bg-deep rounded-lg hover:bg-accent-dim transition cursor-pointer"
                >
                  Next Question
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setQuizOpen(false)}
                    className="px-4 py-2 border border-border text-[#8896B3] hover:text-white rounded-lg cursor-pointer"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={handleAddQuizProductsToCart}
                    disabled={quizRecommendedProducts.length === 0}
                    className="px-5 py-2 bg-accent text-bg-deep hover:bg-accent-dim font-bold rounded-lg transition disabled:opacity-50 cursor-pointer"
                  >
                    Add Assays
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Universal Footer Component */}
      <footer className="border-t border-[#1E2D45] bg-[#111827]/50 backdrop-blur-sm text-[#8896B3] py-16 relative z-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 ${currentView === 'admin' ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-12 text-left`}>
            
            {/* Branding block */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <Dna className="h-5 w-5 text-accent" />
                <h4 className="font-display font-black text-white text-md uppercase tracking-wider">VitaPep Philippines</h4>
              </div>
              <p className="text-xs text-[#8896B3] max-w-sm leading-relaxed uppercase tracking-wider font-mono">
                Precision Peptides. Science You Can Trust. Certified HPLC and Mass Spectrometry validation of peptide standards for laboratory investigations.
              </p>
              <div className="p-4 rounded-xl border border-[#1E2D45] bg-[#0A0F1E] text-[10px] leading-relaxed max-w-sm font-mono text-[#8896B3]">
                🔬 <strong className="text-white">RESEARCH NOTICE:</strong> Compounds listed are provided for rigorous in-vitro analytical testing, scientific investigation, and research protocols. Keep vials tightly sealed in refrigeration.
              </div>
            </div>

            {/* Links block */}
            <div className="space-y-4">
              <h5 className="font-display font-black text-white text-xs uppercase tracking-widest">Quick Actions</h5>
              <div className="grid grid-cols-1 gap-2.5 text-[11px] font-mono uppercase tracking-wider">
                <button onClick={() => setCurrentView('shop')} className="text-left text-[#8896B3] hover:text-white transition cursor-pointer">Shop compounds</button>
                <button onClick={() => { setTrackOrderId(''); setCurrentView('track'); }} className="text-left text-[#8896B3] hover:text-white transition cursor-pointer">Track peptide pathway</button>
                <button onClick={() => setCurrentView('orders')} className="text-left text-[#8896B3] hover:text-white transition cursor-pointer">My Purchases log</button>
              </div>
            </div>

            {/* Ingress Credentials Block */}
            {currentView !== 'admin' && (
              <div className="space-y-4">
                <h5 className="font-display font-black text-white text-xs uppercase tracking-widest">Secured Access</h5>
                <div className="p-4 rounded-xl border border-[#1E2D45] bg-[#0A0F1E] font-mono text-[10px] space-y-2">
                  <div className="flex items-center text-success space-x-1.5 uppercase font-bold tracking-wider">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Verified 256-Bit SSL</span>
                  </div>
                  <div className="flex items-center text-accent space-x-1.5 uppercase font-bold tracking-wider mt-1.5">
                    <Database className="h-4 w-4" />
                    <span>Real-time Secure Sync</span>
                  </div>
                  {user ? (
                    <p className="text-[9px] text-[#8896B3] truncate mt-3 font-mono">Active: {user.email}</p>
                  ) : (
                    <p className="text-[9px] text-[#8896B3] mt-3 font-mono uppercase tracking-wider">Client authorized as guest</p>
                  )}
                </div>
              </div>
            )}

          </div>

          <div className="mt-14 pt-8 border-t border-[#1E2D45]/60 text-[#8896B3] text-[10px] font-mono flex flex-col sm:flex-row items-center justify-between gap-y-2 uppercase tracking-widest">
            <p>© 2026 VitaPep Laboratory Inc. All rights reserved. Precision supplement solutions.</p>
            <p className="tracking-widest uppercase text-accent font-bold">Manila, Philippines</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

