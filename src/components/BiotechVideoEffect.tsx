import React, { useEffect, useRef, useState } from 'react';

interface BiotechVideoEffectProps {
  glowIntensity: number;
  showGrid?: boolean;
  showMolecules?: boolean;
  speed?: 'slow' | 'medium' | 'fast';
  mode?: 'cellular' | 'plexus' | 'dna';
}

export const BiotechVideoEffect: React.FC<BiotechVideoEffectProps> = ({
  glowIntensity = 0.65,
  showGrid = true,
  showMolecules = true,
  speed = 'medium',
  mode = 'plexus',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Load interactive state values
  const [useMouseAttraction, setUseMouseAttraction] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle high DPI crispness
    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Particle class definition
    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 0;
      color: string = '';
      alpha: number = 0;
      pulseSpeed: number = 0;
      pulseAngle: number = 0;

      constructor() {
        this.reset();
        // distribute initially
        this.x = Math.random() * width;
        this.y = Math.random() * height;
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 10; // start near bottom
        
        let speedMultiplier = 0.5;
        if (speed === 'slow') speedMultiplier = 0.25;
        if (speed === 'fast') speedMultiplier = 1.0;

        this.vx = (Math.random() - 0.5) * speedMultiplier;
        this.vy = -(Math.random() * 0.8 + 0.2) * speedMultiplier;
        this.radius = Math.random() * 3 + 1.2;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulseAngle = Math.random() * Math.PI;

        // Choose between peptide gold (amber) and laboratory cyan
        this.color = Math.random() > 0.4 ? 'rgba(34, 211, 238, ' : 'rgba(245, 158, 11, ';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Pulse size and glow rate
        this.pulseAngle += this.pulseSpeed;
        const currentAlpha = this.alpha * (0.7 + Math.sin(this.pulseAngle) * 0.3) * glowIntensity;

        // Mouse gravity pull (attractor)
        if (mouseRef.current.active && useMouseAttraction) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180) {
            const force = (180 - dist) / 180 * 0.08;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        }

        // Apply friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        // If particle moves out of boundaries, recycle
        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        const currentAlpha = this.alpha * (0.7 + Math.sin(this.pulseAngle) * 0.3) * glowIntensity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color + currentAlpha + ')';
        ctx.fill();

        // Extra outer glow for larger particles
        if (this.radius > 2.5) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color + (currentAlpha * 0.15) + ')';
          ctx.fill();
        }
      }
    }

    // Set up initial particle arrays
    const particleCount = mode === 'cellular' ? 100 : 60;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Laser vertical scanner beam parameters
    let laserY = 0;
    let laserDirection = 1;
    let laserPulse = 0;

    // Holographic horizontal biosinusoids wave parameters
    let waveAngle = 0;

    // Core Animation loop
    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle fluid grid lines scanning if showGrid is on
      if (showGrid) {
        ctx.strokeStyle = `rgba(13, 148, 136, ${0.03 * glowIntensity})`;
        ctx.lineWidth = 0.5;
        const gridSize = 40;
        
        // Vertical lines with slight horizontal drift
        const drift = (Date.now() * 0.01) % gridSize;
        for (let x = drift; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 2. Render kinetic glowing biochem energy ribbons (dynamic video curves)
      waveAngle += speed === 'slow' ? 0.005 : speed === 'fast' ? 0.02 : 0.01;
      ctx.lineWidth = 1;
      
      // Wave 1: Cyan Ribbon
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = height * 0.45 + Math.sin(x * 0.004 + waveAngle) * 40 * Math.sin(waveAngle * 0.2);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(34, 211, 238, ${0.12 * glowIntensity})`;
      ctx.stroke();

      // Wave 2: Amber (Gold) Ribbon antiphasic
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = height * 0.52 + Math.cos(x * 0.003 - waveAngle * 0.8) * 35 * Math.sin(waveAngle * 0.15 + 1);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.08 * glowIntensity})`;
      ctx.stroke();

      // 3. Update & render molecular plexus paths
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw connection lines representing peptide chemical bond arrays (Plexus Mode)
      if (mode === 'plexus' || mode === 'dna') {
        const maxDist = 100;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const pi = particles[i];
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.hypot(dx, dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * 0.18 * glowIntensity;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              // Use hybrid connection color or fade
              ctx.strokeStyle = pi.radius > pj.radius 
                ? `rgba(6, 182, 212, ${alpha})` 
                : `rgba(217, 119, 6, ${alpha})`;
              ctx.lineWidth = (1 - dist / maxDist) * 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // 4. Render vertical medical scanner sweep beam (Video HUD effect)
      let laserSpeed = speed === 'slow' ? 0.8 : speed === 'fast' ? 2.5 : 1.4;
      laserY += laserSpeed * laserDirection;
      if (laserY > height) {
        laserY = height;
        laserDirection = -1;
      } else if (laserY < 0) {
        laserY = 0;
        laserDirection = 1;
      }

      laserPulse += 0.05;
      const scanLineAlpha = (0.15 + Math.sin(laserPulse) * 0.05) * glowIntensity;
      
      // Sweep highlight bar
      const gradient = ctx.createLinearGradient(0, laserY - 15, 0, laserY + 15);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
      gradient.addColorStop(0.5, `rgba(6, 182, 212, ${scanLineAlpha})`);
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, laserY - 15, width, 30);

      // Micro bright core scanner line
      ctx.beginPath();
      ctx.moveTo(0, laserY);
      ctx.lineTo(width, laserY);
      ctx.strokeStyle = `rgba(34, 211, 238, ${scanLineAlpha * 1.8})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Mouse movement listener (Internal bounds relative calculation)
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = e.touches[0].clientX - rect.left;
      mouseRef.current.y = e.touches[0].clientY - rect.top;
      mouseRef.current.active = true;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [glowIntensity, showGrid, showMolecules, speed, mode, useMouseAttraction]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden rounded-3xl"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none mix-blend-screen"
      />
    </div>
  );
};
