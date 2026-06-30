/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, FlaskConical, ShieldAlert, ArrowUpRight, CheckCircle2, ChevronRight, Download, Calculator, Sparkles, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types.ts';
import { ProductImage } from './ProductImage.tsx';
import PeptideCalculator from './PeptideCalculator.tsx';

interface ProductsProps {
  products: Product[];
  addToCart: (product: Product) => void;
  toast: (message: string, type?: 'success' | 'error' | 'info') => void;
  onOpenProduct: (product: Product) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function Products({ 
  products, 
  addToCart, 
  toast, 
  onOpenProduct,
  selectedCategory,
  setSelectedCategory
}: ProductsProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // COA Modal state
  const [coaProduct, setCoaProduct] = useState<Product | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--mouse-x', `${x}px`);
    button.style.setProperty('--mouse-y', `${y}px`);
  };

  const categories = ['All', 'Healing', 'Metabolic', 'Wellness', 'Cosmetics', 'Peptide Calculator'];

  const filteredProducts = products.filter(p => {
    if (selectedCategory === 'Peptide Calculator') return false;
    const category = p.category || p.cat || 'Wellness';
    const description = p.description || p.desc || '';
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast(`Added 1x ${product.name} to cartridge`, 'success');
  };

  return (
    <div id="product-grid-section" className="space-y-8">
      
      {/* Search and Category Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#111827]/50 p-4 rounded-xl border border-[#1E2D45]">
        
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2 order-2 md:order-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat === 'Peptide Calculator') {
                  setTimeout(() => {
                    const el = document.getElementById('peptide-calculator-grid-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
              className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-200 ${
                selectedCategory === cat 
                  ? cat === 'Peptide Calculator'
                    ? 'bg-gradient-to-r from-accent to-[#3B82F6] text-bg-deep font-bold shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'bg-accent text-bg-deep font-bold shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                  : 'text-[#8896B3] bg-transparent border border-[#1E2D45] hover:text-white hover:border-accent/40'
              }`}
            >
              {cat === 'Peptide Calculator' && <span className="inline-block mr-1">⚗</span>}
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        {selectedCategory !== 'Peptide Calculator' && (
          <div className="relative w-full md:w-80 order-1 md:order-2">
            <Search className="absolute left-3.5 top-3 h-4 text-[#8896B3]" />
            <input
              type="text"
              placeholder="Search chemical compounds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-full border border-[#1E2D45] bg-[#0A0F1E] pl-11 pr-4 py-2.5 text-white placeholder-[#8896B3]/60 focus:border-accent focus:outline-none transition font-sans"
            />
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PEPTIDE CALCULATOR — Full category section in product grid */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {selectedCategory === 'Peptide Calculator' && (
        <motion.div
          id="peptide-calculator-grid-section"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Intro Card — same card styling as product cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature Card 1: Overview */}
            <div className="group flex flex-col justify-between rounded-xl border border-[#1E2D45] bg-[#111827]/50 backdrop-blur-sm p-6 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.03)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/[0.03] rounded-full blur-[60px] pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded border border-accent/20 text-accent bg-accent/5">
                    Dosage Tool
                  </span>
                  <Calculator className="h-5 w-5 text-accent" />
                </div>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-20 w-14 flex-shrink-0 rounded-lg border border-[#1E2D45] bg-[#0A0F1E] flex items-center justify-center group-hover:border-accent/30 transition-all shadow-[0_0_20px_rgba(0,212,255,0.03)]">
                    <Calculator className="h-7 w-7 text-accent/60" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display font-black text-white text-base group-hover:text-accent uppercase tracking-tight transition-all">
                      Peptide Calculator
                    </h3>
                    <p className="text-[11px] text-[#8896B3] mt-1.5 leading-relaxed font-sans line-clamp-3">
                      Personalized peptide recommendation tool. Input your research parameters to receive precise reconstitution dosing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1E2D45]">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-[10px] font-mono text-[#8896B3] uppercase tracking-wider">Interactive Tool</span>
                  <span className="font-display text-lg font-bold text-accent tracking-tight">Free</span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('peptide-dosage-calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-accent text-bg-deep hover:bg-[#00B9DD] hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all uppercase tracking-wider flex items-center justify-center space-x-1.5"
                >
                  <span>Start Calculator</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Feature Card 2: Personalized Recommendations */}
            <div className="group flex flex-col justify-between rounded-xl border border-[#1E2D45] bg-[#111827]/50 backdrop-blur-sm p-6 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.03)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#3B82F6]/[0.03] rounded-full blur-[60px] pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded border border-[#1E2D45] text-[#8896B3] bg-[#0A0F1E]">
                    AI Matching
                  </span>
                  <Sparkles className="h-5 w-5 text-accent" />
                </div>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-20 w-14 flex-shrink-0 rounded-lg border border-[#1E2D45] bg-[#0A0F1E] flex items-center justify-center group-hover:border-accent/30 transition-all shadow-[0_0_20px_rgba(0,212,255,0.03)]">
                    <Sparkles className="h-7 w-7 text-[#3B82F6]/60" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display font-black text-white text-base group-hover:text-accent uppercase tracking-tight transition-all">
                      Smart Recommendations
                    </h3>
                    <p className="text-[11px] text-[#8896B3] mt-1.5 leading-relaxed font-sans line-clamp-3">
                      Based on your age, weight, and research conditions, get curated peptide suggestions from our certified catalog.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1E2D45]">
                <div className="space-y-2">
                  {['Volumetric dosing', 'Syringe calibration', 'Reconstitution guide'].map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[10px] font-mono text-[#8896B3] uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature Card 3: HPLC Verified */}
            <div className="group flex flex-col justify-between rounded-xl border border-[#1E2D45] bg-[#111827]/50 backdrop-blur-sm p-6 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.03)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-accent/[0.02] rounded-full blur-[60px] pointer-events-none" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded border border-[#1E2D45] text-[#8896B3] bg-[#0A0F1E]">
                    Lab Verified
                  </span>
                  <ShieldCheck className="h-5 w-5 text-accent" />
                </div>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="h-20 w-14 flex-shrink-0 rounded-lg border border-[#1E2D45] bg-[#0A0F1E] flex items-center justify-center group-hover:border-accent/30 transition-all shadow-[0_0_20px_rgba(0,212,255,0.03)]">
                    <Activity className="h-7 w-7 text-accent/60" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-display font-black text-white text-base group-hover:text-accent uppercase tracking-tight transition-all">
                      Precision Dosing
                    </h3>
                    <p className="text-[11px] text-[#8896B3] mt-1.5 leading-relaxed font-sans line-clamp-3">
                      Every calculation is based on HPLC-verified compound data with precise volumetric measurements for U-100 insulin syringes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#1E2D45]">
                <div className="space-y-2">
                  {['U-100 syringe support', 'mcg/mg unit toggle', 'Visual syringe indicator'].map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2 text-[10px] font-mono text-[#8896B3] uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3 text-accent flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full Calculator Component */}
          <div className="relative">
            <div className="absolute -inset-px bg-gradient-to-br from-accent/10 via-transparent to-[#3B82F6]/10 rounded-2xl blur-sm pointer-events-none" />
            <PeptideCalculator products={products} />
          </div>
        </motion.div>
      )}

      {/* Product Cards Grid — shown for all categories except Peptide Calculator */}
      {selectedCategory !== 'Peptide Calculator' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p, idx) => {
                return (
                  <motion.div 
                    key={p.id} 
                    id={`product-card-${p.id}`}
                    layout="position"
                    initial={{ opacity: 0, scale: 0.95, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ 
                      duration: 0.5,
                      delay: (idx % 9) * 0.06, // stagger within visible page (max 9 cards)
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    whileHover={{
                      y: -8,
                      scale: 1.018,
                      boxShadow: '0 20px 48px rgba(0,127,158,0.18)',
                      transition: { type: 'spring', stiffness: 300, damping: 22 }
                    }}
                    className="card-glass group flex flex-col justify-between rounded-[18px] p-7"
                  >
                    <div>

                      {/* Batch badge + verified badge row */}
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[9px] font-mono uppercase px-2.5 py-1 rounded border border-border text-text-muted bg-bg-elevated tracking-widest">
                          {p.category || p.cat || 'Wellness'} batch
                        </span>
                        <span className="badge-lab">
                          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          Verified
                        </span>
                      </div>

                      {/* Main Card Content: Horizontal Split */}
                      <div className="flex items-start gap-6 mb-6">
                        
                        {/* Left: Taller & Larger Vial Image */}
                        <div className="shrink-0">
                          <ProductImage 
                            productId={Number(p.id)}
                            productName={p.name}
                            imageUrl={p.image || ''}
                            className="h-44 w-28 relative overflow-hidden rounded-xl border border-border bg-bg-elevated flex items-center justify-center p-2 group-hover:border-accent/40 transition-all shadow-sm"
                            imgClassName="w-full h-full object-cover"
                          />
                        </div>

                        {/* Right: Left-Aligned Text Details */}
                        <div className="flex-1 text-left min-h-[176px] flex flex-col justify-between">
                          <div>
                            <h3 className="font-display font-cormorant font-bold text-text-primary text-2xl group-hover:text-accent tracking-tight transition-all leading-tight">
                              {p.name}
                            </h3>
                            <p className="text-[12.5px] text-text-muted leading-[1.65] font-sans mt-2.5 line-clamp-4">
                              {p.description || p.desc || ''}
                            </p>
                            {/* Concentration badge */}
                            {(p.concentration || p.unit) && (
                              <span className="inline-block mt-2 badge-lab-blue">{p.concentration || p.unit}</span>
                            )}
                          </div>

                          {/* Pricing Row */}
                          <div className="flex items-baseline justify-between mt-4 pt-3 border-t border-border/50">
                            <span className="text-[8.5px] font-mono text-text-muted uppercase tracking-wider">Research grade price</span>
                            <span className="font-display font-cormorant text-2xl font-bold text-accent tracking-tight">
                              ₱{p.price.toLocaleString()}
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Full-Width Add to Cart Button */}
                    <div className="pt-2">
                      <motion.button
                        onClick={() => onOpenProduct(p)}
                        onMouseMove={handleMouseMove}
                        className="btn-ripple btn-life-green btn-spotlight w-full py-3.5 px-4 text-xs font-bold rounded-xl text-white
                          uppercase tracking-wider
                          flex items-center justify-center gap-2"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        View & Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="col-span-full py-12 text-center rounded-xl border border-dashed border-[#1E2D45] bg-[#111827]/40"
              >
                <ShieldAlert className="h-10 w-10 text-[#8896B3] mx-auto mb-3 animate-pulse" />
                <p className="text-sm text-[#8896B3]">No molecular compound matched your search query in this batch list.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-3 text-xs font-semibold text-accent hover:underline"
                >
                  Reset active filters
                </button>
              </motion.div>
            )}
          </div>

          <div className="rounded-xl border border-[#1E2D45] bg-[#111827]/40 p-5 flex items-start space-x-3.5 max-w-7xl">
            <FlaskConical className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#8896B3] leading-relaxed font-sans text-left">
              <strong className="text-white">Philippine Regulatory Disclaimer:</strong> All compounds listed on VitaPep are provided for rigorous clinical validation, in-vitro investigations, and lab research purposes. Protect chemicals from direct UV light radiation and store at temperatures below 4°C.
            </p>
          </div>
        </>
      )}

      {/* Certificate of Analysis (COA) Modal Overlay */}
      {coaProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-lg rounded-xl border border-[#1E2D45] bg-[#111827] shadow-2xl p-6 overflow-hidden animate-scale-up"
            id="coa-modal-container"
          >
            {/* Holographic glowing borders */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-dim to-accent" />

            <div className="flex items-center justify-between pb-4 border-b border-[#1E2D45]/60">
              <div className="flex items-center space-x-2">
                <FlaskConical className="h-5 w-5 text-accent" />
                <div className="text-left">
                  <h3 className="font-display font-extrabold text-white text-base">Certificate of Analysis</h3>
                  <p className="text-[9px] font-mono text-[#8896B3] uppercase tracking-wide">Independent Analytical report batch</p>
                </div>
              </div>
              <button 
                onClick={() => setCoaProduct(null)}
                className="p-1 px-2.5 text-[9px] font-mono rounded-full border border-[#1E2D45] text-[#8896B3] hover:text-white hover:bg-white/[0.03]"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="mt-5 space-y-4">
              
              {/* Product Header */}
              <div className="bg-[#0A0F1E] p-4 rounded-xl border border-[#1E2D45]/70 text-center relative overflow-hidden">
                <span className="absolute top-2 right-2 text-[8px] font-mono text-success bg-success/15 border border-success/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                  PASSED CHECK
                </span>
                <h4 className="text-lg font-display font-bold text-white tracking-wide uppercase">{coaProduct.name}</h4>
                <p className="text-xs text-accent font-mono mt-1">{coaProduct.concentration}</p>
              </div>

              {/* COA Analytical Test Data List */}
              <div className="border border-[#1E2D45] rounded-xl bg-[#0A0F1E] overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#111827]/80 font-mono text-[#8896B3] border-b border-[#1E2D45] text-[9px] uppercase tracking-wider">
                      <th className="p-3 pl-4">Analytical Parameter</th>
                      <th className="p-3">Reference Spec</th>
                      <th className="p-3 pr-4 text-right">Batch Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2D45]/40 font-mono text-white/90 text-[11px]">
                    <tr>
                      <td className="p-3 pl-4 text-[#8896B3]">Chemical Purity</td>
                      <td className="p-3">≥98.00%</td>
                      <td className="p-3 pr-4 text-right text-accent font-bold">{coaProduct.coaSummary?.purity || '99.5%'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 pl-4 text-[#8896B3]">Appearance</td>
                      <td className="p-3">White Powder</td>
                      <td className="p-3 pr-4 text-right">{coaProduct.coaSummary?.appearance || 'White sterile lyophilized powder'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 pl-4 text-[#8896B3]">Batch Number</td>
                      <td className="p-3">-</td>
                      <td className="p-3 pr-4 text-right text-white">{coaProduct.coaSummary?.batchNo || 'PEP-2026-X'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 pl-4 text-[#8896B3]">Test Method</td>
                      <td className="p-3">HPLC/LC-MS</td>
                      <td className="p-3 pr-4 text-right">{coaProduct.coaSummary?.method || 'HPLC & Mass Spectrometry'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 pl-4 text-[#8896B3]">Validation Date</td>
                      <td className="p-3">-</td>
                      <td className="p-3 pr-4 text-right text-success">{coaProduct.coaSummary?.testDate || 'February 2026'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Full COA button */}
              <div className="pt-3 flex flex-col items-center">
                <p className="text-[10px] text-[#8896B3] text-center leading-normal max-w-xs mb-4 uppercase tracking-wider">
                  Testing conducted by independent laboratory validating peptide residue and molecular integrity.
                </p>
                
                <a 
                  href={coaProduct.coaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-full bg-[#0A0F1E] border border-accent/25 hover:border-accent text-white hover:text-accent font-mono text-xs flex items-center justify-center space-x-2 transition-all uppercase tracking-wider font-semibold"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Lab Chromatogram (PDF)</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
