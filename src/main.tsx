import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// ─── Lenis Smooth Scroll Initialization ───────────────────────────────────
// Buttery 60 FPS smooth scrolling using the modern Lenis v2 API.
// Respects prefers-reduced-motion. Wrapped in try/catch so any Lenis
// initialization error never breaks page scrolling.
function initLenis() {
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Dynamically import Lenis so a failure doesn't block render
    import('lenis').then(({ default: Lenis }) => {
      try {
        const lenis = new Lenis({
          duration: 1.2,        // Momentum duration (silky momentum)
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.1,  // Enhanced scroll response
          syncTouch: false,     // Disabled to let mobile/touch use native hardware-accelerated 120Hz scrolling
        });

        // Drive Lenis manually via requestAnimationFrame loop (guarantees device-native 60Hz/120Hz refresh alignment)
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Expose globally for any scroll-to utility calls
        (window as any).__lenis = lenis;
      } catch (err) {
        console.warn('[Lenis] Failed to initialize smooth scroll:', err);
      }
    }).catch(err => {
      console.warn('[Lenis] Failed to import lenis:', err);
    });
  } catch (err) {
    console.warn('[Lenis] Initialization error:', err);
  }
}

initLenis();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
