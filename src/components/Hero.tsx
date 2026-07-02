/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ShieldCheck, Microscope, Dna } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useMouseParallax } from '../hooks/useMouseParallax';

interface HeroProps {
  user: any;
  onShopClick: () => void;
  onSignIn: () => void;
}

// ─── Ambient CSS particle positions (scattered, never overlap content) ─────────
const PARTICLES = [
  { left: '8%',  top: '20%', duration: '7s',  delay: '0s'    },
  { left: '15%', top: '65%', duration: '9s',  delay: '1.2s'  },
  { left: '22%', top: '40%', duration: '6s',  delay: '2.5s'  },
  { left: '5%',  top: '80%', duration: '11s', delay: '0.4s'  },
  { left: '88%', top: '15%', duration: '8s',  delay: '1.8s'  },
  { left: '92%', top: '55%', duration: '7.5s',delay: '3.1s'  },
  { left: '78%', top: '75%', duration: '10s', delay: '0.9s'  },
  { left: '95%', top: '35%', duration: '6.5s',delay: '2.0s'  },
  { left: '32%', top: '88%', duration: '9s',  delay: '0.7s'  },
  { left: '68%', top: '90%', duration: '8.5s',delay: '1.5s'  },
  { left: '50%', top: '5%',  duration: '7s',  delay: '0.3s'  },
  { left: '42%', top: '92%', duration: '12s', delay: '2.8s'  },
];

// ─── Animation variants (simplified to static/instant states for smooth scrolling) ───
const heroContainerVariants = {
  hidden: {},
  visible: {},
};

const heroItemVariants = {
  hidden:  {},
  visible: {},
};

const heroRightVariants = {
  hidden:  {},
  visible: {},
};

const trustCardVariants = {
  hidden:  {},
  visible: () => ({}),
};

