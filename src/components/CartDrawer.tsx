import React from 'react';
import { ShoppingBag, X, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types.ts';
import { CartItemCard } from './CartItemCard.tsx';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (productId: string, delta: number, addonId?: string) => void;
  removeItem: (productId: string, addonId?: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
  onCheckout
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const price = (item.product?.price ?? item.price ?? 0) + (item.selectedAddonPrice ?? 0);
    const qty = item.quantity ?? item.qty ?? 0;
    return acc + (price * qty);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-root">
      
      {/* Absolute Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-bg-deep/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-bg-elevated border-l border-border text-text-primary flex flex-col shadow-2xl relative"
          data-lenis-prevent
        >
          
          {/* Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="h-5 w-5 text-accent" />
              <h3 className="font-display font-bold text-white text-base">Your Peptide Cartridge</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 px-2.5 text-xs font-mono rounded bg-bg-deep border border-border text-text-muted hover:text-white"
            >
              CLOSE [X]
            </button>
          </div>

          {/* Cart item list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CartItemCard
                  key={`${item.product?.id ?? item.id ?? index}-${item.selectedAddonId || 'vial_only'}`}
                  item={item}
                  handleRemoveCartItem={(id, addonId) => removeItem(String(id), addonId)}
                  handleCartQtyChange={(id, delta, addonId) => updateQuantity(String(id), delta, addonId)}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <ShoppingBag className="h-12 w-12 text-text-muted/40 mx-auto mb-4" />
                <p className="text-sm text-text-muted">Your cartridge is currently empty.</p>
                <button
                  onClick={onClose}
                  className="mt-3.5 text-xs text-accent font-bold hover:underline"
                >
                  Browse Molecular Catalogue
                </button>
              </div>
            )}
          </div>

          {/* Subtotal & proceeds */}
          <div className="p-6 border-t border-border bg-bg-card/40">
            <div className="space-y-1.5 mb-6 text-xs text-text-muted">
              <div className="flex justify-between items-baseline">
                <span>Subtotal amount</span>
                <span className="font-mono text-base font-bold text-white">₱{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span>Estimated dispatch delivery</span>
                <span className="text-[10px] uppercase font-mono text-accent">calculated at stage 2</span>
              </div>
            </div>

            {cartItems.length > 0 ? (
              <button
                id="cart-checkout-btn"
                onClick={onCheckout}
                className="w-full py-4 rounded-xl bg-accent text-bg-deep font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:bg-accent-dim hover:shadow-[0_0_25px_rgba(0,212,255,0.30)] flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            ) : (
              <button
                disabled
                className="w-full py-4 rounded-xl bg-border text-text-muted font-bold text-sm flex items-center justify-center space-x-2 cursor-not-allowed"
              >
                <span>Cartridge Empty</span>
              </button>
            )}

            <div className="mt-4 flex items-center justify-center space-x-1.5 text-[9px] text-text-muted/85">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              <span>Certified original peptides. Verified security protocols.</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
