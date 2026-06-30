/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 * Returns a ref to attach to the element and a boolean `isVisible` that flips
 * to true once the element enters the viewport. Once visible, it stays visible
 * (animations don't replay unless `reset: true` is passed).
 */

import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  /** Fraction of element that must be visible before triggering. Default: 0.12 */
  threshold?: number;
  /** Root margin for early/late trigger. Default: "0px 0px -40px 0px" */
  rootMargin?: string;
  /** If true, resets visibility when element leaves viewport. Default: false */
  reset?: boolean;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px', reset = false } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion — mark instantly as visible
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!reset) observer.unobserve(el);
        } else if (reset) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, reset]);

  return { ref, isVisible };
}
