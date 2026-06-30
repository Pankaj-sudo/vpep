import React from 'react';
import { ImageOff } from 'lucide-react';
import { products } from '../data';
import {
  FiveAminoVial,
  SemaxVial,
  EpitalonVial,
  CJC1295Vial,
  GlowVial,
  Snap8Vial,
  OxytocinVial,
  LL37Vial,
  CagrilintideVial,
  SLUPP322Vial,
  KisspeptinVial
} from './NewProductVials';

// Highly polished SVG vector reproduction of the Bacteriostatic Water 10ml Ampoule
export const BacWaterVial: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      viewBox="0 0 600 300" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Ambient shadow for the ampoule */}
        <filter id="soft-shadow" x="-5%" y="-5%" width="112%" height="118%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="10" />
          <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradients to simulate transparent plastic texture with liquid density */}
        <linearGradient id="vial-plastic-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="10%" stopColor="#f3f7fa" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#dbe7ee" stopOpacity="0.2" />
          <stop offset="85%" stopColor="#bcd4e2" stopOpacity="0.4" />
          <stop offset="95%" stopColor="#a3bfd2" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="highlight-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
        </linearGradient>

        <linearGradient id="label-bg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fcfdfe" />
          <stop offset="100%" stopColor="#f1f4f7" />
        </linearGradient>

        {/* Exact royal/deep blue matching medical grade labeling */}
        <linearGradient id="label-header-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0a3980" />
          <stop offset="100%" stopColor="#104ead" />
        </linearGradient>

        <linearGradient id="tab-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="30%" stopColor="#f0f5f9" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#d1e0eb" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#b1cadb" stopOpacity="0.75" />
        </linearGradient>
      </defs>

      {/* Group with soft shadow */}
      <g filter="url(#soft-shadow)">
        {/* Twist-off tab on the far left */}
        <path 
          d="M 15 110 L 95 110 a 5 5 0 0 1 5 5 L 100 185 a 5 5 0 0 1 -5 5 L 15 190 a 5 5 0 0 1 -5 -5 L 10 115 a 5 5 0 0 1 5 -5 Z" 
          fill="url(#tab-grad)" 
          stroke="#acd1eb" 
          strokeWidth="1.25" 
        />
        {/* Tab embossed details */}
        <path 
          d="M 23 120 L 87 121 M 55 121 L 55 179 M 23 179 L 87 179" 
          stroke="#9fc0d7" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          opacity="0.7"
        />

        {/* Connection bridge neck */}
        <path 
          d="M 100 135 C 100 135, 112 135, 112 142 L 112 158 C 112 165, 100 165, 100 165 Z" 
          fill="url(#vial-plastic-grad)" 
          stroke="#a2c4dd" 
          strokeWidth="1.25" 
        />

        {/* Main clear plastic body & elegant shoulder curves */}
        <path 
          d="M 112 142 C 120 120, 135 115, 175 115 C 185 115, 195 100, 205 100 L 565 100 C 585 100, 590 115, 590 135 L 590 165 C 590 185, 585 200, 565 200 L 205 200 C 195 200, 185 185, 175 185 C 135 185, 120 180, 112 158 Z" 
          fill="url(#vial-plastic-grad)" 
          stroke="#a3c7df" 
          strokeWidth="1.5" 
        />

        {/* Medical glass refraction & meniscus highlights */}
        <line x1="175" y1="116" x2="570" y2="116" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
        <line x1="185" y1="184" x2="570" y2="184" stroke="#87afc7" strokeWidth="1.25" opacity="0.4" />
        
        {/* Fluid level boundary curves */}
        <path d="M 160 140 Q 170 148 180 140" stroke="#ffffff" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
        <ellipse cx="510" cy="128" rx="5" ry="2.5" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.4" />
        <ellipse cx="440" cy="172" rx="3" ry="1.5" fill="none" stroke="#ffffff" strokeWidth="0.75" opacity="0.35" />

        {/* Reflection sheen overlay on clear plastic barrel */}
        <rect x="200" y="103" width="370" height="7" fill="url(#highlight-grad)" />
        <rect x="200" y="189" width="370" height="6" fill="#ffffff" opacity="0.25" />

        {/* Standardized professional text label on the vial body */}
        <rect 
          x="226" 
          y="107" 
          width="328" 
          height="86" 
          rx="4" 
          fill="url(#label-bg)" 
          stroke="#bed1df" 
          strokeWidth="0.75" 
        />

        {/* Label top headers block (Solid deep blue color matching clinical guidelines) */}
        <path 
          d="M 226.5 107.5 L 553.5 107.5 A 3.5 3.5 0 0 1 553.5 125.5 L 226.5 125.5 Z" 
          fill="url(#label-header-blue)" 
        />

        {/* Royal blue label header title */}
        <text 
          x="390" 
          y="119.5" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="9" 
          fill="#ffffff" 
          textAnchor="middle" 
          letterSpacing="0.4"
        >
          Bacteriostatic Water For Injection USP 10ml
        </text>

        {/* Left Column Content - Drug Information */}
        <text x="234" y="134" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6" fill="#0f172a">
          Each ml contains:
        </text>
        <text x="234" y="141.5" fontFamily="'Inter', sans-serif" fontSize="5.5" fill="#334155">
          Benzyl Alcohol USP 0.9% w/v
        </text>
        <text x="234" y="148" fontFamily="'Inter', sans-serif" fontSize="5.5" fill="#334155">
          Water for injection USP q.s.
        </text>
        <text x="234" y="154.5" fontFamily="'Inter', sans-serif" fontSize="5.5" fill="#334155">
          Sterile, Nonpyrogenic
        </text>

        {/* Strict Red warning box as printed exactly on official ampoules */}
        <rect x="233" y="160" width="84" height="8.5" fill="none" stroke="#dc2626" strokeWidth="0.65" rx="0.75" />
        <text x="275" y="166.5" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="5" fill="#dc2626" textAnchor="middle">
          "Not for use in newborns"
        </text>

        {/* Manufacturer label */}
        <text x="234" y="178" fontFamily="'Inter', sans-serif" fontSize="5" fill="#334155" fontWeight="700">
          Mfd. by: <tspan fontWeight="800" fill="#0f172a">Genetek Lifesciences Pvt.Ltd.</tspan>
        </text>
        <text x="234" y="184" fontFamily="'Inter', sans-serif" fontSize="4.5" fill="#475569">
          B-18, MIDC, Wardha.
        </text>

        {/* Right Column Content - Batch Metadata & Lot tracking */}
        <text x="338" y="134" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="5.5" fill="#334155">
          Mfg.Lic. No. <tspan fontWeight="400" fill="#0f172a">ND/56</tspan>
        </text>
        <text x="338" y="142" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="5.5" fill="#334155">
          B.No.: <tspan fontWeight="400" fill="#0f172a">GLB26002</tspan>
        </text>
        <text x="338" y="150" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="5.5" fill="#334155">
          Mfg.Dt.: <tspan fontWeight="400" fill="#0f172a">02/2026</tspan>
        </text>
        <text x="338" y="158" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="5.5" fill="#334155">
          Exp.Dt.: <tspan fontWeight="400" fill="#0f172a">01/2028</tspan>
        </text>
        <text x="338" y="166" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="5.5" fill="#334155">
          MRP.Rs.: <tspan fontWeight="400" fill="#0f172a">180.00 (PHP 180)</tspan>
        </text>
        <text x="338" y="172.5" fontFamily="'Inter', sans-serif" fontSize="4.5" fill="#475569">
          (incl. of all taxes)
        </text>

        {/* Vertical serial code barcode tag replica on vertical orientation far-right edge */}
        <g transform="translate(545, 131) rotate(90)">
          <text fontFamily="'Courier New', monospace" fontSize="5" fill="#475569" fontWeight="700" letterSpacing="0.1">
            GL30200-200
          </text>
        </g>

        {/* Final glossy reflex finish to mimic glass container volume */}
        <rect x="226" y="107" width="328" height="86" fill="url(#highlight-grad)" opacity="0.22" pointerEvents="none" />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the Retatrutide injection vial