export default function Hero({ user, onShopClick, onSignIn }: HeroProps) {
  const [dosage, setDosage] = useState<number>(0.25);
  const [dialRotation, setDialRotation] = useState<number>(0);
  const [clickIndicator, setClickIndicator] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Mouse parallax for depth effect on vial/pen visuals
  const { x: mouseX, y: mouseY } = useMouseParallax();

  const handleSignIn = () => {
    onSignIn();
  };

  const handlePenInteraction = () => {
    setDialRotation(prev => prev + 45);
    setClickIndicator(true);
    setTimeout(() => setClickIndicator(false), 200);
    setDosage(prev => {
      if (prev >= 1.0) return 0.25;
      return Number((prev + 0.25).toFixed(2));
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  };


  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border min-h-screen flex items-center bg-bg-deep"
    >
      
      {/* ═══════════════════════════════════════════════════ */}
      {/* LAYER 1: Biomimetic Breathing Organic Blobs (ui-ux-pro-max style)  */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Fade vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-deep/40 via-transparent to-bg-deep" />
        {/* Primary morphing orb — DNA blue, top-right */}
        <div
          className="orb-morph ambient-orb ambient-orb-blue absolute"
          style={{
            top: '8%', right: '12%',
            width: 520, height: 480,
          }}
        />
        {/* Secondary morphing orb — life green, bottom-left */}
        <div
          className="orb-morph-slow ambient-orb ambient-orb-green absolute"
          style={{
            bottom: '10%', left: '5%',
            width: 400, height: 360,
          }}
        />
        {/* Accent micro-orb — warm teal, center */}
        <div
          className="blob-breathe ambient-orb ambient-orb-primary absolute"
          style={{
            top: '40%', left: '30%',
            width: 280, height: 240,
            animationDelay: '3s',
          }}
        />
        {/* Extra subtle accent orb — upper left */}
        <div
          className="orb-morph ambient-orb absolute"
          style={{
            top: '15%', left: '8%',
            width: 200, height: 200,
            background: 'radial-gradient(circle, rgba(0,127,158,0.12), transparent 70%)',
            filter: 'blur(60px)',
            opacity: 0.25,
            animationDelay: '5s',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* LAYER 2: Ambient CSS floating particles             */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: p.left,
              top: p.top,
              '--duration': p.duration,
              '--delay': p.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* LAYER 3: Subtle grid pattern overlay                */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.25] select-none z-[3]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="peptide-hero-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#A3B3D2" />
              <circle cx="80" cy="50" r="2" fill="#A3B3D2" />
              <path d="M20 20 L80 50" stroke="#A3B3D2" strokeWidth="0.5" />
              <circle cx="50" cy="80" r="2" fill="#A3B3D2" />
              <path d="M80 50 L50 80" stroke="#A3B3D2" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#peptide-hero-grid)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* LAYER 4: Hero Content & Interactive Visuals        */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-[10] py-24 lg:py-32 w-full flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Heading, Subtext, and CTA Buttons */}
          {/* Staggered entrance animation on mount */}
          <motion.div
            className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center"
            variants={heroContainerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Subtle clean uppercase broadsheet label */}
            <motion.p
              variants={heroItemVariants}
              className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-6 font-mono font-bold"
            >
              Precision Peptides. Science You Can Trust.
            </motion.p>

            {/* Heading with Cormorant luxury serif (ui-ux-pro-max typography) */}
            <motion.h2
              variants={heroItemVariants}
              className="font-display font-cormorant text-5xl sm:text-7xl md:text-[80px] lg:text-[88px] leading-[0.88] font-bold tracking-tight italic text-text-primary mb-8"
            >
              Enhanced<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#006680] not-italic font-extrabold tracking-tighter">
                Recovery System
              </span>
            </motion.h2>

            {/* Clinical body explanation */}
            <motion.p
              variants={heroItemVariants}
              className="mt-4 max-w-xl text-xs sm:text-sm text-text-muted leading-relaxed uppercase tracking-wider font-mono lg:mx-0 mx-auto"
            >
              Premium medical-grade compounds formulated for clinical efficacy and athletic optimization. Independently HPLC lab-verified showing ≥98.5% purity.
            </motion.p>

            {/* Credibility micro-badges (ui-ux-pro-max: add trust signals, avoid poor credibility) */}
            <motion.div
              variants={heroItemVariants}
              className="mt-5 flex flex-wrap items-center lg:justify-start justify-center gap-2"
            >
              <span className="badge-lab">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                HPLC Verified ≥98.5%
              </span>
              <span className="badge-lab">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-.5 6a.5.5 0 011 0v4a.5.5 0 01-1 0V8zm3 0a.5.5 0 011 0v4a.5.5 0 01-1 0V8z" clipRule="evenodd"/></svg>
                Research Grade
              </span>
              <span className="badge-lab-blue">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z" clipRule="evenodd"/></svg>
                COA Available
              </span>
              <span className="badge-lab-blue">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm3 6v-1h4v1a2 2 0 11-4 0zm4-2a5 5 0 10-4 0h4z"/></svg>
                GMP Facility
              </span>
            </motion.div>

            {/* Call to action buttons */}
            <motion.div
              variants={heroItemVariants}
              className="mt-10 flex flex-col sm:flex-row items-center lg:justify-start justify-center gap-4"
            >
              <motion.button
                id="hero-cta-shop"
                onClick={onShopClick}
                onMouseMove={handleMouseMove}
                className="btn-ripple btn-life-green btn-spotlight group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full text-white font-extrabold text-xs uppercase tracking-widest cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              >
                <span>Shop Clinical Catalogue</span>
                <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </motion.button>

              {!user && (
                <motion.button
                  id="hero-cta-signin"
                  onClick={handleSignIn}
                  className="btn-ripple w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full border border-border bg-white text-text-primary text-xs font-bold uppercase tracking-widest hover:border-accent/40 hover:text-accent hover:bg-bg-elevated transition-colors duration-300 cursor-pointer shadow-sm"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 20 }}
                >
                  <span>Sign In with Google</span>
                </motion.button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Custom Reusable Peptide Injector Pen & Vial Animation */}
          {/* Mouse parallax drives subtle depth shift */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center relative min-h-[380px] lg:min-h-[460px] select-none"
            variants={heroRightVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              // Mouse parallax depth effect — GPU transform only
              transform: `translate(${mouseX * 12}px, ${mouseY * 8}px)`,
            }}
          >
            
            {/* Background Circular Aura Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] rounded-full border border-border/40 animate-[spin_40s_linear_infinite] relative">
                <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-accent/30 -translate-x-1/2" />
                <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 rounded-full bg-accent/20 -translate-x-1/2" />
              </div>
              <div className="absolute w-[220px] h-[220px] rounded-full border border-dashed border-border/30 animate-[spin_25s_linear_infinite_reverse]" />
            </div>

            <div className="relative flex items-center justify-center gap-12 z-10 w-full max-w-sm">
              
              {/* 1. PEPTIDE VIAL: Floats and features glass reflections */}
              <motion.div 
                animate={{ 
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.06, rotate: -2, transition: { type: 'spring', stiffness: 300 } }}
                className="relative cursor-pointer w-28 sm:w-32 shrink-0 filter drop-shadow-[0_16px_24px_rgba(0,127,158,0.08)]"
              >
                <svg viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <defs>
                    <linearGradient id="hero-cap" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="0%" stopColor="#007F9E" />
                      <stop offset="100%" stopColor="#005B73" />
                    </linearGradient>
                    <linearGradient id="hero-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#CBD5E1" />
                      <stop offset="50%" stopColor="#F8FAFC" />
                      <stop offset="100%" stopColor="#94A3B8" />
                    </linearGradient>
                    <linearGradient id="hero-glass" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                      <stop offset="20%" stopColor="#E0F2FE" stopOpacity="0.2" />
                      <stop offset="80%" stopColor="#E0F2FE" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="hero-liquid" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#007F9E" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#005B73" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  
                  {/* Glass Base & Bottom */}
                  <path d="M 30 190 C 30 190, 30 205, 40 205 L 120 205 C 130 205, 130 190, 130 190 Z" fill="url(#hero-glass)" stroke="#94A3B8" strokeWidth="1" />
                  
                  {/* Liquid inside the vial */}
                  <path d="M 31 160 Q 80 155, 129 160 L 129 192 C 129 198, 120 202, 105 202 L 55 202 C 40 202, 31 198, 31 192 Z" fill="url(#hero-liquid)" />
                  
                  {/* Floating clinical active ingredient bubbles (rise on hover) */}
                  <g className="vial-bubbles opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <circle cx="50" cy="195" r="1.5" fill="#E0F2FE" className="bubble-rise-1" />
                    <circle cx="68" cy="190" r="2.0" fill="#E0F2FE" className="bubble-rise-2" />
                    <circle cx="95" cy="198" r="1.0" fill="#E0F2FE" className="bubble-rise-3" />
                    <circle cx="80" cy="192" r="1.8" fill="#E0F2FE" className="bubble-rise-1" />
                    <circle cx="110" cy="194" r="1.2" fill="#E0F2FE" className="bubble-rise-2" />
                  </g>
                  
                  {/* Main Glass Cylinder */}
                  <path d="M 30 75 L 30 190 C 30 195, 32 198, 36 198 L 124 198 C 128 198, 130 195, 130 190 L 130 75 Z" fill="url(#hero-glass)" stroke="#94A3B8" strokeWidth="1" />
                  
                  {/* Vial neck */}
                  <path d="M 50 62 C 50 62, 50 78, 42 78 L 118 78 C 110 78, 110 62, 110 62 Z" fill="url(#hero-glass)" stroke="#94A3B8" strokeWidth="1" />
                  
                  {/* Aluminum Crimp Seal */}
                  <rect x="52" y="38" width="56" height="24" fill="url(#hero-metal)" stroke="#94A3B8" strokeWidth="0.5" />
                  
                  {/* Flip-off Cap */}
                  <rect x="46" y="22" width="68" height="16" rx="3" fill="url(#hero-cap)" stroke="#005B73" strokeWidth="0.5" />
                  
                  {/* Premium Clinical Label */}
                  <rect x="32" y="90" width="96" height="60" rx="2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.5" />
                  <rect x="32" y="94" width="96" height="14" fill="#007F9E" />
                  <text x="80" y="104" fontFamily="monospace" fontWeight="900" fontSize="7" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">VITAPEP</text>
                  <text x="80" y="122" fontFamily="sans-serif" fontWeight="900" fontSize="10" fill="#111A2C" textAnchor="middle">BPC-157</text>
                  <text x="80" y="132" fontFamily="monospace" fontWeight="700" fontSize="5.5" fill="#007F9E" textAnchor="middle">10MG BATCH</text>
                  <text x="80" y="142" fontFamily="sans-serif" fontWeight="500" fontSize="4.5" fill="#53627C" textAnchor="middle" letterSpacing="0.3">LABORATORY RESEARCH</text>

                  {/* Highlights and reflections */}
                  <line x1="40" y1="80" x2="40" y2="190" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
                  <line x1="120" y1="80" x2="120" y2="190" stroke="#FFFFFF" strokeWidth="0.75" strokeLinecap="round" opacity="0.2" />
                </svg>
              </motion.div>

              {/* 2. REUSABLE PEPTIDE PEN: Diagonal floating, click to dial dosage */}
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                onClick={handlePenInteraction}
                whileHover={{ scale: 1.05, rotate: 1, transition: { type: 'spring', stiffness: 300 } }}
                whileTap={{ scale: 0.96 }}
                className="relative cursor-pointer w-20 sm:w-24 shrink-0 filter drop-shadow-[0_16px_28px_rgba(0,127,158,0.12)]"
              >
                {/* Visual Dial Click indicator popout */}
                {clickIndicator && (
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded shadow animate-ping">
                    CLICK!
                  </span>
                )}

                <svg viewBox="0 0 120 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <defs>
                    <linearGradient id="pen-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#1E2D45" />
                      <stop offset="40%" stopColor="#4A5C75" />
                      <stop offset="70%" stopColor="#1E2D45" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>
                    <linearGradient id="pen-accent-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#007F9E" />
                      <stop offset="45%" stopColor="#00C4EF" />
                      <stop offset="85%" stopColor="#005B73" />
                    </linearGradient>
                    <linearGradient id="pen-steel" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="50%" stopColor="#F1F5F9" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                  </defs>

                  {/* Pen Injector Button (Top) */}
                  <rect x="44" y="10" width="32" height="12" rx="2" fill="url(#pen-steel)" stroke="#475569" strokeWidth="0.5" />
                  
                  {/* Reusable Dosing Dial Selector with dynamic rotation */}
                  <g transform={`translate(60, 36)`}>
                    <g transform={`rotate(${dialRotation})`}>
                      <rect x="-22" y="-14" width="44" height="28" rx="2" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                      {/* Ribbed lines */}
                      <line x1="-16" y1="-10" x2="-16" y2="10" stroke="#475569" strokeWidth="1.5" />
                      <line x1="-8"  y1="-10" x2="-8"  y2="10" stroke="#475569" strokeWidth="1.5" />
                      <line x1="0"   y1="-10" x2="0"   y2="10" stroke="#475569" strokeWidth="1.5" />
                      <line x1="8"   y1="-10" x2="8"   y2="10" stroke="#475569" strokeWidth="1.5" />
                      <line x1="16"  y1="-10" x2="16"  y2="10" stroke="#475569" strokeWidth="1.5" />
                    </g>
                  </g>

                  {/* Main Pen Body Casing */}
                  <rect x="22" y="50" width="76" height="150" rx="6" fill="url(#pen-metal)" stroke="#0F172A" strokeWidth="1" />

                  {/* Premium Brand Print on Body */}
                  <text x="60" y="90"  fontFamily="sans-serif"  fontWeight="900" fontSize="8.5" fill="#00C4EF" textAnchor="middle" letterSpacing="2">VITAPEP</text>
                  <text x="60" y="102" fontFamily="monospace"  fontWeight="700" fontSize="5.5" fill="#E2E8F0" textAnchor="middle" letterSpacing="0.5">REUSABLE PEN</text>

                  {/* Dosage Value Window Display */}
                  <rect x="38" y="125" width="44" height="24" rx="3" fill="#02050A" stroke="#334155" strokeWidth="0.75" />
                  <text x="60" y="141" fontFamily="monospace" fontWeight="900" fontSize="11" fill="#00D4FF" textAnchor="middle">
                    {dosage.toFixed(2)}
                  </text>
                  <text x="80" y="133" fontFamily="sans-serif" fontSize="5.5" fill="#64748B" textAnchor="middle">mg</text>

                  {/* Chrome Connector ring */}
                  <rect x="28" y="200" width="64" height="12" fill="url(#pen-steel)" />

                  {/* Cartridge Chamber Window (Lower half) */}
                  <rect x="30" y="212" width="60" height="96" rx="4" fill="url(#hero-glass)" stroke="#475569" strokeWidth="1" />
                  
                  {/* Cartridge Inside Liquid */}
                  <rect x="36" y="222" width="48" height="74" fill="url(#hero-liquid)" />
                  <line x1="36" y1="235" x2="48" y2="235" stroke="#007F9E" strokeWidth="1" opacity="0.8" />
                  <line x1="36" y1="248" x2="48" y2="248" stroke="#007F9E" strokeWidth="1" opacity="0.8" />
                  <line x1="36" y1="261" x2="48" y2="261" stroke="#007F9E" strokeWidth="1" opacity="0.8" />
                  <line x1="36" y1="274" x2="48" y2="274" stroke="#007F9E" strokeWidth="1" opacity="0.8" />

                  {/* Pen Thread Tip (Bottom end connector) */}
                  <path d="M 46 308 L 74 308 L 70 326 L 50 326 Z" fill="url(#pen-accent-metal)" stroke="#005B73" strokeWidth="0.5" />
                  <rect x="52" y="326" width="16" height="8" fill="url(#pen-steel)" />

                  {/* Reflections and highlight lines */}
                  <line x1="28" y1="55" x2="28" y2="195" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.15" />
                  <line x1="92" y1="55" x2="92" y2="195" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.08" />
                </svg>
              </motion.div>
            </div>
            
            {/* Visual Instruction Cue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute bottom-0 bg-white/70 backdrop-blur-sm border border-border px-3 py-1 rounded-full text-[9px] font-mono text-text-muted uppercase tracking-widest pointer-events-none shadow-sm"
            >
              Click Pen to dial Dose
            </motion.div>

          </motion.div>

          {/* Trust indicators in glassmorphic cards with magnetic spotlight + glow border */}
          <div className="lg:col-span-12 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl text-left mx-auto lg:mx-0">
            {[
              {
                icon: <ShieldCheck className="h-5 w-5 text-accent" />,
                title: 'Guaranteed Purity',
                desc: 'Independently HPLC validated batches showing ≥98.5% concentration.',
                floatClass: 'badge-float',
              },
              {
                icon: <Microscope className="h-5 w-5 text-accent" />,
                title: 'Full Transparency',
                desc: 'Public Certificate of Analysis (COA) results attached to each vial.',
                floatClass: 'badge-float-slow',
              },
              {
                icon: <Dna className="h-5 w-5 text-accent" />,
                title: 'Rapid Dispatch',
                desc: 'Same-day courier delivery via GrabExpress or Lalamove in Metro Manila.',
                floatClass: 'badge-float-delayed',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-border bg-white/70 backdrop-blur-md shadow-sm hover:border-accent/15 hover:shadow-md transition-all duration-300 cursor-default"
              >
                <div className="flex items-center space-x-2.5 mb-3">
                  {card.icon}
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-text-primary">{card.title}</h4>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Scroll-down bounce indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="lg:col-span-12 flex justify-center mt-8"
          >
            <div className="scroll-bounce flex flex-col items-center gap-1.5 text-text-muted/50 cursor-pointer" onClick={onShopClick}>
              <span className="text-[9px] font-mono uppercase tracking-widest">Explore Catalog</span>
              <ArrowDown className="h-4 w-4" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
