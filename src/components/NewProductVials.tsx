import React from "react";

// 1. 5-Amino-1MQ: NNMT inhibitor for cellular energy & metabolism
export const FiveAminoVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "50mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="fa-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="fa-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="40%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="fa-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fda4af" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e11d48" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="fa-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
        <linearGradient id="fa-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#fff1f2" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ffe4e6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="fa-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fff5f5" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="fa-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="fa-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#fa-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#fa-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#fa-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#fecdd3" strokeWidth="1.5" opacity="0.4" />

        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#fa-powder-grad)" opacity="0.95" />
        <circle cx="115" cy="312" r="1.5" fill="#f43f5e" opacity="0.3" />
        <circle cx="148" cy="306" r="1.2" fill="#fda4af" opacity="0.8" />
        <circle cx="180" cy="314" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#fa-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#fa-glass-body)" stroke="#fda4af" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#fa-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#fa-cap-grad)" stroke="#881337" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#fa-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#fa-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="13" fill="#881337" textAnchor="middle" letterSpacing="-0.3">5-Amino-1MQ</text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#be123c" textAnchor="middle">NNMT Energy Inhibitor</text>

        {/* Dynamic metabolic star ring */}
        <g stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.7" transform="translate(148, 201)">
          <path d="M12 2 L15 9 L22 12 L15 15 L12 22 L9 15 L2 12 L9 9 Z" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" fill="#f43f5e" opacity="0.3" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#1f0909" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#e11d48" textAnchor="middle" letterSpacing="0.1">STERILE RESEARCH VIAL</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: 5AMQ-331B | EXP: 09/2027</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 2. Semax: Cognitive enhancement & neurological support
export const SemaxVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "5mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="se-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="se-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="se-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#0284c7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="se-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f0f9ff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e0f2fe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="se-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f8fafc" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e0f2fe" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="se-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="se-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#se-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#se-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#se-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#se-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#se-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#se-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#se-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#se-cap-grad)" stroke="#0c4a6e" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#se-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#se-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#0c4a6e" textAnchor="middle" letterSpacing="-0.3">SEMAX</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#0284c7" textAnchor="middle">Neurogenic Heptapeptide</text>

        {/* Cognitive synapse design */}
        <g stroke="#0ea5e9" strokeWidth="0.8" fill="none" opacity="0.75" transform="translate(142, 203)">
          <circle cx="8" cy="8" r="1.5" fill="#0ea5e9" />
          <circle cx="24" cy="4" r="1.5" fill="#0ea5e9" />
          <circle cx="16" cy="18" r="1.5" fill="#0ea5e9" />
          <line x1="8" y1="8" x2="24" y2="4" stroke="#0ea5e9" />
          <line x1="16" y1="18" x2="8" y2="8" stroke="#0ea5e9" />
          <line x1="16" y1="18" x2="24" y2="4" stroke="#0ea5e9" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#031824" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#0284c7" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: SMX-005D | EXP: 11/2027</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 3. Epitalon: Biological telomerase activation, Pineal loop
export const EpitalonVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="ep-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="ep-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="40%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
        <linearGradient id="ep-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#0d9488" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#115e59" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#115e59" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ep-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f0fdf4" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#d1fae5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="ep-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f0fdf4" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="ep-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="ep-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e6f4ea" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#ep-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#ep-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#ep-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#ep-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#ep-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#ep-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#ep-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ep-cap-grad)" stroke="#115e59" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ep-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#ep-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#115e59" textAnchor="middle" letterSpacing="-0.3">EPITALON</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#0d9488" textAnchor="middle">Biological Telomerase Activator</text>

        {/* Infini-telomere Loop representation of longevity */}
        <g stroke="#0d9488" strokeWidth="1" fill="none" opacity="0.75" transform="translate(142, 201)">
          <path d="M4 14 C4 14, 4 4, 18 14 C18 14, 32 4, 32 14 C32 24, 18 14, 18 14 C18 14, 4 24, 4 14 Z" strokeLinejoin="round" />
          <circle cx="18" cy="14" r="1.5" fill="#0d9488" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#04231f" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#0f766e" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">CELLULAR RENEWAL ASSAY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: EP-7729A | EXP: 01/2028</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 4. CJC 1295 w/o DAC: Compound GHRH Secretagogue
export const CJC1295Vial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="cjc-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cjc-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="40%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="cjc-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="cjc-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#eff6ff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#dbeafe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="cjc-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f8fafc" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="cjc-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="cjc-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#cjc-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#cjc-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#cjc-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#cjc-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#cjc-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#cjc-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#cjc-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#cjc-cap-grad)" stroke="#1e3a8a" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#cjc-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#cjc-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="13" fill="#1e3a8a" textAnchor="middle" letterSpacing="-0.3">CJC-1295 + IPA</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#3b82f6" textAnchor="middle">Growth Secretagogue Compound</text>

        {/* Double-pulsatile ascending waves */}
        <g stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.75" transform="translate(148, 201)">
          <path d="M2 18 Q6 6, 12 18 T22 18" />
          <path d="M2 13 Q6 1, 12 13 T22 13" strokeDasharray="2, 2" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#041235" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#2563eb" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: CJC-0118P | EXP: 10/2027</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 5. Glow: Premium cellular wellness and anti-oxidant complexes
