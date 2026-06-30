/**
 * useMouseParallax — tracks mouse position and returns normalized x/y values
 * for use in subtle parallax depth effects. Values range from -1 to 1.
 *
 * Usage:
 *   const { x, y } = useMouseParallax();
 *   style={{ transform: `translate(${x * 12}px, ${y * 8}px)` }}
 */

import { useEffect, useState } from 'react';

interface MousePosition {
  x: number; // -1 to 1 (left to right)
  y: number; // -1 to 1 (top to bottom)
}

export function useMouseParallax(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Don't run on touch-only devices or when reduced motion is preferred
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1 range from viewport center
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Lerp-based smooth interpolation loop — 60 FPS
    const animate = () => {
      const lerpFactor = 0.06; // Lower = smoother/slower follow
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      setPosition({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return position;
}