export const RetatrutideVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toUpperCase();

  return (
    <svg 
      viewBox="0 0 320 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic shadow of the bottle */}
        <filter id="bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gray Matte Cap Gradient */}
        <linearGradient id="cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#555555" />
          <stop offset="40%" stopColor="#444444" />
          <stop offset="100%" stopColor="#2c2c2c" />
        </linearGradient>
        <linearGradient id="cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#666666" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#666666" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#333333" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#222222" stopOpacity="0.5" />
        </linearGradient>

        {/* Brushed Metal Collar Gradient */}
        <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#999999" />
          <stop offset="20%" stopColor="#e5e5e5" />
          <stop offset="42%" stopColor="#aaaaaa" />
          <stop offset="60%" stopColor="#f8f8f8" />
          <stop offset="85%" stopColor="#888888" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>

        {/* Transparent Glass shading */}
        <linearGradient id="glass-body-shading" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="12%" stopColor="#eef4f8" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="85%" stopColor="#d5e3ed" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#f0f5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dbe8f3" stopOpacity="0.95" />
        </linearGradient>

        {/* Cylindrical Label shadow simulation */}
        <linearGradient id="label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.45" />
        </linearGradient>

        {/* Metallic Blue Label Accent */}
        <linearGradient id="label-blue-accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0a3980" />
          <stop offset="100%" stopColor="#1e5bf2" />
        </linearGradient>

        {/* Clean Glass reflection glare */}
        <linearGradient id="glare-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <g filter="url(#bottle-shadow)">
        {/* VIAL GLASS BOTTOM PIECE (thick medical glass shelf) */}
        <path 
          d="M 90 350 C 90 350, 90 382, 102 382 L 218 382 C 230 382, 230 350, 230 350 Z" 
          fill="url(#glass-body-shading)" 
          stroke="#b4cfdf" 
          strokeWidth="1.25" 
        />
        {/* Deep base cavity lens reflex */}
        <path 
          d="M 102 355 C 105 372, 215 372, 218 355" 
          fill="none" 
          stroke="#90b8cf" 
          strokeWidth="1.75" 
          opacity="0.6" 
        />

        {/* LYOPHILIZED PEPTIDE POWDER CAKE (Recombinant Active Substance) */}
        <path 
          d="M 91 328 Q 110 324, 132 331 Q 160 322, 188 332 Q 210 325, 229 329 L 229 364 C 229 374, 218 376, 201 376 L 119 376 C 102 376, 91 374, 91 364 Z" 
          fill="url(#powder-grad)" 
          opacity="0.95"
        />
        {/* Detail swirls/sparkles on powder */}
        <path 
          d="M 95 338 Q 120 334, 150 342 Q 185 332, 225 339" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.75" 
        />
        <circle cx="115" cy="355" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="145" cy="348" r="1" fill="#ffffff" opacity="0.6" />
        <circle cx="180" cy="362" r="1.8" fill="#ffffff" opacity="0.7" />
        <circle cx="205" cy="350" r="1.2" fill="#ffffff" opacity="0.5" />
        
        {/* Crystals glow */}
        <path d="M 128 344 L 130 346 L 128 348 L 126 346 Z" fill="#ffffff" opacity="0.9" />
        <path d="M 165 358 L 167 360 L 165 362 L 163 360 Z" fill="#ffffff" opacity="0.95" />
        <path d="M 195 342 L 196.5 344 L 195 346 L 193.5 344 Z" fill="#ffffff" opacity="0.8" />

        {/* VIAL MAIN GLASS BARREL (Cylinder body) */}
        <path 
          d="M 90 108 L 90 350 C 90 358, 92 362, 97 362 L 223 362 C 228 362, 230 358, 230 350 L 230 108 Z" 
          fill="url(#glass-body-shading)" 
          stroke="#c3dbe9" 
          strokeWidth="1.5" 
        />

        {/* GLASS NECK & COLLAR LIP */}
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#glass-body-shading)" stroke="#9bc0d7" strokeWidth="1" />
        <path 
          d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" 
          fill="url(#glass-body-shading)" 
          stroke="#9bc0d7" 
          strokeWidth="1.25" 
        />

        {/* ALUMINUM CRIMP SLEEVE (COLLAR) */}
        <rect x="111" y="46" width="98" height="32" fill="url(#metal-grad)" stroke="#7a92a3" strokeWidth="0.75" />
        <rect x="111" y="52" width="98" height="2" fill="#555555" opacity="0.3" />
        <rect x="111" y="70" width="98" height="2.5" fill="#ffffff" opacity="0.4" />
        <ellipse cx="160" cy="62" rx="14" ry="4" fill="#555555" opacity="0.35" />
        <ellipse cx="160" cy="61" rx="14" ry="3" fill="#2c2c2c" opacity="0.6" />

        {/* FLIP-OFF PLASTIC CAP */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#cap-grad-vert)" stroke="#1a1a1a" strokeWidth="1" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#cap-surface-highlight)" />
        <rect x="104" y="24" width="112" height="4" rx="2" fill="#ffffff" opacity="0.25" />

        {/* WHITE LAB GRADE GRAPHIC LABEL */}
        <rect 
          x="92" 
          y="152" 
          width="136" 
          height="164" 
          rx="1" 
          fill="url(#label-cylinder)" 
          stroke="#b4cbdc" 
          strokeWidth="0.75" 
        />

        {/* Solid blue thin guidelines at top and bottom of label */}
        <rect x="92.5" y="156.5" width="135" height="4" fill="url(#label-blue-accent)" />
        <rect x="92.5" y="303.5" width="135" height="4" fill="url(#label-blue-accent)" />

        {/* SCIENTIFIC WEB BACKGROUND PATTERN */}
        <g opacity="0.09">
          <circle cx="115" cy="180" r="1.5" fill="#000" />
          <circle cx="150" cy="185" r="2" fill="#000" />
          <circle cx="200" cy="178" r="1.5" fill="#000" />
          <circle cx="130" cy="215" r="2.5" fill="#000" />
          <circle cx="140" cy="265" r="1.5" fill="#000" />
          <circle cx="195" cy="235" r="2.2" fill="#000" />
          <circle cx="112" cy="285" r="1.8" fill="#000" />
          <circle cx="210" cy="280" r="2.5" fill="#000" />
          
          <line x1="115" y1="180" x2="150" y2="185" stroke="#000" strokeWidth="0.5" />
          <line x1="150" y1="185" x2="200" y2="178" stroke="#000" strokeWidth="0.5" />
          <line x1="115" y1="180" x2="130" y2="215" stroke="#000" strokeWidth="0.5" />
          <line x1="150" y1="185" x2="130" y2="215" stroke="#000" strokeWidth="0.5" />
          <line x1="130" y1="215" x2="195" y2="235" stroke="#000" strokeWidth="0.5" />
          <line x1="195" y1="235" x2="200" y2="178" stroke="#000" strokeWidth="0.5" />
          <line x1="130" y1="215" x2="140" y2="265" stroke="#000" strokeWidth="0.5" />
          <line x1="140" y1="265" x2="112" y2="285" stroke="#000" strokeWidth="0.5" />
          <line x1="140" y1="265" x2="195" y2="235" stroke="#000" strokeWidth="0.5" />
          <line x1="195" y1="235" x2="210" y2="280" stroke="#000" strokeWidth="0.5" />
        </g>

        {/* BRAND TITLE LOGO: PEPTIDES POWER */}
        <text 
          x="160" 
          y="180" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="800" 
          fontSize="10" 
          fill="#1e293b" 
          textAnchor="middle" 
          letterSpacing="2.5"
        >
          PEPTIDES
        </text>
        <text 
          x="160" 
          y="192" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="11.5" 
          fill="#003cdb" 
          textAnchor="middle" 
          letterSpacing="3"
        >
          POWER
        </text>

        {/* Small DNA helix vectors flanking PEPTIDES POWER */}
        {/* Left DNA */}
        <g stroke="#1e293b" strokeWidth="0.85" opacity="0.85">
          <path d="M 103 174 Q 106 179, 103 184 Q 100 189, 103 194" fill="none" />
          <path d="M 107 174 Q 104 179, 107 184 Q 110 189, 107 194" fill="none" opacity="0.5" />
          <line x1="103" y1="179" x2="105" y2="179" />
          <line x1="105" y1="184" x2="107" y2="184" />
          <line x1="102" y1="189" x2="108" y2="189" />
        </g>
        {/* Right DNA */}
        <g stroke="#1e293b" strokeWidth="0.85" opacity="0.85">
          <path d="M 213 174 Q 216 179, 213 184 Q 210 189, 213 194" fill="none" />
          <path d="M 217 174 Q 214 179, 217 184 Q 220 189, 217 194" fill="none" opacity="0.5" />
          <line x1="213" y1="179" x2="215" y2="179" />
          <line x1="215" y1="184" x2="217" y2="184" />
          <line x1="212" y1="189" x2="218" y2="189" />
        </g>

        {/* RETATRUTIDE BOLD BLUE NAME */}
        <text 
          x="160" 
          y="226" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="14" 
          fill="#003cdb" 
          textAnchor="middle" 
          letterSpacing="0.2"
        >
          RETATRUTIDE
        </text>

        {/* Dosage Badge Pill */}
        <rect 
          x="125" 
          y="238" 
          width="70" 
          height="17" 
          rx="3.5" 
          fill="#003cdb" 
        />
        <text 
          x="160" 
          y="250.5" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="10" 
          fill="#ffffff" 
          textAnchor="middle" 
          letterSpacing="0.5"
        >
          {displayUnit}
        </text>

        {/* RESEARCH PURPOSES ONLY text */}
        <text 
          x="160" 
          y="272" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.2" 
          fill="#475569" 
          textAnchor="middle" 
          letterSpacing="0.4"
        >
          RESEARCH PURPOSES ONLY
        </text>

        {/* Manufacturer web URL */}
        <text 
          x="160" 
          y="294" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="600" 
          fontSize="5.8" 
          fill="#64748b" 
          textAnchor="middle" 
          letterSpacing="0.5"
        >
          WWW.PEPTIDESPOWER.COM
        </text>

        {/* GLUE REFLECT HIGH LIGHT OVERLAY */}
        <path 
          d="M 100 130 C 100 130, 110 100, 110 375" 
          stroke="#ffffff" 
          strokeWidth="3" 
          opacity="0.32" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 218 102 L 218 375" 
          stroke="#ffffff" 
          strokeWidth="2" 
          opacity="0.2" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the Tirzepatide injection vial
export const TirzepatideVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}/vial`;

  return (
    <svg 
      viewBox="0 0 320 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic shadow of the bottle */}
        <filter id="tirz-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Blue matte/glossy cap gradient matching the image */}
        <linearGradient id="tirz-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="40%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="tirz-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#1d4ed8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#172554" stopOpacity="0.5" />
        </linearGradient>

        {/* Aluminum / Silver metal collar gradient */}
        <linearGradient id="tirz-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        {/* Clear Glass Body Shading */}
        <linearGradient id="tirz-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f0f4f8" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e2eaf0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="tirz-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f1f5f9" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="tirz-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        {/* Reflection glare overlay */}
        <linearGradient id="tirz-glare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <g filter="url(#tirz-bottle-shadow)">
        {/* VIAL GLASS BOTTOM PIECE (thick medicinal shelf) */}
        <path 
          d="M 90 350 C 90 350, 90 382, 102 382 L 218 382 C 230 382, 230 350, 230 350 Z" 
          fill="url(#tirz-glass-body)" 
          stroke="#b2ccd8" 
          strokeWidth="1.25" 
        />
        {/* Curved bottom meniscus cavity refraction */}
        <path 
          d="M 102 355 C 105 372, 215 372, 218 355" 
          fill="none" 
          stroke="#8bb0c4" 
          strokeWidth="1.75" 
          opacity="0.55" 
        />

        {/* LYOPHILIZED HIGH-PURITY ACTIVE POWDER CAKE */}
        <path 
          d="M 91 328 Q 110 324, 132 331 Q 160 322, 188 332 Q 210 325, 229 329 L 229 364 C 229 374, 218 376, 201 376 L 119 376 C 102 376, 91 374, 91 364 Z" 
          fill="url(#tirz-powder-grad)" 
          opacity="0.95"
        />
        {/* Fine sparkles & crystalline substance details */}
        <path 
          d="M 95 338 Q 120 334, 150 342 Q 185 332, 225 339" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8" 
        />
        <circle cx="118" cy="354" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="152" cy="347" r="1.2" fill="#ffffff" opacity="0.75" />
        <circle cx="178" cy="360" r="1.7" fill="#ffffff" opacity="0.75" />
        <circle cx="202" cy="351" r="1.4" fill="#ffffff" opacity="0.6" />

        {/* VIAL GLASS BODY CYLINDER */}
        <path 
          d="M 90 108 L 90 350 C 90 358, 92 362, 97 362 L 223 362 C 228 362, 230 358, 230 350 L 230 108 Z" 
          fill="url(#tirz-glass-body)" 
          stroke="#bcd2de" 
          strokeWidth="1.5" 
        />

        {/* GLASS NECK & COLLAR LIP */}
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#tirz-glass-body)" stroke="#92b4c8" strokeWidth="1" />
        <path 
          d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" 
          fill="url(#tirz-glass-body)" 
          stroke="#92b4c8" 
          strokeWidth="1.25" 
        />

        {/* METAL CRIMP FLANGE collar */}
        <rect x="111" y="46" width="98" height="32" fill="url(#tirz-metal-grad)" stroke="#8196a4" strokeWidth="0.75" />
        <rect x="111" y="52" width="98" height="2" fill="#444444" opacity="0.25" />
        <rect x="111" y="70" width="98" height="2.5" fill="#ffffff" opacity="0.45" />

        {/* PLASTIC FLIP-OFF CAP */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#tirz-cap-grad-vert)" stroke="#0f2662" strokeWidth="1" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#tirz-cap-surface-highlight)" />
        <rect x="104" y="24" width="112" height="4" rx="2" fill="#ffffff" opacity="0.32" />

        {/* CLINICAL LABELS */}
        <rect 
          x="92" 
          y="152" 
          width="136" 
          height="164" 
          rx="1" 
          fill="url(#tirz-label-cylinder)" 
          stroke="#b8ccd8" 
          strokeWidth="0.75" 
        />

        {/* "Tirzepatide for Injection" typography */}
        <text 
          x="160" 
          y="196" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="800" 
          fontSize="14" 
          fill="#0c2363" 
          textAnchor="middle" 
          letterSpacing="-0.2"
        >
          Tirzepatide
        </text>
        <text 
          x="160" 
          y="218" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="12.5" 
          fill="#0c2363" 
          textAnchor="middle" 
          letterSpacing="-0.1"
        >
          for Injection
        </text>

        {/* Dosage dynamic subtitle */}
        <text 
          x="160" 
          y="256" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="11.5" 
          fill="#1e293b" 
          textAnchor="middle"
        >
          {displayUnit}
        </text>

        {/* "Subcutaneous" subtitle */}
        <text 
          x="160" 
          y="278" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="11" 
          fill="#1e293b" 
          textAnchor="middle"
        >
          Subcutaneous
        </text>

        {/* Reflection glare overlay */}
        <path 
          d="M 100 130 C 100 130, 110 100, 110 375" 
          stroke="#ffffff" 
          strokeWidth="3.2" 
          opacity="0.3" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 218 102 L 218 375" 
          stroke="#ffffff" 
          strokeWidth="2" 
          opacity="0.18" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the NAD+ injection vial
export const NADVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "500mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}/vial`;

  return (
    <svg 
      viewBox="0 0 320 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic shadow of the bottle */}
        <filter id="nad-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Blue matte/glossy cap gradient matching the image */}
        <linearGradient id="nad-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2b5cb3" />
          <stop offset="40%" stopColor="#1c4897" />
          <stop offset="100%" stopColor="#10316e" />
        </linearGradient>
        <linearGradient id="nad-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4176d4" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#4176d4" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#1e448c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#102550" stopOpacity="0.5" />
        </linearGradient>

        {/* Aluminum / Silver metal collar gradient */}
        <linearGradient id="nad-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        {/* Clear Glass Body Shading */}
        <linearGradient id="nad-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f0f4f8" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e2eaf0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="nad-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f1f5f9" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="nad-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        {/* Reflection glare overlay */}
        <linearGradient id="nad-glare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <g filter="url(#nad-bottle-shadow)">
        {/* VIAL GLASS BOTTOM PIECE (thick medicinal shelf) */}
        <path 
          d="M 90 350 C 90 350, 90 382, 102 382 L 218 382 C 230 382, 230 350, 230 350 Z" 
          fill="url(#nad-glass-body)" 
          stroke="#b2ccd8" 
          strokeWidth="1.25" 
        />
        {/* Curved bottom meniscus cavity refraction */}
        <path 
          d="M 102 355 C 105 372, 215 372, 218 355" 
          fill="none" 
          stroke="#8bb0c4" 
          strokeWidth="1.75" 
          opacity="0.55" 
        />

        {/* LYOPHILIZED HIGH-PURITY ACTIVE POWDER CAKE */}
        <path 
          d="M 91 328 Q 110 324, 132 331 Q 160 322, 188 332 Q 210 325, 229 329 L 229 364 C 229 374, 218 376, 201 376 L 119 376 C 102 376, 91 374, 91 364 Z" 
          fill="url(#nad-powder-grad)" 
          opacity="0.95"
        />
        {/* Fine sparkles & crystalline substance details */}
        <path 
          d="M 95 338 Q 120 334, 150 342 Q 185 332, 225 339" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8" 
        />
        <circle cx="118" cy="354" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="152" cy="347" r="1.2" fill="#ffffff" opacity="0.75" />
        <circle cx="178" cy="360" r="1.7" fill="#ffffff" opacity="0.75" />
        <circle cx="202" cy="351" r="1.4" fill="#ffffff" opacity="0.6" />

        {/* VIAL GLASS BODY CYLINDER */}
        <path 
          d="M 90 108 L 90 350 C 90 358, 92 362, 97 362 L 223 362 C 228 362, 230 358, 230 350 L 230 108 Z" 
          fill="url(#nad-glass-body)" 
          stroke="#bcd2de" 
          strokeWidth="1.5" 
        />

        {/* GLASS NECK & COLLAR LIP */}
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#nad-glass-body)" stroke="#92b4c8" strokeWidth="1" />
        <path 
          d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" 
          fill="url(#nad-glass-body)" 
          stroke="#92b4c8" 
          strokeWidth="1.25" 
        />

        {/* METAL CRIMP FLANGE collar */}
        <rect x="111" y="46" width="98" height="32" fill="url(#nad-metal-grad)" stroke="#8196a4" strokeWidth="0.75" />
        <rect x="111" y="52" width="98" height="2" fill="#444444" opacity="0.25" />
        <rect x="111" y="70" width="98" height="2.5" fill="#ffffff" opacity="0.45" />

        {/* PLASTIC FLIP-OFF CAP */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#nad-cap-grad-vert)" stroke="#0d1f4d" strokeWidth="1" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#nad-cap-surface-highlight)" />
        <rect x="104" y="24" width="112" height="4" rx="2" fill="#ffffff" opacity="0.32" />

        {/* CLINICAL LABELS */}
        <rect 
          x="92" 
          y="152" 
          width="136" 
          height="164" 
          rx="1" 
          fill="url(#nad-label-cylinder)" 
          stroke="#b8ccd8" 
          strokeWidth="0.75" 
        />

        {/* "NAD+" bold typography */}
        <text 
          x="102" 
          y="186" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="21" 
          fill="#0c2363" 
          textAnchor="start" 
          letterSpacing="-0.3"
        >
          NAD+
        </text>

        {/* "(Nicotinamide Adenine Dinucleotide)" typography */}
        <text 
          x="102" 
          y="201" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="8.2" 
          fill="#0c2363" 
          textAnchor="start"
        >
          (Nicotinamide
        </text>
        <text 
          x="102" 
          y="212" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="8.2" 
          fill="#0c2363" 
          textAnchor="start"
        >
          Adenine Dinucleotide)
        </text>

        {/* Dosage dynamic subtitle */}
        <text 
          x="102" 
          y="238" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="13.2" 
          fill="#1e293b" 
          textAnchor="start"
          letterSpacing="-0.2"
        >
          {displayUnit}
        </text>

        {/* "Lyophilized Powder" */}
        <text 
          x="102" 
          y="258" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="11.8" 
          fill="#1e293b" 
          textAnchor="start"
          letterSpacing="-0.1"
        >
          Lyophilized Powder
        </text>

        {/* "FOR INTRAMUSCULAR OR SUBCUTANEOUS USE" */}
        <text 
          x="102" 
          y="278" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="5.5" 
          fill="#1e293b" 
          textAnchor="start"
          letterSpacing="0.1"
        >
          FOR INTRAMUSCULAR
        </text>
        <text 
          x="102" 
          y="288" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="5.5" 
          fill="#1e293b" 
          textAnchor="start"
          letterSpacing="0.1"
        >
          OR SUBCUTANEOUS USE
        </text>

        {/* "sterile" aligned right */}
        <text 
          x="215" 
          y="288" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="6" 
          fill="#475569" 
          textAnchor="end"
        >
          sterile
        </text>

        {/* Reflection glare overlay */}
        <path 
          d="M 100 130 C 100 130, 110 100, 110 375" 
          stroke="#ffffff" 
          strokeWidth="3.2" 
          opacity="0.3" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 218 102 L 218 375" 
          stroke="#ffffff" 
          strokeWidth="2" 
          opacity="0.18" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the BPC-157 injection vial
export const BPCVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "5mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg 
      viewBox="0 0 320 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic shadow of the bottle */}
        <filter id="bpc-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dynamic bright blue cap gradient matching the image */}
        <linearGradient id="bpc-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="40%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="bpc-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#1d4ed8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
        </linearGradient>

        {/* Aluminum / Silver metal collar gradient */}
        <linearGradient id="bpc-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        {/* Clear Glass Shading */}
        <linearGradient id="bpc-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f0f4f8" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e2eaf0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="bpc-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f1f5f9" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="bpc-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        {/* Reflection glare overlay */}
        <linearGradient id="bpc-glare-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="30%" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      <g filter="url(#bpc-bottle-shadow)">
        {/* VIAL GLASS BOTTOM PIECE (thick medicinal shelf) */}
        <path 
          d="M 90 350 C 90 350, 90 382, 102 382 L 218 382 C 230 382, 230 350, 230 350 Z" 
          fill="url(#bpc-glass-body)" 
          stroke="#b2ccd8" 
          strokeWidth="1.25" 
        />
        {/* Curved bottom meniscus cavity refraction */}
        <path 
          d="M 102 355 C 105 372, 215 372, 218 355" 
          fill="none" 
          stroke="#8bb0c4" 
          strokeWidth="1.75" 
          opacity="0.55" 
        />

        {/* LYOPHILIZED HIGH-PURITY ACTIVE POWDER CAKE */}
        <path 
          d="M 91 328 Q 110 324, 132 331 Q 160 322, 188 332 Q 210 325, 229 329 L 229 364 C 229 374, 218 376, 201 376 L 119 376 C 102 376, 91 374, 91 364 Z" 
          fill="url(#bpc-powder-grad)" 
          opacity="0.95"
        />
        {/* Fine sparkles & crystalline substance details */}
        <path 
          d="M 95 338 Q 120 334, 150 342 Q 185 332, 225 339" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8" 
        />
        <circle cx="118" cy="354" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="152" cy="347" r="1.2" fill="#ffffff" opacity="0.75" />
        <circle cx="178" cy="360" r="1.7" fill="#ffffff" opacity="0.75" />
        <circle cx="202" cy="351" r="1.4" fill="#ffffff" opacity="0.6" />

        {/* VIAL GLASS BODY CYLINDER */}
        <path 
          d="M 90 108 L 90 350 C 90 358, 92 362, 97 362 L 223 362 C 228 362, 230 358, 230 350 L 230 108 Z" 
          fill="url(#bpc-glass-body)" 
          stroke="#bcd2de" 
          strokeWidth="1.5" 
        />

        {/* GLASS NECK & COLLAR LIP */}
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#bpc-glass-body)" stroke="#92b4c8" strokeWidth="1" />
        <path 
          d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" 
          fill="url(#bpc-glass-body)" 
          stroke="#92b4c8" 
          strokeWidth="1.25" 
        />

        {/* METAL CRIMP FLANGE collar */}
        <rect x="111" y="46" width="98" height="32" fill="url(#bpc-metal-grad)" stroke="#8196a4" strokeWidth="0.75" />
        <rect x="111" y="52" width="98" height="2" fill="#444444" opacity="0.25" />
        <rect x="111" y="70" width="98" height="2.5" fill="#ffffff" opacity="0.45" />

        {/* PLASTIC FLIP-OFF CAP */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#bpc-cap-grad-vert)" stroke="#112d7c" strokeWidth="1" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#bpc-cap-surface-highlight)" />
        <rect x="104" y="24" width="112" height="4" rx="2" fill="#ffffff" opacity="0.32" />

        {/* CLINICAL LABELS */}
        <rect 
          x="92" 
          y="152" 
          width="136" 
          height="164" 
          rx="1" 
          fill="url(#bpc-label-cylinder)" 
          stroke="#b8ccd8" 
          strokeWidth="0.75" 
        />

        {/* "BPC 157 Peptide" typography */}
        <text 
          x="100" 
          y="186" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="14" 
          fill="#0c2363" 
          textAnchor="start" 
          letterSpacing="-0.3"
        >
          BPC 157 Peptide
        </text>

        {/* "Body Protection Compound-157" typography */}
        <text 
          x="100" 
          y="202" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.4" 
          fill="#0c2363" 
          textAnchor="start"
        >
          Body Protection Compound-157
        </text>

        {/* Dosage dynamic subtitle "5mg" (large blue font) */}
        <text 
          x="160" 
          y="238" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="24" 
          fill="#0c2363" 
          textAnchor="middle"
          letterSpacing="-0.4"
        >
          {displayUnit}
        </text>

        {/* "STERILE INJECTION" */}
        <text 
          x="160" 
          y="258" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="800" 
          fontSize="8.5" 
          fill="#1e293b" 
          textAnchor="middle"
          letterSpacing="0.2"
        >
          STERILE INJECTION
        </text>

        {/* "For Subcutaneous Injection Only" */}
        <text 
          x="160" 
          y="273" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.2" 
          fill="#475569" 
          textAnchor="middle"
        >
          For Subcutaneous Injection Only
        </text>

        {/* Batch Info "Lot: BP157001 | Exp: 12/2026" */}
        <text 
          x="160" 
          y="292" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="6.8" 
          fill="#64748b" 
          textAnchor="middle"
        >
          Lot: BP157001 | Exp: 12/2026
        </text>

        {/* Reflection glare overlay */}
        <path 
          d="M 100 130 C 100 130, 110 100, 110 375" 
          stroke="#ffffff" 
          strokeWidth="3.2" 
          opacity="0.3" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 218 102 L 218 375" 
          stroke="#ffffff" 
          strokeWidth="2" 
          opacity="0.18" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the GHK-CU peptide injection vial with callout annotations matching the uploaded image
export const GHKCuVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "50mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg 
      viewBox="0 0 540 420" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic shadow of the bottle */}
        <filter id="ghk-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="3" dy="10" />
          <feComponentTransfer><feFuncA type="linear" slope="0.14"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Sapphire blue cap gradient representing Copper GHK-Cu */}
        <linearGradient id="ghk-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="40%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <linearGradient id="ghk-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#1d4ed8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
        </linearGradient>

        {/* Aluminum / Silver metal collar gradient */}
        <linearGradient id="ghk-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        {/* Clear Glass Shading with GHK-Cu subtle copper-blue reflections */}
        <linearGradient id="ghk-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#eff6ff" stopOpacity="0.4" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#dbeafe" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        {/* Copper Peptide Intense Blue Active Powder Cake (Liquid/Crystalline) */}
        <linearGradient id="ghk-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#1d4ed8" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="ghk-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Decorative Warm Soft Background Radiance inside SVG */}
      <circle cx="270" cy="220" r="160" fill="url(#ghk-bg-glow)" opacity="0.15" pointerEvents="none" />
      <radialGradient id="ghk-bg-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#60a5fa" />
        <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
      </radialGradient>

      {/* CALLOUT ANNOTATION SYSTEM */}
      {/* 1. Left Top: COLLAGEN SYNTHESIS SUPPORT */}
      <g className="transition-opacity duration-300">
        <g transform="translate(68, 25)">
          {/* Chemical Chain Link Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <circle cx="22" cy="18" r="3" fill="#94a3b8" />
            <line x1="22" y1="18" x2="37" y2="10" />
            <circle cx="37" cy="10" r="3" fill="#94a3b8" />
            <line x1="37" y1="10" x2="52" y2="20" />
            <circle cx="52" cy="20" r="3" fill="#94a3b8" />
            <line x1="52" y1="20" x2="67" y2="12" />
            <circle cx="67" cy="12" r="3" fill="#94a3b8" />
            <line x1="37" y1="10" x2="32" y2="27" />
            <circle cx="32" cy="27" r="1.5" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="95" y="65" textAnchor="middle">COLLAGEN</tspan>
          <tspan x="95" y="78" textAnchor="middle">SYNTHESIS</tspan>
          <tspan x="95" y="91" textAnchor="middle">SUPPORT</tspan>
        </text>
        {/* Callout Line to bottle */}
        <polyline 
          points="145, 78 185, 78 226, 122" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="226" cy="122" r="2" fill="#3b82f6" />
      </g>

      {/* 2. Left Bottom: COLLAGEN SYNTHESIS SUPPORT */}
      <g className="transition-opacity duration-300">
        <g transform="translate(68, 240)">
          {/* DNA Double Helix Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <path d="M12 10 C18 4, 24 22, 30 16 C36 10, 42 28, 48 22" />
            <path d="M12 22 C18 28, 24 10, 30 16 C36 22, 42 4, 48 10" />
            <line x1="16" y1="13" x2="16" y2="19" />
            <line x1="23" y1="14" x2="23" y2="18" />
            <line x1="30" y1="16" x2="30" y2="16" />
            <line x1="37" y1="18" x2="37" y2="14" />
            <line x1="44" y1="20" x2="44" y2="12" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="95" y="305" textAnchor="middle">COLLAGEN</tspan>
          <tspan x="95" y="318" textAnchor="middle">SYNTHESIS</tspan>
          <tspan x="95" y="331" textAnchor="middle">SUPPORT</tspan>
        </text>
        {/* Callout Line to bottle body */}
        <polyline 
          points="145, 318 190, 318 220, 280" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="220" cy="280" r="2" fill="#3b82f6" />
      </g>

      {/* 3. Right Top: ELASTIN BOOSTING SIGNALS */}
      <g className="transition-opacity duration-300">
        <g transform="translate(418, 55)">
          {/* Chemical Chain/Receptor Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <circle cx="20" cy="15" r="2.5" fill="#94a3b8" />
            <line x1="20" y1="15" x2="32" y2="25" />
            <circle cx="32" cy="25" r="2.5" />
            <line x1="32" y1="25" x2="44" y2="15" />
            <circle cx="44" cy="15" r="2.5" fill="#94a3b8" />
            {/* side paths */}
            <line x1="32" y1="25" x2="32" y2="38" />
            <circle cx="32" cy="38" r="1.5" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="445" y="115" textAnchor="middle">ELASTIN</tspan>
          <tspan x="445" y="128" textAnchor="middle">BOOSTING</tspan>
          <tspan x="445" y="141" textAnchor="middle">SIGNALS</tspan>
        </text>
        {/* Callout Line to bottle cap/neck */}
        <polyline 
          points="395, 128 355, 128 300, 155" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="300" cy="155" r="2" fill="#3b82f6" />
      </g>

      {/* 4. Right Bottom: CELLULAR REGENERATION PROMOTER */}
      <g className="transition-opacity duration-300">
        <g transform="translate(418, 240)">
          {/* Cellular Circles Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <circle cx="32" cy="22" r="11" strokeDasharray="2.5 2.5" />
            <circle cx="32" cy="22" r="5" />
            <circle cx="28" cy="20" r="1.5" fill="#94a3b8" />
            <circle cx="35" cy="25" r="1" fill="#94a3b8" />
            <circle cx="22" cy="16" r="1.2" fill="#94a3b8" />
            <circle cx="41" cy="28" r="0.8" fill="#94a3b8" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="445" y="300" textAnchor="middle">CELLULAR</tspan>
          <tspan x="445" y="313" textAnchor="middle">REGENERATION</tspan>
          <tspan x="445" y="326" textAnchor="middle">PROMOTER</tspan>
        </text>
        {/* Callout Line to bottom of bottle */}
        <polyline 
          points="395, 313 345, 313 325, 290" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="325" cy="290" r="2" fill="#3b82f6" />
      </g>

      {/* CENTRAL TILTED BOTTLE CONTAINER GROUP */}
      <g transform="translate(270, 215) rotate(-14) translate(-160, -200)" filter="url(#ghk-bottle-shadow)">
        {/* VIAL GLASS BOTTOM PIECE (thick medicinal shelf) */}
        <path 
          d="M 90 350 C 90 350, 90 382, 102 382 L 218 382 C 230 382, 230 350, 230 350 Z" 
          fill="url(#ghk-glass-body)" 
          stroke="#acd0e3" 
          strokeWidth="1.25" 
        />
        {/* Curved bottom meniscus cavity refraction */}
        <path 
          d="M 102 355 C 105 372, 215 372, 218 355" 
          fill="none" 
          stroke="#7ca5be" 
          strokeWidth="1.75" 
          opacity="0.55" 
        />

        {/* LYOPHILIZED HIGH-PURITY ACTIVE SAPPHIRE powder CAKE */}
        <path 
          d="M 91 328 Q 110 324, 132 331 Q 160 322, 188 332 Q 210 325, 229 329 L 229 364 C 229 374, 218 376, 201 376 L 119 376 C 102 376, 91 374, 91 364 Z" 
          fill="url(#ghk-powder-grad)" 
          opacity="0.95"
        />
        {/* Fine sparkles & crystalline substance details */}
        <path 
          d="M 95 338 Q 120 334, 150 342 Q 185 332, 225 339" 
          stroke="#93c5fd" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8" 
        />
        <circle cx="118" cy="354" r="1.5" fill="#ffffff" opacity="0.85" />
        <circle cx="152" cy="347" r="1.2" fill="#ffffff" opacity="0.8" />
        <circle cx="178" cy="360" r="1.7" fill="#ffffff" opacity="0.8" />
        <circle cx="202" cy="351" r="1.4" fill="#ffffff" opacity="0.7" />

        {/* VIAL GLASS BODY CYLINDER */}
        <path 
          d="M 90 108 L 90 350 C 90 358, 92 362, 97 362 L 223 362 C 228 362, 230 358, 230 350 L 230 108 Z" 
          fill="url(#ghk-glass-body)" 
          stroke="#bcd2de" 
          strokeWidth="1.5" 
        />

        {/* GLASS NECK & COLLAR LIP */}
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#ghk-glass-body)" stroke="#92b4c8" strokeWidth="1" />
        <path 
          d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" 
          fill="url(#ghk-glass-body)" 
          stroke="#92b4c8" 
          strokeWidth="1.25" 
        />

        {/* METAL CRIMP FLANGE collar */}
        <rect x="111" y="46" width="98" height="32" fill="url(#ghk-metal-grad)" stroke="#8196a4" strokeWidth="0.75" />
        <rect x="111" y="52" width="98" height="2" fill="#444444" opacity="0.25" />
        <rect x="111" y="70" width="98" height="2.5" fill="#ffffff" opacity="0.45" />

        {/* PLASTIC FLIP-OFF CAP */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ghk-cap-grad-vert)" stroke="#112d7c" strokeWidth="1" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ghk-cap-surface-highlight)" />
        <rect x="104" y="24" width="112" height="4" rx="2" fill="#ffffff" opacity="0.32" />

        {/* CLINICAL LABELS */}
        <rect 
          x="92" 
          y="152" 
          width="136" 
          height="164" 
          rx="1" 
          fill="url(#ghk-label-cylinder)" 
          stroke="#b8ccd8" 
          strokeWidth="0.75" 
        />

        {/* "GHK-Cu Peptide" typography */}
        <text 
          x="160" 
          y="186" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="13.5" 
          fill="#0c2363" 
          textAnchor="middle" 
          letterSpacing="-0.3"
        >
          GHK-Cu Peptide
        </text>

        {/* "Copper Tripeptide-1" sub-label */}
        <text 
          x="160" 
          y="202" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.4" 
          fill="#0c2363" 
          textAnchor="middle"
        >
          Copper Tripeptide-1
        </text>

        {/* Dosage dynamic subtitle */}
        <text 
          x="160" 
          y="238" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="24" 
          fill="#0c2363" 
          textAnchor="middle"
          letterSpacing="-0.4"
        >
          {displayUnit}
        </text>

        {/* "STERILE INJECTION" */}
        <text 
          x="160" 
          y="258" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="800" 
          fontSize="8.5" 
          fill="#1e293b" 
          textAnchor="middle"
          letterSpacing="0.2"
        >
          STERILE INJECTION
        </text>

        {/* "For Subcutaneous Injection Only" */}
        <text 
          x="160" 
          y="273" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.2" 
          fill="#475569" 
          textAnchor="middle"
        >
          For Subcutaneous Injection Only
        </text>

        {/* Batch Info "Lot: GHK812001 | Exp: 12/2026" */}
        <text 
          x="160" 
          y="292" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="6.8" 
          fill="#64748b" 
          textAnchor="middle"
        >
          Lot: GHK812001 | Exp: 12/2026
        </text>

        {/* Reflection glare overlay */}
        <path 
          d="M 100 130 C 100 130, 110 100, 110 375" 
          stroke="#ffffff" 
          strokeWidth="3.2" 
          opacity="0.3" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 218 102 L 218 375" 
          stroke="#ffffff" 
          strokeWidth="2" 
          opacity="0.18" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the MOTs-C mitochondrial peptide injection vial with callout annotations matching the uploaded image
export const MOTsCVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg 
      viewBox="0 0 540 420" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic shadow of the bottle */}
        <filter id="mots-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="3" dy="10" />
          <feComponentTransfer><feFuncA type="linear" slope="0.14"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Slate/steel blue medical cap gradient matching the MOTs-C image */}
        <linearGradient id="mots-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="40%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="mots-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#475569" stopOpacity="0.15" />
          <stop offset="85%" stopColor="#334155" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0.5" />
        </linearGradient>

        {/* Aluminum / Silver metal collar gradient */}
        <linearGradient id="mots-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        {/* Clear Glass Shading with subtle metallic reflection */}
        <linearGradient id="mots-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f1f5f9" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#e2e8f0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="mots-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f8fafc" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="mots-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Decorative Warm Soft Background Radiance inside SVG */}
      <circle cx="270" cy="220" r="160" fill="url(#mots-bg-glow)" opacity="0.12" pointerEvents="none" />
      <radialGradient id="mots-bg-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
      </radialGradient>

      {/* CALLOUT ANNOTATION SYSTEM */}
      {/* 1. Left Top: COLLAGEN SYNTHESIS SUPPORT */}
      <g className="transition-opacity duration-300">
        <g transform="translate(68, 25)">
          {/* Chemical Chain Link Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <circle cx="22" cy="18" r="3" fill="#94a3b8" />
            <line x1="22" y1="18" x2="37" y2="10" />
            <circle cx="37" cy="10" r="3" fill="#94a3b8" />
            <line x1="37" y1="10" x2="52" y2="20" />
            <circle cx="52" cy="20" r="3" fill="#94a3b8" />
            <line x1="52" y1="20" x2="67" y2="12" />
            <circle cx="67" cy="12" r="3" fill="#94a3b8" />
            <line x1="37" y1="10" x2="32" y2="27" />
            <circle cx="32" cy="27" r="1.5" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="95" y="65" textAnchor="middle">COLLAGEN</tspan>
          <tspan x="95" y="78" textAnchor="middle">SYNTHESIS</tspan>
          <tspan x="95" y="91" textAnchor="middle">SUPPORT</tspan>
        </text>
        {/* Callout Line to bottle */}
        <polyline 
          points="145, 78 185, 78 226, 122" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="226" cy="122" r="2" fill="#475569" />
      </g>

      {/* 2. Left Bottom: COLLAGEN SYNTHESIS SUPPORT */}
      <g className="transition-opacity duration-300">
        <g transform="translate(68, 240)">
          {/* DNA Double Helix Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <path d="M12 10 C18 4, 24 22, 30 16 C36 10, 42 28, 48 22" />
            <path d="M12 22 C18 28, 24 10, 30 16 C36 22, 42 4, 48 10" />
            <line x1="16" y1="13" x2="16" y2="19" />
            <line x1="23" y1="14" x2="23" y2="18" />
            <line x1="30" y1="16" x2="30" y2="16" />
            <line x1="37" y1="18" x2="37" y2="14" />
            <line x1="44" y1="20" x2="44" y2="12" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="95" y="305" textAnchor="middle">COLLAGEN</tspan>
          <tspan x="95" y="318" textAnchor="middle">SYNTHESIS</tspan>
          <tspan x="95" y="331" textAnchor="middle">SUPPORT</tspan>
        </text>
        {/* Callout Line to bottle body */}
        <polyline 
          points="145, 318 190, 318 220, 280" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="220" cy="280" r="2" fill="#475569" />
      </g>

      {/* 3. Right Top: ELASTIN BOOSTING SIGNALS */}
      <g className="transition-opacity duration-300">
        <g transform="translate(418, 55)">
          {/* Chemical Chain/Receptor Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <circle cx="20" cy="15" r="2.5" fill="#94a3b8" />
            <line x1="20" y1="15" x2="32" y2="25" />
            <circle cx="32" cy="25" r="2.5" />
            <line x1="32" y1="25" x2="44" y2="15" />
            <circle cx="44" cy="15" r="2.5" fill="#94a3b8" />
            {/* side paths */}
            <line x1="32" y1="25" x2="32" y2="38" />
            <circle cx="32" cy="38" r="1.5" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="445" y="115" textAnchor="middle">ELASTIN</tspan>
          <tspan x="445" y="128" textAnchor="middle">BOOSTING</tspan>
          <tspan x="445" y="141" textAnchor="middle">SIGNALS</tspan>
        </text>
        {/* Callout Line to bottle cap/neck */}
        <polyline 
          points="395, 128 355, 128 300, 155" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="300" cy="155" r="2" fill="#475569" />
      </g>

      {/* 4. Right Bottom: CELLULAR REGENERATION PROMOTER */}
      <g className="transition-opacity duration-300">
        <g transform="translate(418, 240)">
          {/* Cellular Circles Icon */}
          <g stroke="#94a3b8" strokeWidth="1.25" fill="none" strokeLinecap="round">
            <circle cx="32" cy="22" r="11" strokeDasharray="2.5 2.5" />
            <circle cx="32" cy="22" r="5" />
            <circle cx="28" cy="20" r="1.5" fill="#94a3b8" />
            <circle cx="35" cy="25" r="1" fill="#94a3b8" />
            <circle cx="22" cy="16" r="1.2" fill="#94a3b8" />
            <circle cx="41" cy="28" r="0.8" fill="#94a3b8" />
          </g>
        </g>
        <text className="fill-slate-700 dark:fill-slate-300 font-sans font-bold text-[9.5px]" letterSpacing="0.6">
          <tspan x="445" y="300" textAnchor="middle">CELLULAR</tspan>
          <tspan x="445" y="313" textAnchor="middle">REGENERATION</tspan>
          <tspan x="445" y="326" textAnchor="middle">PROMOTER</tspan>
        </text>
        {/* Callout Line to bottom of bottle */}
        <polyline 
          points="395, 313 345, 313 325, 290" 
          stroke="#94a3b8" 
          strokeWidth="0.75" 
          fill="none" 
          strokeDasharray="2 2"
          opacity="0.85"
        />
        <circle cx="325" cy="290" r="2" fill="#475569" />
      </g>

      {/* CENTRAL TILTED BOTTLE CONTAINER GROUP */}
      <g transform="translate(270, 215) rotate(-14) translate(-160, -200)" filter="url(#mots-bottle-shadow)">
        {/* VIAL GLASS BOTTOM PIECE (thick medicinal shelf) */}
        <path 
          d="M 90 350 C 90 350, 90 382, 102 382 L 218 382 C 230 382, 230 350, 230 350 Z" 
          fill="url(#mots-glass-body)" 
          stroke="#acd0e3" 
          strokeWidth="1.25" 
        />
        {/* Curved bottom meniscus cavity refraction */}
        <path 
          d="M 102 355 C 105 372, 215 372, 218 355" 
          fill="none" 
          stroke="#7ca5be" 
          strokeWidth="1.75" 
          opacity="0.55" 
        />

        {/* LYOPHILIZED HIGH-PURITY ACTIVE POWDER CAKE */}
        <path 
          d="M 91 328 Q 110 324, 132 331 Q 160 322, 188 332 Q 210 325, 229 329 L 229 364 C 229 374, 218 376, 201 376 L 119 376 C 102 376, 91 374, 91 364 Z" 
          fill="url(#mots-powder-grad)" 
          opacity="0.95"
        />
        {/* Fine sparkles & crystalline substance details */}
        <path 
          d="M 95 338 Q 120 334, 150 342 Q 185 332, 225 339" 
          stroke="#cbd5e1" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.8" 
        />
        <circle cx="118" cy="354" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="152" cy="347" r="1.2" fill="#ffffff" opacity="0.75" />
        <circle cx="178" cy="360" r="1.7" fill="#ffffff" opacity="0.75" />
        <circle cx="202" cy="351" r="1.4" fill="#ffffff" opacity="0.6" />

        {/* VIAL GLASS BODY CYLINDER */}
        <path 
          d="M 90 108 L 90 350 C 90 358, 92 362, 97 362 L 223 362 C 228 362, 230 358, 230 350 L 230 108 Z" 
          fill="url(#mots-glass-body)" 
          stroke="#bcd2de" 
          strokeWidth="1.5" 
        />

        {/* GLASS NECK & COLLAR LIP */}
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#mots-glass-body)" stroke="#92b4c8" strokeWidth="1" />
        <path 
          d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" 
          fill="url(#mots-glass-body)" 
          stroke="#92b4c8" 
          strokeWidth="1.25" 
        />

        {/* METAL CRIMP FLANGE collar */}
        <rect x="111" y="46" width="98" height="32" fill="url(#mots-metal-grad)" stroke="#8196a4" strokeWidth="0.75" />
        <rect x="111" y="52" width="98" height="2" fill="#444444" opacity="0.25" />
        <rect x="111" y="70" width="98" height="2.5" fill="#ffffff" opacity="0.45" />

        {/* PLASTIC FLIP-OFF CAP */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#mots-cap-grad-vert)" stroke="#1e293b" strokeWidth="1" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#mots-cap-surface-highlight)" />
        <rect x="104" y="24" width="112" height="4" rx="2" fill="#ffffff" opacity="0.32" />

        {/* CLINICAL LABELS */}
        <rect 
          x="92" 
          y="152" 
          width="136" 
          height="164" 
          rx="1" 
          fill="url(#mots-label-cylinder)" 
          stroke="#b8ccd8" 
          strokeWidth="0.75" 
        />

        {/* "MOTs-C" bold title typography */}
        <text 
          x="160" 
          y="186" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="17" 
          fill="#3b4d75" 
          textAnchor="middle" 
          letterSpacing="-0.4"
        >
          MOTs-C
        </text>

        {/* "Mitochondrial Peptide" sub-label */}
        <text 
          x="160" 
          y="201" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.8" 
          fill="#3b4d75" 
          textAnchor="middle"
        >
          Mitochondrial Peptide
        </text>

        {/* Mitochondrion vector diagram matching the reference image label */}
        <g transform="translate(178, 206) scale(0.85)" stroke="#5c6e91" strokeWidth="1.2" fill="none" opacity="0.85">
          {/* Wavy mitochondrion cell shape outline */}
          <path d="M 5 2 C 5 -12, 35 -12, 35 2 C 35 16, 5 16, 5 2 Z" />
          {/* Cristae folded membrane inside */}
          <path d="M 8 2 Q 11 10, 15 -1 Q 19 10, 23 -1 Q 27 10, 31 -1 Q 33 6, 34 2" strokeWidth="0.9" />
        </g>

        {/* Dosage dynamic subtitle */}
        <text 
          x="160" 
          y="238" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="900" 
          fontSize="24" 
          fill="#1e293b" 
          textAnchor="middle"
          letterSpacing="-0.4"
        >
          {displayUnit}
        </text>

        {/* "STERILE INJECTION" */}
        <text 
          x="160" 
          y="258" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="800" 
          fontSize="8.5" 
          fill="#1e293b" 
          textAnchor="middle"
          letterSpacing="0.2"
        >
          STERILE INJECTION
        </text>

        {/* "For Subcutaneous Injection Only" */}
        <text 
          x="160" 
          y="273" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="7.2" 
          fill="#475569" 
          textAnchor="middle"
        >
          For Subcutaneous Injection Only
        </text>

        {/* Batch Info "Lot: MOT-001 | Exp: 06/2027" */}
        <text 
          x="160" 
          y="292" 
          fontFamily="'Inter', sans-serif" 
          fontWeight="700" 
          fontSize="6.8" 
          fill="#64748b" 
          textAnchor="middle"
        >
          Lot: MOT-001 | Exp: 06/2027
        </text>

        {/* Reflection glare overlay */}
        <path 
          d="M 100 130 C 100 130, 110 100, 110 375" 
          stroke="#ffffff" 
          strokeWidth="3.2" 
          opacity="0.3" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 218 102 L 218 375" 
          stroke="#ffffff" 
          strokeWidth="2" 
          opacity="0.18" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the luxury injection auto-pen matching the uploaded image for Glutathione Subq
export const GlutathionePen: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "1500mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg 
      viewBox="0 0 420 420" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="100%"
      height="100%"
    >
      <defs>
        {/* Soft realistic drop shadow for the pen */}
        <filter id="pen-shadow" x="-30%" y="-30%" width="160%" height="160%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12" />
          <feOffset dx="6" dy="14" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Deep blue glossy plastics */}
        <linearGradient id="pen-blue-glossy" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="35%" stopColor="#3b82f6" />
          <stop offset="70%" stopColor="#1d4ed8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>

        <linearGradient id="pen-blue-cap" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>

        {/* Polished brush aluminum metal textures */}
        <linearGradient id="pen-metal-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="20%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="65%" stopColor="#cbd5e1" />
          <stop offset="85%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        
        {/* Chrome / Metal specular reflection */}
        <linearGradient id="pen-chrome" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="15%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="80%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Translucent glass ampoule cylinder window */}
        <linearGradient id="pen-glass-window" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="25%" stopColor="#f1f5f9" stopOpacity="0.25" />
          <stop offset="75%" stopColor="#e2e8f0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.75" />
        </linearGradient>

        {/* Soft background luxury radial gold/blue glow */}
        <radialGradient id="glut-aurora" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.12" />
          <stop offset="55%" stopColor="#93c5fd" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Luxury Background Aura Glow */}
      <circle cx="210" cy="210" r="180" fill="url(#glut-aurora)" pointerEvents="none" />

      {/* Group holding the beautiful auto-pen rotated exactly at a neat slanted diagonal angle matching the reference image */}
      <g transform="translate(210, 210) rotate(-42) translate(-210, -210)" filter="url(#pen-shadow)">
        
        {/* ===================== AUTO-PEN STRUCTURE (Drawn Vertically) ===================== */}

        {/* 1. PLUNGER BUTTON (At the absolute top - Y: 30 to 45) */}
        {/* Plunger stem */}
        <rect x="195" y="30" width="30" height="15" fill="url(#pen-chrome)" stroke="#64748b" strokeWidth="0.5" />
        {/* Royal Blue plunger crown top */}
        <path d="M 190 30 C 190 24, 230 24, 230 30 Z" fill="url(#pen-blue-cap)" stroke="#1e3a8a" strokeWidth="0.5" />
        {/* Small horizontal details on the stem */}
        <line x1="195" y1="36" x2="225" y2="36" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
        <line x1="195" y1="40" x2="225" y2="40" stroke="#475569" strokeWidth="1" opacity="0.4" />

        {/* 2. CHROME TOP TRIM ring (Y: 45 to 52) */}
        <rect x="186" y="45" width="48" height="7" rx="1" fill="url(#pen-chrome)" stroke="#475569" strokeWidth="0.5" />

        {/* 3. UPPER GRIP / CONTROL SHEATH (Y: 52 to 140) */}
        {/* Rich silver polished aluminum sleeve */}
        <rect x="184" y="52" width="52" height="88" rx="2" fill="url(#pen-metal-body)" stroke="#475569" strokeWidth="0.5" />
        
        {/* Fine ribbed groove lines (top grip accent rings) */}
        {Array.from({ length: 6 }).map((_, idx) => (
          <line 
            key={idx}
            x1="184.25" 
            y1={60 + idx * 8} 
            x2="235.75" 
            y2={60 + idx * 8} 
            stroke="#1e293b" 
            strokeWidth="0.75" 
            opacity="0.25" 
          />
        ))}

        {/* High-tech hexagon network icon printed in white/silver on upper sleeve */}
        <g stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.45" transform="translate(200, 110)">
          <path d="M10 0 L18 5 L18 15 L10 20 L2 15 L2 5 Z" />
          <path d="M10 5 L14 8 L14 12 L10 15 L6 12 L6 8 Z" />
          <line x1="10" y1="0" x2="10" y2="5" />
          <line x1="18" y1="5" x2="14" y2="8" />
          <line x1="18" y1="15" x2="14" y2="12" />
          <line x1="10" y1="20" x2="10" y2="15" />
          <line x1="2" y1="15" x2="6" y2="12" />
          <line x1="2" y1="5" x2="6" y2="8" />
        </g>

        {/* 4. CHROME COLLAR / CAP BAND (Y: 140 to 148) */}
        <rect x="182" y="140" width="56" height="8" fill="url(#pen-chrome)" stroke="#334155" strokeWidth="0.5" />

        {/* 5. BLUE RECTANGULAR WINDOW / ACCENT CAP JOINT (Y: 148 to 166) */}
        <rect x="184" y="148" width="52" height="18" fill="url(#pen-blue-glossy)" stroke="#1e3a8a" strokeWidth="0.5" />
        {/* Sleek internal glowing cartridge alignment dot */}
        <circle cx="210" cy="157" r="3.5" fill="#f8fafc" opacity="0.9" />

        {/* 6. MAIN CARTRIDGE SLEEVE (Y: 166 to 346) - Houses the Label and the Glass viewing window */}
        {/* Silver-white composite medical grade sleeve */}
        <rect x="184" y="166" width="52" height="180" rx="3" fill="url(#pen-metal-body)" stroke="#475569" strokeWidth="0.5" />

        {/* Label area (White high-contrast clinical wrap) */}
        <rect x="185" y="172" width="50" height="116" rx="1.5" fill="#ffffff" />
        {/* Cylinder highlight shadow on label edges */}
        <rect x="185" y="172" width="5" height="116" fill="#cbd5e1" opacity="0.3" stroke="none" />
        <rect x="230" y="172" width="5" height="116" fill="#475569" opacity="0.25" stroke="none" />

        {/* Glutathione Printed Typography on Cylinder (rotated vertically for reading along the pen) */}
        <g transform="translate(211, 230) rotate(90)">
          {/* Main title "Glutathione Subq" */}
          <text 
            x="0" 
            y="-4" 
            fontFamily="'Inter', sans-serif" 
            fontWeight="900" 
            fontSize="10" 
            fill="#0c2363" 
            textAnchor="middle" 
            letterSpacing="-0.1"
          >
            Glutathione Subq
          </text>
          
          {/* Subtitle description */}
          <text 
            x="0" 
            y="4.5" 
            fontFamily="'Inter', sans-serif" 
            fontWeight="700" 
            fontSize="4.8" 
            fill="#1e293b" 
            textAnchor="middle" 
            letterSpacing="0.05"
          >
            Active Cellular Antioxidant
          </text>

          {/* Dosing Unit */}
          <text 
            x="0" 
            y="12" 
            fontFamily="'Inter', sans-serif" 
            fontWeight="800" 
            fontSize="6.2" 
            fill="#2563eb" 
            textAnchor="middle"
          >
            {displayUnit}
          </text>
          
          {/* Administration instruction */}
          <text 
            x="0" 
            y="17" 
            fontFamily="'Inter', sans-serif" 
            fontWeight="700" 
            fontSize="3.1" 
            fill="#475569" 
            textAnchor="middle"
            letterSpacing="0.2"
          >
            SUBCUTANEOUS INJECTION ONLY
          </text>
        </g>

        {/* Double-hexagon safety seal logo on label bottom */}
        <g stroke="#1d4ed8" strokeWidth="0.5" fill="none" transform="translate(205, 268) scale(0.6)">
          <path d="M10 0 L18 5 L18 15 L10 20 L2 15 L2 5 Z" />
          <path d="M14 2 L22 7 L22 17 L14 22 L6 17 L6 7 Z" opacity="0.5" />
        </g>

        {/* 7. GLASS VIEWING WINDOW (Y: 288 to 336) - Displays high-purity clear/silver master-antioxidant liquid */}
        <rect x="194" y="291" width="32" height="42" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="0.5" />
        {/* Glass liquid fill shading */}
        <rect x="195" y="292" width="30" height="40" rx="2" fill="url(#pen-glass-window)" />
        {/* Liquid level line */}
        <line x1="195" y1="316" x2="225" y2="316" stroke="#2563eb" strokeWidth="1" opacity="0.3" />
        {/* Liquid tint */}
        <rect x="195" y="316" width="30" height="16" rx="1" fill="#60a5fa" opacity="0.15" />
        {/* Glass reflection slit */}
        <rect x="197" y="294" width="3" height="36" fill="#ffffff" opacity="0.65" rx="1" />

        {/* 8. LOWER NOZZLE SHEATH COLLAR (Y: 346 to 354) */}
        <polygon points="184,346 192,354 228,354 236,346" fill="url(#pen-chrome)" stroke="#334155" strokeWidth="0.5" />

        {/* 9. BOTTOM PROTECTIVE PEN CAP (Y: 354 to 382) */}
        {/* Flanged high-sheen plastic medical nozzle cover */}
        <path 
          d="M 192 354 L 195 376 C 195 380, 225 380, 225 376 L 228 354 Z" 
          fill="url(#pen-blue-glossy)" 
          stroke="#1e3a8a" 
          strokeWidth="0.5" 
        />
        {/* Ribbed cap lines */}
        <line x1="195.5" y1="362" x2="224.5" y2="362" stroke="#ffffff" strokeWidth="0.75" opacity="0.2" />
        <line x1="196" y1="370" x2="224" y2="370" stroke="#ffffff" strokeWidth="0.75" opacity="0.2" />

        {/* Specs highlights (extreme linear glare along top-edge length of pen cylinder) */}
        <path 
          d="M 186 52 L 186 346" 
          stroke="#ffffff" 
          strokeWidth="1.5" 
          opacity="0.35" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
        <path 
          d="M 234 52 L 234 346" 
          stroke="#334155" 
          strokeWidth="1" 
          opacity="0.2" 
          strokeLinecap="round" 
          pointerEvents="none" 
        />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the PT-141 (Bremelanotide / PT-142) peptide vial
export const PT141Vial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "10mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="pt-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gorgeous Purple/Amethyst Cap Gradient */}
        <linearGradient id="pt-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="40%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="pt-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#6d28d9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="pt-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <linearGradient id="pt-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#f5f3ff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#fae8ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="pt-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#faf5ff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#f3e8ff" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="pt-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        <radialGradient id="pt-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d8b4fe" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#pt-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#pt-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#pt-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#d8b4fe" strokeWidth="1.5" opacity="0.4" />

        {/* Lyophilized Active Powder Cake */}
        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#pt-powder-grad)" opacity="0.95" />
        <circle cx="115" cy="312" r="1.5" fill="#a78bfa" opacity="0.4" />
        <circle cx="150" cy="305" r="1.2" fill="#8b5cf6" opacity="0.3" />
        <circle cx="185" cy="315" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#pt-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#pt-glass-body)" stroke="#bfa6e6" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#pt-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Crimp Flange Metallic Cap */}
        <rect x="111" y="46" width="98" height="32" fill="url(#pt-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="111" y="52" width="98" height="2" fill="#000" opacity="0.15" />
        <rect x="111" y="70" width="98" height="2" fill="#fff" opacity="0.3" />

        {/* Flip-top plastic cover */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#pt-cap-grad-vert)" stroke="#4c1d95" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#pt-cap-surface-highlight)" />

        {/* Scientific Label */}
        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#pt-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Label details */}
        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#4c1d95" textAnchor="middle" letterSpacing="-0.3">PT-141</text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#6d28d9" textAnchor="middle">Bremelanotide Peptide</text>
        
        {/* Decorative molecular icon */}
        <path d="M152 204 L160 208 L168 204" stroke="#8b5cf6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
        <circle cx="152" cy="204" r="1.5" fill="#8b5cf6" />
        <circle cx="168" cy="204" r="1.5" fill="#8b5cf6" />
        <circle cx="160" cy="214" r="1.5" fill="#8b5cf6" />
        <line x1="160" y1="208" x2="160" y2="214" stroke="#8b5cf6" strokeWidth="1" opacity="0.7" />

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#1e1b4b" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#4338ca" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: PT-141-89X | EXP: 10/2027</text>

        {/* Reflection glare overlay */}
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the Ipamorelin peptide vial
export const IpamorelinVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "2mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="ipa-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Energetic Coral/Orange Cap Gradient */}
        <linearGradient id="ipa-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
        <linearGradient id="ipa-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fdba74" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ea580c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9a3412" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="ipa-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <linearGradient id="ipa-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#fff7ed" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#ffedd5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="ipa-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fffaf8" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#ffedd5" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="ipa-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        <radialGradient id="ipa-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#ipa-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#ipa-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#ipa-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#fed7aa" strokeWidth="1.5" opacity="0.4" />

        {/* Lyophilized Active Powder Cake */}
        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#ipa-powder-grad)" opacity="0.95" />
        <circle cx="120" cy="310" r="1.5" fill="#f97316" opacity="0.3" />
        <circle cx="160" cy="318" r="1.2" fill="#fed7aa" opacity="0.8" />
        <circle cx="180" cy="305" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#ipa-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#ipa-glass-body)" stroke="#f7a77e" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#ipa-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Crimp Flange Metallic Cap */}
        <rect x="111" y="46" width="98" height="32" fill="url(#pt-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="111" y="52" width="98" height="2" fill="#000" opacity="0.15" />
        <rect x="111" y="70" width="98" height="2" fill="#fff" opacity="0.3" />

        {/* Flip-top plastic cover */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ipa-cap-grad-vert)" stroke="#9a3412" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#ipa-cap-surface-highlight)" />

        {/* Scientific Label */}
        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#ipa-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Label details */}
        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#7c2d12" textAnchor="middle" letterSpacing="-0.3">Ipamorelin</text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#ea580c" textAnchor="middle">Growth Hormone Secretagogue</text>
        
        {/* Decorative dynamic wave line (representing hormone pulses) */}
        <path d="M125 208 Q142.5 198, 160 208 T195 208" stroke="#f97316" strokeWidth="1.25" fill="none" opacity="0.75" />

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#2d1910" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#c2410c" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: IPA-0245B | EXP: 01/2028</text>

        {/* Reflection glare overlay */}
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the Tesamorelin peptide vial
export const TesamorelinVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "2mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="tesa-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gorgeous Emerald/Forest Green Cap Gradient */}
        <linearGradient id="tesa-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="40%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <linearGradient id="tesa-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#10b981" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#059669" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="tesa-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <linearGradient id="tesa-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#ecfdf5" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#d1fae5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="tesa-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#f0fdf4" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#d1fae5" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="tesa-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        <radialGradient id="tesa-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d1fae5" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#tesa-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#tesa-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#tesa-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#a7f3d0" strokeWidth="1.5" opacity="0.4" />

        {/* Lyophilized Active Powder Cake */}
        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#tesa-powder-grad)" opacity="0.95" />
        <circle cx="130" cy="315" r="1.5" fill="#10b981" opacity="0.3" />
        <circle cx="170" cy="308" r="1.2" fill="#a7f3d0" opacity="0.8" />
        <circle cx="190" cy="316" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#tesa-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#tesa-glass-body)" stroke="#8ce2bc" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#tesa-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Crimp Flange Metallic Cap */}
        <rect x="111" y="46" width="98" height="32" fill="url(#pt-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="111" y="52" width="98" height="2" fill="#000" opacity="0.15" />
        <rect x="111" y="70" width="98" height="2" fill="#fff" opacity="0.3" />

        {/* Flip-top plastic cover */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#tesa-cap-grad-vert)" stroke="#064e3b" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#tesa-cap-surface-highlight)" />

        {/* Scientific Label */}
        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#tesa-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Label details */}
        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#064e3b" textAnchor="middle" letterSpacing="-0.3">Tesamorelin</text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#059669" textAnchor="middle">GHRH Analogue Research</text>
        
        {/* Molecular Structure Ring */}
        <g stroke="#10b981" strokeWidth="0.85" fill="none" opacity="0.65" transform="translate(148, 202)">
          <polygon points="12,0 20,4 20,13 12,17 4,13 4,4" />
          <circle cx="12" cy="8" r="3" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#061c15" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#047857" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: TESA-9051T | EXP: 04/2028</text>

        {/* Reflection glare overlay */}
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the KPV (or GHK-Cu+KPV) peptide vial
export const KPVVial: React.FC<{ className?: string; unit?: string; hasGHK?: boolean }> = ({ className = "w-full h-full", unit = "10mg", hasGHK = false }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="kpv-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radiant Anti-inflammatory Ruby/Crimson Red Cap Gradient */}
        <linearGradient id="kpv-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="40%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </linearGradient>
        <linearGradient id="kpv-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#ef4444" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#dc2626" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="kpv-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <linearGradient id="kpv-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#fef2f2" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#fee2e2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="kpv-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fefdfd" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#fee2e2" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="kpv-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        <radialGradient id="kpv-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fee2e2" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#kpv-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#kpv-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#kpv-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#fecaca" strokeWidth="1.5" opacity="0.4" />

        {/* Lyophilized Active Powder Cake */}
        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#kpv-powder-grad)" opacity="0.95" />
        <circle cx="110" cy="314" r="1.5" fill="#ef4444" opacity="0.3" />
        <circle cx="150" cy="306" r="1.2" fill="#fecaca" opacity="0.8" />
        <circle cx="180" cy="318" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#kpv-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#kpv-glass-body)" stroke="#f7a8a8" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#kpv-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Crimp Flange Metallic Cap */}
        <rect x="111" y="46" width="98" height="32" fill="url(#pt-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="111" y="52" width="98" height="2" fill="#000" opacity="0.15" />
        <rect x="111" y="70" width="98" height="2" fill="#fff" opacity="0.3" />

        {/* Flip-top plastic cover */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#kpv-cap-grad-vert)" stroke="#7f1d1d" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#kpv-cap-surface-highlight)" />

        {/* Scientific Label */}
        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#kpv-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Label details */}
        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#7f1d1d" textAnchor="middle" letterSpacing="-0.3">
          {hasGHK ? "GHK-Cu + KPV" : "KPV Peptide"}
        </text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#dc2626" textAnchor="middle">
          {hasGHK ? "Synergized Recovery Matrix" : "Mucosal & Systemic Relief"}
        </text>
        
        {/* Anti-Inflammatory Shield Icon */}
        <g stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.7" transform="translate(150, 202)">
          <path d="M10 2 L2 5 L2 11 C2 15 5 18 10 20 C15 18 18 15 18 11 L18 5 L10 2 Z" strokeLinejoin="round" />
          <path d="M7 11 L9 13 L13 9" strokeWidth="1.25" strokeLinecap="round" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#1f0909" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#b91c1c" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: KPV-7811P | EXP: 11/2027</text>

        {/* Reflection glare overlay */}
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the AOD (AOD-9604) fat loss / lipolytic peptide vial
export const AODVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "2mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="aod-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Bright Lipolytic Amber/Gold Cap Gradient */}
        <linearGradient id="aod-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="aod-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fde047" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#faf089" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#d97706" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="aod-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <linearGradient id="aod-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#fef3c7" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#fde68a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="aod-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#fffbeb" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="aod-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
        </linearGradient>

        <radialGradient id="aod-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#aod-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#aod-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#aod-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#fde047" strokeWidth="1.5" opacity="0.4" />

        {/* Lyophilized Active Powder Cake */}
        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#aod-powder-grad)" opacity="0.95" />
        <circle cx="115" cy="310" r="1.5" fill="#f59e0b" opacity="0.3" />
        <circle cx="155" cy="316" r="1.2" fill="#fde68a" opacity="0.8" />
        <circle cx="185" cy="308" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#aod-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#aod-glass-body)" stroke="#fcd48c" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#aod-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Crimp Flange Metallic Cap */}
        <rect x="111" y="46" width="98" height="32" fill="url(#pt-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="111" y="52" width="98" height="2" fill="#000" opacity="0.15" />
        <rect x="111" y="70" width="98" height="2" fill="#fff" opacity="0.3" />

        {/* Flip-top plastic cover */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#aod-cap-grad-vert)" stroke="#78350f" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#aod-cap-surface-highlight)" />

        {/* Scientific Label */}
        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#aod-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Label details */}
        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#78350f" textAnchor="middle" letterSpacing="-0.3">AOD-9604</text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#d97706" textAnchor="middle">Lipolytic Active Fragment</text>
        
        {/* Flame core vector representation */}
        <g stroke="#f59e0b" strokeWidth="1" fill="none" opacity="0.75" transform="translate(152, 200)">
          <path d="M8 18 C8 18, 14 14, 14 8 C14 4, 8 1, 8 1 C8 1, 2 4, 2 8 C2 14, 8 18, 8 18 Z" />
          <path d="M8 14 C8 14, 11 11.5, 11 8 C11 5, 8 3, 8 3 C8 3, 5 5, 5 8 C5 11.5, 8 14, 8 14 Z" strokeWidth="0.75" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#2d1502" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#b45309" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: AOD-9604K | EXP: 08/2027</text>

        {/* Reflection glare overlay */}
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};


// Highly polished SVG vector reproduction of the DSIP (Delta Sleep-Inducing Peptide) vial
export const DSIPVial: React.FC<{ className?: string; unit?: string }> = ({ className = "w-full h-full", unit = "2mg" }) => {
  const displayUnit = unit.toLowerCase().includes("vial") ? unit : `${unit}`;

  return (
    <svg viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height="100%">
      <defs>
        <filter id="dsip-bottle-shadow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="12" />
          <feComponentTransfer><feFuncA type="linear" slope="0.16"/></feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Immersive Midnight Blue / Cosmic Twilight Cap Gradient */}
        <linearGradient id="dsip-cap-grad-vert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="40%" stopColor="#3730a3" />
          <stop offset="100%" stopColor="#1e1b4b" />
        </linearGradient>
        <linearGradient id="dsip-cap-surface-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="50%" stopColor="#4f46e5" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#3730a3" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="dsip-metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a1a1aa" />
          <stop offset="20%" stopColor="#f4f4f5" />
          <stop offset="42%" stopColor="#d4d4d8" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="85%" stopColor="#71717a" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>

        <linearGradient id="dsip-glass-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="12%" stopColor="#e0e7ff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.1" />
          <stop offset="85%" stopColor="#c7d2fe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="dsip-powder-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="65%" stopColor="#e0e7ff" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.98" />
        </linearGradient>

        <linearGradient id="dsip-label-cylinder" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.45" />
          <stop offset="10%" stopColor="#ffffff" />
          <stop offset="90%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.45" />
        </linearGradient>

        <radialGradient id="dsip-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#faf9f6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="220" r="110" fill="url(#dsip-bg-glow)" pointerEvents="none" />

      <g transform="translate(160, 195) rotate(-6) translate(-160, -195)" filter="url(#dsip-bottle-shadow)">
        <path d="M 90 310 C 90 310, 90 338, 102 338 L 218 338 C 230 338, 230 310, 230 310 Z" fill="url(#dsip-glass-body)" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 314 C 105 328, 215 328, 218 314" fill="none" stroke="#c7d2fe" strokeWidth="1.5" opacity="0.4" />

        {/* Lyophilized Active Powder Cake */}
        <path d="M 91 292 Q 110 289, 132 295 Q 160 287, 188 296 Q 210 290, 229 293 L 229 324 C 229 332, 218 334, 201 334 L 119 334 C 102 334, 91 332, 91 324 Z" fill="url(#dsip-powder-grad)" opacity="0.95" />
        <circle cx="120" cy="308" r="1.5" fill="#4f46e5" opacity="0.3" />
        <circle cx="150" cy="315" r="1.2" fill="#c7d2fe" opacity="0.8" />
        <circle cx="180" cy="304" r="1.4" fill="#ffffff" opacity="0.8" />

        <path d="M 90 108 L 90 310 C 90 316, 92 320, 97 320 L 223 320 C 228 320, 230 316, 230 310 L 230 108 Z" fill="url(#dsip-glass-body)" stroke="#cbd5e1" strokeWidth="1.25" />
        <rect x="110" y="78" width="100" height="8" rx="3.5" fill="url(#dsip-glass-body)" stroke="#a1adb6" strokeWidth="0.75" />
        <path d="M 116 86 L 116 102 C 116 112, 90 114, 90 130 L 90 148 L 230 148 L 230 130 C 230 114, 204 112, 204 102 L 204 86 Z" fill="url(#dsip-glass-body)" stroke="#cbd5e1" strokeWidth="1" />

        {/* Crimp Flange Metallic Cap */}
        <rect x="111" y="46" width="98" height="32" fill="url(#pt-metal-grad)" stroke="#94a3b8" strokeWidth="0.5" />
        <rect x="111" y="52" width="98" height="2" fill="#000" opacity="0.15" />
        <rect x="111" y="70" width="98" height="2" fill="#fff" opacity="0.3" />

        {/* Flip-top plastic cover */}
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#dsip-cap-grad-vert)" stroke="#1e1b4b" strokeWidth="0.75" />
        <rect x="100" y="22" width="120" height="24" rx="5" fill="url(#dsip-cap-surface-highlight)" />

        {/* Scientific Label */}
        <rect x="92" y="152" width="136" height="132" rx="1" fill="url(#dsip-label-cylinder)" stroke="#e2e8f0" strokeWidth="0.5" />

        {/* Label details */}
        <text x="160" y="180" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="15" fill="#1e1b4b" textAnchor="middle" letterSpacing="-0.3">DSIP</text>
        <text x="160" y="194" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="7" fill="#3730a3" textAnchor="middle">Delta Sleep-Inducing Peptide</text>
        
        {/* Soft Moon and stars vector representing calming rest */}
        <g stroke="#4f46e5" strokeWidth="1" fill="none" opacity="0.7" transform="translate(148, 200)">
          <path d="M16 4 C11 4, 8 8, 8 13 C8 17, 11 20, 15 20 C10 20, 5 15, 5 10 C5 5, 10 3, 16 4 Z" fill="#c7d2fe" opacity="0.3" />
          <circle cx="21" cy="6" r="0.75" fill="#4f46e5" />
          <circle cx="19" cy="14" r="0.5" fill="#4f46e5" />
        </g>

        <text x="160" y="234" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="19" fill="#08071a" textAnchor="middle">{displayUnit}</text>
        <text x="160" y="248" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="7.5" fill="#4338ca" textAnchor="middle" letterSpacing="0.1">STERILE LYOPHILIZED</text>
        <text x="160" y="259" fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="6.2" fill="#475569" textAnchor="middle">FOR RECONSTITUTION ONLY</text>
        <text x="160" y="271" fontFamily="'Inter', sans-serif" fontWeight="600" fontSize="5.5" fill="#94a3b8" textAnchor="middle">Lot: DSIP-1102S | EXP: 12/2027</text>

        {/* Reflection glare overlay */}
        <path d="M 100 130 C 100 130, 110 100, 110 325" stroke="#ffffff" strokeWidth="2.8" opacity="0.25" strokeLinecap="round" pointerEvents="none" />
      </g>
    </svg>
  );
};


interface ProductImageProps {
  productId: number;
  productName: string;
  imageUrl: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}

export const ProductImage: React.FC<ProductImageProps> = ({
  productId,
  productName,
  imageUrl,
  className = "w-full h-full relative overflow-hidden flex items-center justify-center",
  imgClassName = "w-full h-full object-cover",
  loading = "lazy"
}) => {
  const [hasError, setHasError] = React.useState(false);

  // Check if this is the Bacteriostatic Water (ID 43)
  const isBacWater = productId === 43 || productName.toLowerCase().includes("bacwater");
  // Check if this is Retatrutide
  const isRetatrutide = productName.toLowerCase().includes("retatrutide");
  // Check if this is Tirzepatide
  const isTirzepatide = productName.toLowerCase().includes("tirzepatide");
  // Check if this is NAD+
  const isNAD = productName.toUpperCase().includes("NAD+");
  // Check if this is BPC-157
  const isBPC157 = productName.toLowerCase().includes("bpc-157") || productName.toLowerCase().includes("bpc157");
  // Check if this is GHK-Cu
  const isGHK = productName.toLowerCase().includes("ghk-cu") || productName.toLowerCase().includes("ghkcu");
  // Check if this is MOTs-C
  const isMOTS = productName.toLowerCase().includes("mots-c") || productName.toLowerCase().includes("motsc");
  // Check if this is Glutathione
  const isGlutathione = productName.toLowerCase().includes("glutathione");
  // Check if this is PT-141 / PT-142
  const isPT = productName.toLowerCase().includes("pt-141") || productName.toLowerCase().includes("pt-142") || productName.toLowerCase().includes("pt141") || productName.toLowerCase().includes("pt142");
  // Check if this is Ipamorelin
  const isIpamorelin = productName.toLowerCase().includes("ipamorelin");
  // Check if this is Tesamorelin
  const isTesamorelin = productName.toLowerCase().includes("tesamorelin");
  // Check if this is KPV
  const isKPV = productName.toLowerCase().includes("kpv");
  // Check if this is AOD
  const isAOD = productName.toLowerCase().includes("aod");
  // Check if this is DSIP
  const isDSIP = productName.toLowerCase().includes("dsip");
  // Check if this is 5Amino-1mq
  const isFiveAmino = productName.toLowerCase().includes("5amino") || productName.toLowerCase().includes("5-amino") || productName.toLowerCase().includes("5a1q");
  // Check if this is Semax
  const isSemax = productName.toLowerCase().includes("semax");
  // Check if this is Epitalon
  const isEpitalon = productName.toLowerCase().includes("epitalon");
  // Check if this is CJC 1295
  const isCJC = productName.toLowerCase().includes("cjc");
  // Check if this is Glow
  const isGlow = productName.toLowerCase().includes("glow");
  // Check if this is Snap-8
  const isSnap = productName.toLowerCase().includes("snap") || productName.toLowerCase().includes("snap8") || productName.toLowerCase().includes("snap-8");
  // Check if this is Oxytocin
  const isOxytocin = productName.toLowerCase().includes("oxytocin");
  // Check if this is LL37
  const isLL37 = productName.toLowerCase().includes("ll37") || productName.toLowerCase().includes("ll-37");
  // Check if this is Cagrilintide
  const isCagrilintide = productName.toLowerCase().includes("cagrilintide") || productName.toLowerCase().includes("cagri");
  // Check if this is SLU-PP-322
  const isSLU = productName.toLowerCase().includes("slu");
  // Check if this is Kisspeptin
  const isKiss = productName.toLowerCase().includes("kisspeptin") || productName.toLowerCase().includes("kisspeptine");

  const isTiny = className.includes("w-10") || className.includes("w-12") || className.includes("w-14") || className.includes("h-10") || className.includes("h-12") || className.includes("h-14") || className.includes("w-16") || className.includes("h-16") || className.includes("w-20") || className.includes("h-20");
  const paddingClass = isTiny ? "p-0.5 border" : "p-2 border";
  const maxHClass = isTiny ? "max-h-[96%]" : "max-h-[85%]";
  const rotateClass = isTiny ? "" : "rotate-[-12deg] hover:rotate-0 transition-transform duration-500 ease-out";
  const scaleHoverClass = isTiny ? "" : "transition-transform duration-500 ease-out hover:scale-105";

  if (hasError) {
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 p-3 border border-dashed border-slate-300 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center text-center gap-1.5 overflow-hidden`}>
        <ImageOff className="w-8 h-8 text-rose-500/80 dark:text-rose-400/80 stroke-[1.5] animate-pulse" />
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 max-w-full truncate px-2 leading-none">
          {productName || "Product Detail"}
        </span>
        <span className="text-[8px] font-sans text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
          Network Load Fail
        </span>
      </div>
    );
  }

  if (isBacWater) {
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center`}>
          <BacWaterVial className="max-w-full max-h-full" />
        </div>
      </div>
    );
  }

  if (isRetatrutide) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center`}>
          <RetatrutideVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isTirzepatide) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center`}>
          <TirzepatideVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isNAD) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "500mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center`}>
          <NADVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isBPC157) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "5mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${rotateClass}`}>
          <BPCVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isGHK) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "50mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <GHKCuVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isMOTS) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <MOTsCVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isGlutathione) {
    // Dynamic dosing layout check
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "1500mg";
    
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <GlutathionePen className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isPT) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <PT141Vial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isIpamorelin) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "2mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <IpamorelinVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isTesamorelin) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "2mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <TesamorelinVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isKPV) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    const hasGHK = productName.toLowerCase().includes("ghk");
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <KPVVial className="max-w-full max-h-full" unit={unit} hasGHK={hasGHK} />
        </div>
      </div>
    );
  }

  if (isAOD) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "2mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <AODVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isDSIP) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "2mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <DSIPVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isFiveAmino) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "50mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <FiveAminoVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isSemax) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "5mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <SemaxVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isEpitalon) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <EpitalonVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isCJC) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <CJC1295Vial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isGlow) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "70mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <GlowVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isSnap) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "10mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <Snap8Vial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isOxytocin) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "2mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <OxytocinVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isLL37) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "5mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <LL37Vial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isCagrilintide) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "5mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <CagrilintideVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isSLU) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "5mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <SLUPP322Vial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  if (isKiss) {
    const matchingProduct = products.find(p => p.id === productId);
    const unit = matchingProduct ? matchingProduct.unit : "5mg";
    return (
      <div className={`${className} bg-slate-50 dark:bg-slate-900/60 ${paddingClass} border-slate-200/30 dark:border-slate-800 rounded-xl flex items-center justify-center overflow-hidden`}>
        <div className={`w-full h-full ${maxHClass} flex items-center justify-center ${scaleHoverClass}`}>
          <KisspeptinVial className="max-w-full max-h-full" unit={unit} />
        </div>
      </div>
    );
  }

  // Otherwise, render normal image with referrer policy bypass to prevent broken loads
  return (
    <div className={className}>
      <img
        src={imageUrl}
        alt={productName}
        loading={loading}
        referrerPolicy="no-referrer"
        className={imgClassName}
        onError={(e) => {
          console.error(`[ProductImage Error] Mobile/network resource failed to load. Product: "${productName}" (ID: ${productId}). Path: ${imageUrl}. Error event:`, e);
          setHasError(true);
        }}
      />
    </div>
  );
};
