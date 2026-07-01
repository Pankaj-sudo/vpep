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
          lerp: 0.1,            // Buttery smooth momentum (0.1 is standard)
          syncTouch: false,     // Disabled to let mobile use native high-performance touch scrolling
        });

        // Drive Lenis manually via requestAnimationFrame loop (guarantees cross-browser 60FPS)
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
