/**
 * AnimateIn — Reusable container (simplified for smooth scroll performance).
 * Returns a static div to prevent layout shifts and scroll lag.
 */

import React from 'react';

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  once?: boolean;
}

export default function AnimateIn({
  children,
  className,
}: AnimateInProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
