/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ToastMessage } from '../types.ts';
import { CheckCircle2, ShieldAlert, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5 max-w-sm pointer-events-none" id="toast-notifications-root">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { key?: string; toast: ToastMessage; onDismiss: () => void }) {
  // Auto-dismiss in 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getStyle = (type: 'success' | 'error' | 'info') => {
    switch(type) {
      case 'success': 
        return {
          bg: 'bg-bg-elevated border-success/30',
          glow: 'shadow-[0_8px_32px_rgba(16,185,129,0.18)]',
          barColor: 'bg-success',
          icon: <CheckCircle2 className="h-5 w-5 text-success" />,
        };
      case 'error':
        return {
          bg: 'bg-bg-elevated border-danger/30',
          glow: 'shadow-[0_8px_32px_rgba(239,68,68,0.18)]',
          barColor: 'bg-danger',
          icon: <ShieldAlert className="h-5 w-5 text-danger" />,
        };
      default:
        return {
          bg: 'bg-bg-elevated border-accent/30',
          glow: 'shadow-[0_8px_32px_rgba(0,127,158,0.18)]',
          barColor: 'bg-accent',
          icon: <Info className="h-5 w-5 text-accent" />,
        };
    }
  };

  const styleSet = getStyle(toast.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.88, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0,  scale: 1,    filter: 'blur(0px)' }}
      exit={{    opacity: 0, x: 80,  scale: 0.88, filter: 'blur(4px)' }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`pointer-events-auto flex items-start space-x-3.5 p-4 rounded-xl border ${styleSet.bg} ${styleSet.glow} shadow-2xl relative overflow-hidden`}
      role="alert"
    >
      {/* Shimmer sweep overlay */}
      <div
        className="absolute inset-0 shimmer-sweep pointer-events-none"
        style={{ opacity: 0.06 }}
      />
      {/* Accent progress bar at bottom */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[2px] ${styleSet.barColor}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 4, ease: 'linear' }}
      />

      <div className="flex-shrink-0 relative z-[2]">{styleSet.icon}</div>
      <div className="flex-1 text-xs font-medium font-sans leading-relaxed pr-2 pt-0.5 text-text-primary relative z-[2]">{toast.message}</div>
      <button 
        onClick={onDismiss}
        className="flex-shrink-0 text-text-muted hover:text-text-primary transition relative z-[2]"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}