export const GlowVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "70mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="gl-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="gl-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="40%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <linearGradient id="gl-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#db2777" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#be185d" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#be185d" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="gl-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#fff1f2" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ffe4e6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="gl-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fffbfb" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="gl-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="gl-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#gl-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#gl-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#gl-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#gl-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#gl-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#gl-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#gl-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#gl-cap-grad)" stroke="#be185d" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#gl-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#gl-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="16" fill="#be185d" textAnchor="middle" letterSpacing="-0.3">GLOW</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#db2777" textAnchor="middle">Cellular Rejuvenation Matrix</text>

        {/* Elegant shining star icon */}
        <g stroke="#db2777" strokeWidth="1" fill="none" opacity="0.8" transform="translate(148, 202)">
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" strokeLinejoin="round" fill="#db2777" fillOpacity="0.2" />
          <circle cx="12" cy="12" r="1.5" fill="#f59e0b" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#2d0515" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#be185d" textAnchor="middle" letterSpacing="0.1">PREMIUM BEAUTY MATRIX</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">COLLAGEN & CELLULAR WELLNESS</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: GLW-709A | EXP: 08/2028</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 6. SNAP-8: Neuro-muscular signal suppressor
export const Snap8Vial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="sn-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="sn-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="sn-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#475569" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#334155" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="sn-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f1f5f9" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e2e8f0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="sn-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f8fafc" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="sn-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="sn-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#sn-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#sn-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#sn-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#sn-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#sn-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#sn-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#sn-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#sn-cap-grad)" stroke="#0f172a" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#sn-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#sn-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#334155" textAnchor="middle" letterSpacing="-0.3">SNAP-8</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#475569" textAnchor="middle">Neuromuscular Receptor Inhibitor</text>

        {/* Relaxed block wave */}
        <g stroke="#475569" strokeWidth="1.2" fill="none" opacity="0.75" transform="translate(148, 202)">
          <path d="M2 13 H8 V2 H14 V13 H20" />
          <circle cx="11" cy="7" r="1.5" fill="#94a3b8" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#0f172a" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#334155" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: SNP-8091B | EXP: 04/2028</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 7. Oxytocin: Sleep, Trust, Celestial Calm Indigo Design (indicated for restful, restorative calm)
export const OxytocinVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "2mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="ox-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="ox-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="40%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#312e81" />
        </linearGradient>
        <linearGradient id="ox-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#6366f1" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#4f46e5" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#312e81" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ox-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f5f3ff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ede9fe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="ox-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#faf5ff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="ox-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="ox-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#ox-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#ox-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#ox-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#ox-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#ox-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#ox-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#ox-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ox-cap-grad)" stroke="#312e81" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ox-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#ox-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#312e81" textAnchor="middle" letterSpacing="-0.3">Oxytocin</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#4f46e5" textAnchor="middle">Calming Trust & Sleep Axis</text>

        {/* Peaceful sleep moon & stars cradling a serene heart */}
        <g stroke="#4f46e5" strokeWidth="1" fill="none" opacity="0.8" transform="translate(148, 201)">
          <path d="M 16 4 C 11 4, 8 8, 8 13 C 8 17, 11 20, 15 20 C 9 19, 6 15, 6 11 C 6 6.5, 10 4, 16 4 Z" fill="#818cf8" fillOpacity="0.3" strokeLinejoin="round" />
          <path d="M12 12 C10 10, 7 10, 6 11.5 C5 10, 2 10, 0 11.5 C2 15, 6 17, 6 17 C6 17, 10 15, 12 12 Z" strokeWidth="0.75" fill="#4f46e5" opacity="0.3" transform="translate(12, 4)" />
          <circle cx="21" cy="5" r="0.6" fill="#a5b4fc" />
          <circle cx="18" cy="14" r="0.5" fill="#a5b4fc" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#0e0a24" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#4338ca" textAnchor="middle" letterSpacing="0.1">DEEP RECOVERY & REST</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">STRESS RESILIENCE STUDY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: OXY-0220P | EXP: 12/2027</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 8. LL-37: Antimicrobial peptide, Concentric Protective bio-shield
