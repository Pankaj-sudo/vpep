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
          lerp: 0.15,            // Highly-responsive smooth scroll interpolation (extremely fluid on both 60Hz and 120Hz)
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

// ─── Cursor Glow Trail (Desktop Only) ─────────────────────────────────────
// A smooth magnetic orb that follows the cursor with lerp interpolation.
// Only activates on non-touch, pointer-capable devices.
function initCursorGlow() {
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (prefersReduced || isTouch) return;

    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId: number;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function animateGlow() {
      // Smooth lerp interpolation for the orb (0.08 = very silky lag)
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.left = `${glowX}px`;
      glow.style.top  = `${glowY}px`;
      rafId = requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // Clean up if ever needed
    (window as any).__cleanupCursorGlow = () => {
      cancelAnimationFrame(rafId);
      glow.remove();
    };
  } catch (err) {
    // Cursor glow is purely cosmetic — fail silently
  }
}

// ─── Card Magnetic Spotlight (updates CSS vars on mousemove) ──────────────
// For .card-magnetic elements, tracks cursor position so the spotlight
// follows the mouse within each card independently.
function initCardMagnetic() {
  try {
    document.addEventListener('mousemove', (e) => {
      const cards = document.querySelectorAll<HTMLElement>('.card-magnetic');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
    }, { passive: true });
  } catch (err) {
    // Non-critical enhancement
  }
}

initLenis();

// Defer non-critical enhancements until after first render
requestAnimationFrame(() => {
  initCursorGlow();
  initCardMagnetic();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
