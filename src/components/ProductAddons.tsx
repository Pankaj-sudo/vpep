import React from 'react';
import { Check, Droplets, Syringe, Sparkles, Star } from 'lucide-react';

export interface AddonOption {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
}

export const ADDON_OPTIONS: AddonOption[] = [
  {
    id: 'vial_only',
    name: 'Vial Only',
    description: 'Base Price',
    priceModifier: 0,
    icon: <div className="w-5 h-5 rounded-full bg-slate-700/50 flex items-center justify-center text-[10px]">🧪</div>,
  },
  {
    id: 'vial_bacwater',
    name: 'Vial + Bacwater',
    description: 'Bacteriostatic Water (3ml)',
    priceModifier: 180,
    icon: <Droplets className="w-4 h-4 text-sky-400" />,
  },
  {
    id: 'vial_reusable_pen',
    name: 'Vial + Reusable Pen',
    description: 'Premium Reusable Pen',
    priceModifier: 1500,
    badge: 'MOST POPULAR',
    badgeColor: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-bold tracking-wider rounded-md px-1.5 py-0.5',
    icon: <Syringe className="w-4 h-4 text-violet-400" />,
  },
  {
    id: 'vial_non_reusable_pen',
    name: 'Vial + Non-Reusable Pen',
    description: 'Non-Reusable Pen',
    priceModifier: 1000,
    badge: 'BUDGET FRIENDLY',
    badgeColor: 'bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold tracking-wider rounded-md px-1.5 py-0.5',
    icon: <Syringe className="w-4 h-4 text-gold-light" />,
  },
];

interface ProductAddonsSelectorProps {
  basePrice: number;
  selectedAddonId: string;
  onChange: (addonId: string) => void;
}

export const ProductAddonsSelector: React.FC<ProductAddonsSelectorProps> = ({
  basePrice,
  selectedAddonId,
  onChange,
}) => {
  const currentAddon = ADDON_OPTIONS.find((opt) => opt.id === selectedAddonId) || ADDON_OPTIONS[0];
  const totalPrice = basePrice + currentAddon.priceModifier;

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/80" id="product-addons-container">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-gold-light" />
          <span>Select Package Option:</span>
        </label>
      </div>

      {/* Package List Grid */}
      <div className="space-y-2.5">
        {ADDON_OPTIONS.map((option) => {
          const isSelected = option.id === selectedAddonId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`w-full text-left rounded-xl p-3.5 flex items-center justify-between border transition-all cursor-pointer select-none relative overflow-hidden group ${
                isSelected
                  ? 'bg-transparent border-primary dark:border-primary ring-1 ring-primary/15'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
              }`}
              id={`addon-option-${option.id}`}
            >
              {/* Highlight background flash when selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
              )}

              <div className="flex items-center gap-3.5 relative z-10">
                {/* Radio Circle */}
                <div
                  className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-primary dark:border-primary bg-primary/10'
                      : 'border-slate-300 dark:border-slate-700 bg-transparent group-hover:border-slate-400 dark:group-hover:border-slate-600'
                  }`}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full bg-primary dark:bg-primary" />
                  )}
                </div>

                {/* Micro icon */}
                <div className="flex-shrink-0">
                  {option.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans font-bold text-xs sm:text-[13px] text-slate-800 dark:text-slate-100">
                      {option.name}
                    </span>
                    {option.badge && (
                      <span className={option.badgeColor}>
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <span className="block text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-normal">
                    {option.description}
                  </span>
                </div>
              </div>

              {/* Price Modifier Label on clean Right Side */}
              <div className="text-right relative z-10 flex-shrink-0">
                <span className="font-mono text-xs font-extrabold text-slate-700 dark:text-slate-200">
                  +₱{option.priceModifier.toLocaleString()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary Total Box conforming exactly to the reference mockup */}
      <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Total Price:
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5">
              Base Price ₱{basePrice.toLocaleString()} + Add-on ₱{currentAddon.priceModifier.toLocaleString()}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-primary dark:text-gold-light font-display">
            ₱{totalPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};