export const LL37Vial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "5mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="ll-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="ll-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="40%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#115e59" />
        </linearGradient>
        <linearGradient id="ll-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#99f6e4" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#0f766e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#115e59" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ll-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f0fdfa" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ccfbf1" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="ll-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f5fdfb" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ccfbf1" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="ll-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="ll-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ccfbf1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#ll-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#ll-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#ll-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#ll-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#ll-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#ll-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#ll-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ll-cap-grad)" stroke="#115e59" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ll-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#ll-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#115e59" textAnchor="middle" letterSpacing="-0.3">LL-37</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#0f766e" textAnchor="middle">Antimicrobial Cathelicidin</text>

        {/* Concentric immune bio-shield protective nodes */}
        <g stroke="#0f766e" strokeWidth="1" fill="none" opacity="0.8" transform="translate(148, 201)">
          <path d="M 12 2 C 7 5, 4 9, 4 14 C 4 19, 12 22, 12 22 C 12 22, 20 19, 20 14 C 20 9, 17 5, 12 2 Z" fill="#2dd4bf" fillOpacity="0.25" strokeLinejoin="round" />
          <path d="M12 6 L9 13 H15 L12 20 L15 13 H9 L12 6" fill="#0f766e" opacity="0.3" stroke="none" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#04201c" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#0d9488" textAnchor="middle" letterSpacing="0.1">IMMUNOLOGICAL STANDARD</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: LL-37-302V | EXP: 01/2028</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 9. Cagrilintide: Amylin receptor targeting, balance scale weight control
export const CagrilintideVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "5mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="cg-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cg-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="40%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>
        <linearGradient id="cg-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#bef264" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#65a30d" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#365314" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#365314" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="cg-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f7fee7" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ecfccb" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="cg-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fafdf6" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ecfccb" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="cg-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="cg-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ecfccb" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#cg-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#cg-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#cg-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#cg-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#cg-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#cg-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#cg-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#cg-cap-grad)" stroke="#365314" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#cg-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#cg-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" fill="#365314" textAnchor="middle" letterSpacing="-0.3">Cagrilintide</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#65a30d" textAnchor="middle">Amylin Satiety Analogue</text>

        {/* Appetite scale / leaf indicator */}
        <g stroke="#65a30d" strokeWidth="1" fill="none" opacity="0.8" transform="translate(148, 201)">
          <path d="M12 2 L6 20 M12 2 L18 20 M6 20 L18 20" strokeLinejoin="round" />
          <path d="M4 14 C10 14, 12 11, 12 11" />
          <path d="M20 14 C14 14, 12 11, 12 11" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#132004" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#4d7c0f" textAnchor="middle" letterSpacing="0.1">LIPID METABOLIC ASSAY</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: CGR-909K | EXP: 06/2028</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 10. SLU-PP-322: ERR active kinetic exerciser violet lightning/velocity
export const SLUPP322Vial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "5mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="sl-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="sl-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="40%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="sl-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e9d5ff" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#7e22ce" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#4c1d95" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="sl-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#faf5ff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#f3e8ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="sl-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fdfaff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="sl-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="sl-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#sl-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#sl-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#sl-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#sl-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#sl-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#sl-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#sl-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#sl-cap-grad)" stroke="#4c1d95" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#sl-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#sl-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="14" fill="#4c1d95" textAnchor="middle" letterSpacing="-0.3">SLU-PP-322</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#7e22ce" textAnchor="middle">ERR Alpha/Gamma Agonist</text>

        {/* Kinetic lightning runner speed bolt */}
        <g stroke="#a855f7" strokeWidth="1.2" fill="none" opacity="0.8" transform="translate(148, 201)">
          <path d="M14 2 L6 12 H14 L10 21 L18 10 H10 L14 2" fill="#a855f7" fillOpacity="0.2" strokeLinejoin="round" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#1c053a" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#6b21a8" textAnchor="middle" letterSpacing="0.1">ACTIVE EXERCISE MIMETIC</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">ENERGY & SENESCENCE ASSAY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: SLU-322T | EXP: 11/2027</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};

// 11. Kisspeptin: Endocrine Axis Rose Coral node
export const KisspeptinVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "5mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;
  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="kp-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="kp-cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="kp-cap-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffeedd" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f43f5e" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#be123c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9f1239" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="kp-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#fff1f2" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ffe4e6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="kp-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fff5f5" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ffe4e6" stopOpacity="0.98" />
        </linearGradient>
        <linearGradient id="kp-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.4" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="kp-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe4e6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#kp-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#kp-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#kp-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <rect x="91" y="292" width="138" height="34" fill="url(#kp-powder-grad)" rx="4" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#kp-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#kp-glass-body)" stroke="#cbd5e1" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#kp-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        <rect x="111" y="46" width="98" height="32" fill="url(#fa-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#kp-cap-grad)" stroke="#be123c" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#kp-cap-highlight)" />

        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#kp-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#be123c" textAnchor="middle" letterSpacing="-0.3">Kisspeptin</text>
        <text x="160" y="195" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#f43f5e" textAnchor="middle">Upstream Endocrine Modulator</text>

        {/* Upstream hormone axis nodes */}
        <g stroke="#f43f5e" strokeWidth="1" fill="none" opacity="0.8" transform="translate(148, 200)">
          <path d="M12 2 C16 10, 16 14, 12 22 M12 2 C8 10, 8 14, 12 22" strokeLinejoin="round" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <circle cx="12" cy="12" r="2.5" fill="#fda4af" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#2d050f" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#be123c" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: KPS-511X | EXP: 10/2027</text>
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};
