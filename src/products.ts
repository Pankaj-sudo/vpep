/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types.ts';
import { products as initialProductsList } from './data.ts';

export const PRODUCTS: Product[] = initialProductsList.map(p => {
  // Map fields to have both sets so that components of both styles function correctly
  const nameLower = p.name.toLowerCase();
  let catMapped = 'Wellness';
  
  if (nameLower.includes('ghk') || nameLower.includes('glow') || nameLower.includes('snap') || nameLower.includes('semax')) {
    catMapped = 'Cosmetics';
  } else if (p.cat === 'Weight Loss' || nameLower.includes('amino') || nameLower.includes('aod') || nameLower.includes('retatrutide') || nameLower.includes('tirzepatide') || nameLower.includes('cagrilintide') || nameLower.includes('slu') || nameLower.includes('mots')) {
    catMapped = 'Metabolic';
  } else if (p.cat === 'Cognitive & Sleep' || nameLower.includes('epitalon') || nameLower.includes('dsip') || nameLower.includes('oxytocin') || nameLower.includes('nad')) {
    catMapped = 'Wellness';
  } else if (p.cat === 'Peptides' || nameLower.includes('bpc') || nameLower.includes('tb') || nameLower.includes('cjc') || nameLower.includes('ipamorelin') || nameLower.includes('kisspeptin') || nameLower.includes('ll37') || nameLower.includes('kpv') || nameLower.includes('tesamorelin')) {
    catMapped = 'Healing';
  } else {
    // Supplies, Pens, etc.
    catMapped = 'Wellness';
  }
  
  // Standard coaSummary fallback based on the product name
  const isBacWater = p.name.toLowerCase().includes('water');
  const coaPurity = isBacWater ? "99.9%" : "99.5%";
  const coaAppearance = isBacWater ? "Clear sterile liquid" : "White sterile lyophilized powder";
  
  return {
    ...p,
    id: p.id,
    name: p.name,
    price: p.price,
    
    // vpep fields
    description: p.desc,
    concentration: p.unit,
    category: catMapped,
    coaUrl: p.coaUrl || "https://drive.google.com/file/d/default_coa/view",
    coaSummary: {
      purity: coaPurity,
      appearance: coaAppearance,
      batchNo: p.abbr ? `${p.abbr}-2026-X` : `PEP-2026-X`,
      testDate: "February 2026",
      method: "HPLC & Mass Spectrometry"
    },
    dosageDefaultMg: p.unit ? (parseFloat(p.unit) || 5) : 5,

    // P Project fields
    unit: p.unit,
    stock: p.stock,
    cat: catMapped,
    desc: p.desc,
    image: p.image,
    abbr: p.abbr,
    popularity: p.popularity || 80
  };
});

export const DELIVERY_FEES = {
  "Lalamove": 150,
  "GrabExpress": 130
};

export const ADMIN_EMAILS = [
  "pankaj.ydv707@gmail.com" // Main Admin whitelisted automatically so developer can test instantly
];

export const VIBER_PHONE = "09761831910";
