/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { ToastMessage } from '../types.ts';
import { CheckCircle2, ShieldAlert, Info, X } from 'lucide-react';

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export default function Toast({ toasts, removeToast }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2.5 max-w-sm pointer-events-none" id="toast-notifications-root">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
      ))}
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
          bg: 'bg-bg-elevated border-success/30 text-white',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]',
          icon: <CheckCircle2 className="h-5 w-5 text-success animate-pulse" />
        };
      case 'error':
        return {
          bg: 'bg-bg-elevated border-danger/30 text-white',
          glow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]',
          icon: <ShieldAlert className="h-5 w-5 text-danger" />
        };
      default:
        return {
          bg: 'bg-bg-elevated border-accent/30 text-white',
          glow: 'shadow-[0_0_15px_rgba(0,212,255,0.1)]',
          icon: <Info className="h-5 w-5 text-accent" />
        };
    }
  };

  const styleSet = getStyle(toast.type);

  return (
    <div 
      className={`pointer-events-auto flex items-start space-x-3.5 p-4 rounded-xl border ${styleSet.bg} ${styleSet.glow} border bg-bg-elevated p-4 animate-in slide-in-from-right-10 duration-200 shadow-2xl relative overflow-hidden`}
      role="alert"
    >
      <div className="flex-shrink-0">{styleSet.icon}</div>
      <div className="flex-1 text-xs font-medium font-sans leading-relaxed pr-2 pt-0.5">{toast.message}</div>
      <button 
        onClick={onDismiss}
        className="flex-shrink-0 text-text-muted hover:text-white transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
