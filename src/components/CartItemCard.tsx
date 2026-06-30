import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { X, Minus, Plus } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CartItemCardProps {
  item: CartItem;
  handleRemoveCartItem: (id: string | number, addonId?: string) => void;
  handleCartQtyChange: (id: string | number, change: number, addonId?: string) => void;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  handleRemoveCartItem,
  handleCartQtyChange,
}) => {
  const [isPopping, setIsPopping] = useState(false);
  const [popDirection, setPopDirection] = useState<'up' | 'down'>('up');
  const prevQtyRef = useRef(item.qty);

  useEffect(() => {
    if (prevQtyRef.current !== item.qty) {
      setPopDirection(item.qty > prevQtyRef.current ? 'up' : 'down');
      setIsPopping(true);
      prevQtyRef.current = item.qty;

      const timer = setTimeout(() => {
        setIsPopping(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [item.qty]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isPopping ? 1.03 : 1,
        borderColor: isPopping
          ? popDirection === 'up'
            ? 'rgba(122, 34, 62, 0.5)' // burgundy-primary
            : 'rgba(244, 63, 94, 0.5)'  // rose-500
          : undefined,
        boxShadow: isPopping
          ? popDirection === 'up'
            ? '0 10px 15px -3px rgba(122, 34, 62, 0.1), 0 4px 6px -4px rgba(122, 34, 62, 0.1)'
            : '0 10px 15px -3px rgba(244, 63, 94, 0.1), 0 4px 6px -4px rgba(244, 63, 94, 0.1)'
          : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{
        scale: { type: 'spring', stiffness: 500, damping: 15 },
        layout: { type: 'spring', stiffness: 500, damping: 30 },
        default: { duration: 0.2 },
      }}
      className="flex gap-3 bg-slate-50 dark:bg-slate-900/40 p-3.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 items-stretch relative overflow-hidden shadow-sm"
      id={`cart-item-${item.id}`}
    >
      {/* Dynamic colored background ripple/flash */}
      <motion.div
        initial={false}
        animate={{
          opacity: isPopping ? 0.06 : 0,
          scale: isPopping ? 1.5 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`absolute inset-0 pointer-events-none rounded-2xl transition-colors ${
          popDirection === 'up' ? 'bg-primary' : 'bg-rose-500'
        }`}
      />

      <ProductImage
        productId={item.id}
        productName={item.name}
        imageUrl={item.image}
        className="w-14 h-14 rounded-xl flex-shrink-0 relative overflow-hidden border border-slate-200/40 dark:border-slate-700 select-none"
        imgClassName="w-full h-full object-cover bg-slate-100"
      />

      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div>
          <div className="flex justify-between items-start gap-1">
            <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-50 truncate">
              {item.name}
            </h4>

            <button
              onClick={() => handleRemoveCartItem(item.id, item.selectedAddonId)}
              className="text-slate-400 hover:text-rose-500 p-0.5 rounded-full hover:bg-slate-200/40 dark:hover:bg-slate-800/50 transition-colors"
              title="Remove item"
              id={`remove-cart-item-${item.id}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
            Purity Threshold: &gt;99% HPLC ({item.unit})
          </p>
          {item.selectedAddonName && (
            <p className="text-[10px] text-primary dark:text-gold-light font-medium mt-0.5">
              📦 Option: {item.selectedAddonName}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/30">
          {/* Subtotal with subtle scaling text scale popup */}
          <motion.p
            animate={{
              scale: isPopping ? 1.06 : 1,
              color: isPopping
                ? popDirection === 'up'
                  ? '#7a223e' // dark burgundy highlight
                  : '#e11d48' // dark rose-500 highlight
                : undefined,
            }}
            transition={{ type: 'spring', stiffness: 450, damping: 15 }}
            className="font-mono text-xs font-black text-primary dark:text-gold-light"
          >
            ₱{(item.price * item.qty).toLocaleString()}
          </motion.p>

          {/* Qty selectors */}
          <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-700/85 p-0.5 relative z-10">
            <button
              onClick={() => handleCartQtyChange(item.id, -1, item.selectedAddonId)}
              className="w-6 h-6 hover:bg-slate-100 dark:hover:bg-slate-850 rounded flex items-center justify-center transition-colors"
              title="Subtract"
              id={`cart-subtract-${item.id}`}
            >
              <Minus className="w-3 h-3 text-slate-500" />
            </button>

            {/* Quantity text scale popup */}
            <motion.span
              animate={{
                scale: isPopping ? 1.25 : 1,
                y: isPopping ? (popDirection === 'up' ? -1.5 : 1.5) : 0,
                color: isPopping
                  ? popDirection === 'up'
                    ? '#7a223e'
                    : '#e11d48'
                  : undefined,
              }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-8 text-center text-xs font-bold font-mono inline-block select-none"
            >
              {item.qty}
            </motion.span>

            <button
              onClick={() => handleCartQtyChange(item.id, 1, item.selectedAddonId)}
              className="w-6 h-6 hover:bg-slate-100 dark:hover:bg-slate-850 rounded flex items-center justify-center transition-colors"
              title="Add"
              id={`cart-add-${item.id}`}
            >
              <Plus className="w-3 h-3 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
