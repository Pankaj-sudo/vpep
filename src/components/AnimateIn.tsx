/**
 * AnimateIn — Reusable scroll-reveal wrapper component.
 * Wraps children in a Framer Motion div that animates from hidden → visible
 * when the element enters the viewport, using useScrollReveal internally.
 *
 * Props:
 *   - delay: animation delay in seconds (default 0)
 *   - duration: animation duration in seconds (default 0.7)
 *   - direction: 'up' | 'down' | 'left' | 'right' (default 'up')
 *   - distance: pixel distance to travel (default 28)
 *   - className: additional class on the wrapper
 *   - once: if true, only animates once (default true)
 */

import React from 'react';
import { motion } from 'motion/react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const directionMap = {
  up:    { y:  1, x: 0 },
  down:  { y: -1, x: 0 },
  left:  { y:  0, x:  1 },
  right: { y:  0, x: -1 },
};

export default function AnimateIn({
  children,
  delay = 0,
  duration = 0.7,
  direction = 'up',
  distance = 28,
  className,
  once = true,
}: AnimateInProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, reset: !once });
  const dir = directionMap[direction];

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      initial={{ opacity: 0, y: dir.y * distance, x: dir.x * distance }}
      animate={isVisible
        ? { opacity: 1, y: 0, x: 0 }
        : { opacity: 0, y: dir.y * distance, x: dir.x * distance }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // power3.out equivalent
      }}
    >
      {children}
    </motion.div>
  );
}
