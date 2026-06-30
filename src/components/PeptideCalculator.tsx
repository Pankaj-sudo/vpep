import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Info, 
  Droplets,
  Syringe, 
  Activity, 
  Lightbulb,
  Check,
  ChevronRight
} from 'lucide-react';

interface Preset {
  name: string;
  vialSize: number;
  waterAdded: number;
  desiredDose: number;
  doseUnit: 'mcg' | 'mg';
}

const PEPTIDE_PRESETS: Preset[] = [
  { name: 'Semaglutide 5mg', vialSize: 5, waterAdded: 2, desiredDose: 250, doseUnit: 'mcg' },
  { name: 'Tirzepatide 10mg', vialSize: 10, waterAdded: 2, desiredDose: 2.5, doseUnit: 'mg' },
  { name: 'BPC-157 5mg', vialSize: 5, waterAdded: 2.5, desiredDose: 300, doseUnit: 'mcg' },
  { name: 'Melanotan II 10mg', vialSize: 10, waterAdded: 2, desiredDose: 500, doseUnit: 'mcg' },
  { name: 'Ipamorelin 2mg', vialSize: 2, waterAdded: 2, desiredDose: 100, doseUnit: 'mcg' }
];

interface PeptideCalculatorProps {
  products?: any[];
  isSidebar?: boolean;
}

export default function PeptideCalculator({ products, isSidebar = false }: PeptideCalculatorProps = {}) {
  const [vialSize, setVialSize] = useState<string>('5'); // in mg
  const [waterAdded, setWaterAdded] = useState<string>('2'); // in mL
  const [desiredDose, setDesiredDose] = useState<string>('250'); // in mcg or mg
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg');
  const [isInsulinSyringe, setIsInsulinSyringe] = useState<boolean>(true); // 100 units / mL (U-100)
  
  // Custom tooltips / helper state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Apply a preset
  const handleApplyPreset = (preset: Preset) => {
    setVialSize(preset.vialSize.toString());
    setWaterAdded(preset.waterAdded.toString());
    setDesiredDose(preset.desiredDose.toString());
    setDoseUnit(preset.doseUnit);
  };

  // Perform calculations
  const calculations = useMemo(() => {
    const vialMg = parseFloat(vialSize);
    const waterMl = parseFloat(waterAdded);
    const doseVal = parseFloat(desiredDose);

    if (isNaN(vialMg) || vialMg <= 0 || isNaN(waterMl) || waterMl <= 0 || isNaN(doseVal) || doseVal <= 0) {
      return {
        error: 'Please enter valid positive values for all inputs.',
        concentrationMgMl: 0,
        concentrationMcgMl: 0,
        concentrationMcgPerUnit: 0,
        volToInjectMl: 0,
        unitsToInject: 0,
        doseInMcg: 0,
        vialInMcg: 0,
        unitsInVial: 0
      };
    }

    const vialInMcg = vialMg * 1000;
    const concentrationMgMl = vialMg / waterMl;
    const concentrationMcgMl = vialInMcg / waterMl;

    // Standard U-100 insulin syringe: 1 mL = 100 units
    // Thus and concentration per unit
    const concentrationMcgPerUnit = concentrationMcgMl / 100;

    // Desired dose in mcg for simple math
    const doseInMcg = doseUnit === 'mg' ? doseVal * 1000 : doseVal;

    if (doseInMcg > vialInMcg) {
      return {
        error: 'Requested dose exceeds the total peptide amount in the vial.',
        concentrationMgMl,
        concentrationMcgMl,
        concentrationMcgPerUnit,
        volToInjectMl: 0,
        unitsToInject: 0,
        doseInMcg,
        vialInMcg,
        unitsInVial: waterMl * 100
      };
    }

    const volToInjectMl = doseInMcg / concentrationMcgMl;
    const unitsToInject = volToInjectMl * 100;
    const unitsInVial = waterMl * 100;

    return {
      error: null,
      concentrationMgMl,
      concentrationMcgMl,
      concentrationMcgPerUnit,
      volToInjectMl,
      unitsToInject,
      doseInMcg,
      vialInMcg,
      unitsInVial
    };
  }, [vialSize, waterAdded, desiredDose, doseUnit]);

  // Handle unit conversions on change to preserve correct equivalent dose
  const handleUnitToggle = (targetUnit: 'mcg' | 'mg') => {
    if (targetUnit === doseUnit) return;
    const currentVal = parseFloat(desiredDose);
    if (!isNaN(currentVal)) {
      if (targetUnit === 'mg') {
        setDesiredDose((currentVal / 1000).toString());
      } else {
        setDesiredDose((currentVal * 1000).toString());
      }
    }
    setDoseUnit(targetUnit);
  };

  return (
    <div className="w-full bg-card border border-border rounded-2xl md:rounded-3xl p-5 md:p-8 text-slate-800 shadow-sm relative overflow-hidden" id="peptide-dosage-calculator">
      {/* Background design accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest font-bold">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span>Biochemical Calibration</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Peptide Dosage Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-650 mt-1">
            Accurate volumetric micro-dosing and insulin syringe calculations for lab-reagent reconstitution.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary p-1.5 px-3 rounded-full border border-border text-xs text-slate-700 self-start md:self-auto shadow-xs">
          <Calculator className="w-4 h-4 text-primary" />
          <span>Real-time Interactive Matrix</span>
        </div>
      </div>

      {/* Peptide Presets */}
      <div className="mb-6">
        <span className="block text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase mb-3.5">
          Select Popular Lab Formulations:
        </span>
        <div className="flex flex-wrap gap-2">
          {PEPTIDE_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => handleApplyPreset(p)}
              className="px-3.5 py-1.5 bg-background hover:bg-secondary hover:text-slate-900 border border-border text-slate-650 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>🧪</span>
              <span>{p.name}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setVialSize('5');
              setWaterAdded('2');
              setDesiredDose('250');
              setDoseUnit('mcg');
            }}
            className="px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-lg text-xs font-bold transition cursor-pointer"
          >
            Reset Custom
          </button>
        </div>
      </div>

      {/* Dual Panel Grid */}
      <div className={isSidebar ? "grid grid-cols-1 gap-6" : "grid grid-cols-1 lg:grid-cols-12 gap-8"}>
        
        {/* Left Side: Parameters Input */}
        <div className={isSidebar ? "space-y-5" : "lg:col-span-5 space-y-5"}>
          <div className="bg-secondary/40 p-4 sm:p-5 rounded-2xl border border-border space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-border pb-2">
              <Droplets className="w-4 h-4 text-primary" />
              <span>Input Parameters</span>
            </h3>

            {/* Input 1: Vial Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  1. Peptide Vial Size (mg)
                  <button 
                    onClick={() => setActiveTooltip(activeTooltip === 'vial' ? null : 'vial')}
                    className="text-slate-400 hover:text-slate-600 transition"
                    type="button"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                <span className="text-[10px] font-mono text-slate-500 bg-background border border-border px-1.5 py-0.5 rounded">
                  e.g., 5mg, 10mg
                </span>
              </div>
              
              {activeTooltip === 'vial' && (
                <div className="bg-primary/5 border border-primary/15 text-primary p-2.5 rounded-lg text-xs leading-relaxed mb-1.5">
                  The total dry powder weight printed on your peptide vial label. Usually expressed in milligrams (mg).
                </div>
              )}

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={vialSize}
                  onChange={(e) => setVialSize(e.target.value)}
                  className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none text-slate-800 transition placeholder-slate-400"
                  placeholder="Total milligrams (e.g. 5)"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-mono font-bold text-slate-400">
                  MG
                </span>
              </div>
            </div>

            {/* Input 2: Water Added */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  2. Bacteriostatic Water (mL)
                  <button 
                    onClick={() => setActiveTooltip(activeTooltip === 'water' ? null : 'water')}
                    className="text-slate-400 hover:text-slate-600 transition"
                    type="button"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                <div className="flex items-center gap-1">
                  {['1', '2', '2.5', '3'].map((vol) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setWaterAdded(vol)}
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded transition cursor-pointer ${
                        waterAdded === vol 
                          ? 'bg-primary text-white' 
                          : 'bg-background text-slate-500 hover:bg-secondary border border-border'
                      }`}
                    >
                      {vol}mL
                    </button>
                  ))}
                </div>
              </div>

              {activeTooltip === 'water' && (
                <div className="bg-primary/5 border border-primary/15 text-primary p-2.5 rounded-lg text-xs leading-relaxed mb-1.5">
                  The volume of sterile bacteriostatic water added to the vial to dissolve the powder. Usually 1mL to 3mL.
                </div>
              )}

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={waterAdded}
                  onChange={(e) => setWaterAdded(e.target.value)}
                  className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none text-slate-800 transition placeholder-slate-400"
                  placeholder="Water volume added (e.g. 2)"
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-mono font-bold text-slate-400">
                  ML
                </span>
              </div>
            </div>

            {/* Input 3: Desired Dose */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                  3. Desired Dose Input
                  <button 
                    onClick={() => setActiveTooltip(activeTooltip === 'dose' ? null : 'dose')}
                    className="text-slate-400 hover:text-slate-600 transition"
                    type="button"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                  </button>
                </label>
                
                {/* Unit selector switch */}
                <div className="inline-flex rounded-lg bg-background p-0.5 border border-border shadow-xs">
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('mcg')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase transition cursor-pointer ${
                      doseUnit === 'mcg'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    mcg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('mg')}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase transition cursor-pointer ${
                      doseUnit === 'mg'
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    mg
                  </button>
                </div>
              </div>

              {activeTooltip === 'dose' && (
                <div className="bg-primary/5 border border-primary/15 text-primary p-2.5 rounded-lg text-xs leading-relaxed mb-1.5">
                  The target scientific dose you wish to extract per injection. Choose Micrograms (mcg) or Milligrams (mg). (1 mg = 1000 mcg).
                </div>
              )}

              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={desiredDose}
                  onChange={(e) => setDesiredDose(e.target.value)}
                  className="w-full bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary/20 rounded-xl px-3.5 py-2.5 text-sm font-semibold outline-none text-slate-800 transition placeholder-slate-400"
                  placeholder={`Desired dose in ${doseUnit}`}
                />
                <span className="absolute right-3.5 top-2.5 text-xs font-mono font-bold text-slate-400 uppercase">
                  {doseUnit}
                </span>
              </div>
              
              {/* Intelligent dosage shortcuts */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Quick Doses:</span>
                {doseUnit === 'mcg' ? (
                  ['100', '250', '300', '500'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDesiredDose(val)}
                      className="text-[9px] font-mono font-semibold bg-background border border-border hover:border-primary/50 px-1.5 py-0.2 rounded transition text-slate-550 hover:text-primary cursor-pointer font-bold"
                    >
                      {val}mcg
                    </button>
                  ))
                ) : (
                  ['0.25', '0.5', '1', '2.5'].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setDesiredDose(val)}
                      className="text-[9px] font-mono font-semibold bg-background border border-border hover:border-primary/50 px-1.5 py-0.2 rounded transition text-slate-550 hover:text-primary cursor-pointer font-bold"
                    >
                      {val}mg
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Switch option: Insulin syringe toggle */}
            <div className="pt-2 border-t border-border">
              <label className="flex items-center justify-between cursor-pointer group select-none">
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <Syringe className="w-4 h-4 text-primary" />
                    Standard U-100 Insulin Syringe
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                    1 mL syringe capacity = 100 graduation units
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isInsulinSyringe}
                    onChange={(e) => setIsInsulinSyringe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-slate-200 border border-border rounded-full peer peer-focus:ring-1 peer-focus:ring-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-slate-400 peer-checked:after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary peer-checked:border-primary" />
                </div>
              </label>
            </div>

          </div>

          {/* Quick Warning / Tip Block */}
          <div className="bg-secondary/40 rounded-2xl border border-border p-4 flex gap-3 text-xs text-slate-600">
            <Info className="w-5 h-5 text-primary flex-shrink-0" />
            <div className="leading-relaxed">
              <strong className="text-slate-800 font-bold">Sterility Standard:</strong> Ensure the top of the vial is wiped clean with sterile alcohol preparation pads before reconstitution. Rest reconstituted peptides strictly inside cold storage temperatures.
            </div>
          </div>
        </div>

        {/* Right Side: Outputs & Realtime Syringe Visualisation */}
        <div className={isSidebar ? "space-y-6" : "lg:col-span-7 space-y-6"}>
          
          {calculations.error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-center space-y-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-105 text-red-500 text-lg font-bold">⚠️</span>
              <h3 className="font-bold text-slate-900">Incomplete Input Signal</h3>
              <p className="text-xs text-red-650 max-w-sm mx-auto leading-normal">
                {calculations.error}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Target Results Board */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Board Cell 1: Volumetric Draw */}
                <div className="bg-secondary/35 rounded-2xl p-4.5 border border-border flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      Calculated Injection Volume
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary mt-1 font-mono">
                      {calculations.volToInjectMl.toFixed(3)}
                      <span className="text-base text-slate-500 font-sans font-medium ml-1">
                        mL
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal mt-2.5">
                    The absolute volume of reconstituted fluid to draw from the vial.
                  </p>
                </div>

                {/* Board Cell 2: Insulin Units (If standard syringe enabled) */}
                {isInsulinSyringe && (
                  <div className="bg-primary/5 rounded-2xl p-4.5 border border-primary/15 flex flex-col justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                        Insulin Syringe Graduation
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1 font-mono">
                        {calculations.unitsToInject.toFixed(1)}
                        <span className="text-base text-primary font-sans font-medium ml-1">
                          Units
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-normal mt-2.5">
                      Draw back the plunger exactly to the <strong className="font-semibold text-primary">{calculations.unitsToInject.toFixed(1)} Unit mark</strong>.
                    </p>
                  </div>
                )}

              </div>

              {/* Dynamic Syringe Visualizer */}
              {isInsulinSyringe && (
                <div className="bg-secondary/20 p-5 rounded-2xl border border-border space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase flex items-center gap-2">
                      <Syringe className="w-4 h-4 text-primary" />
                      Interactive Syringe Gradient Indicator
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">
                      U-100 (100 units = 1mL Cylinder)
                    </span>
                  </div>

                  {/* HTML/SVG Syringe Representation */}
                  <div className="relative pt-6 pb-2 px-1">
                    <div className="relative w-full h-11 bg-background rounded border border-border flex items-center shadow-inner">
                      
                      {/* Needle Connector Hub Left */}
                      <div className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3 bg-slate-350 border-r border-slate-250 rounded-l-sm" />
                      {/* Metal Needle Left */}
                      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-6.5 h-0.5 bg-slate-400" />

                      {/* Syringe Volume Fill (Burgundy liquid color representing the peptide solution) */}
                      <div 
                        className="h-full bg-gradient-to-r from-primary/15 to-primary/30 relative border-r-2 border-primary flex items-center justify-end overflow-hidden transition-all duration-500 ease-out"
                        style={{ width: `${Math.min(100, (calculations.unitsToInject / 100) * 100)}%` }}
                      >
                        {/* Dynamic fluid bubble animation */}
                        <div className="absolute top-1 right-2 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
                        <span className="text-[9px] font-mono text-primary pr-2 select-none uppercase font-bold tracking-widest hidden sm:inline">
                          Peptide Volume
                        </span>
                      </div>

                      {/* Cylinder Graduations (0 to 100 units) */}
                      <div className="absolute inset-x-0 inset-y-0 flex justify-between px-2 select-none pointer-events-none">
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((unit, idx) => {
                          const isCalculatedUnitClose = Math.abs(calculations.unitsToInject - unit) < 5;
                          return (
                            <div key={unit} className="flex flex-col justify-between items-center h-full relative py-0.5">
                              {/* Graduation Tick */}
                              <div className={`w-0.5 ${unit % 50 === 0 ? 'h-3.5 bg-slate-400' : 'h-2 bg-slate-300'}`} />
                              {/* Unit number */}
                              {unit % 20 === 0 && (
                                <span className="text-[8px] font-mono text-slate-500 -mt-1.5">{unit}</span>
                              )}
                              {/* Indicator dot if calculations match this area */}
                              {isCalculatedUnitClose && (
                                <div className="absolute -top-4 w-1.5 h-1.5 bg-primary rounded-full shadow-xs" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Plunger Rod representation on the right side */}
                      <div 
                        className="h-full bg-slate-200 border-l border-slate-350 transition-all duration-500 ease-out flex items-center justify-center"
                        style={{ width: `${100 - Math.min(100, (calculations.unitsToInject / 100) * 100)}%` }}
                      >
                        <div className="w-full h-2 bg-slate-300/80" />
                      </div>

                      {/* Plunger Thumb Rest Right */}
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3 h-14 bg-slate-300 border border-slate-400 rounded-sm" />
                    </div>

                    {/* Annotation callout */}
                    <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
                      <span>Needle Pin (Sub-Q)</span>
                      <span className="text-primary font-bold">
                        Target Selection: {calculations.unitsToInject.toFixed(1)} Units
                      </span>
                      <span>Plunger Pull</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step-by-Step Analytical Breakdown */}
              <div className="bg-secondary/35 rounded-2xl p-5 border border-border space-y-3.5 shadow-xs">
                <h4 className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  Calculation Logic Matrix
                </h4>

                <div className="space-y-3 text-xs text-slate-700 font-sans leading-relaxed">
                  
                  {/* Step 1 */}
                  <div className="flex items-start gap-2.5 pb-2.5 border-b border-border">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background border border-border text-[10px] font-mono text-primary font-bold mt-0.5 shadow-xs">
                      1
                    </span>
                    <div>
                      <p className="font-semibold text-slate-850">Convert Vial & Determine Solution Density</p>
                      <p className="text-slate-600 mt-0.5">
                        Your vial has <strong className="text-slate-800 font-mono font-bold">{vialSize} mg</strong>. 
                        In micrograms (mcg), this is: <code className="bg-background border border-border px-1 py-0.5 rounded font-mono text-primary font-bold">{calculations.vialInMcg.toLocaleString()} mcg</code>.
                      </p>
                      <p className="text-slate-600 mt-1">
                        Dissolved in <strong className="text-slate-800 font-mono font-bold">{waterAdded} mL</strong> of water, the concentration is calculated as:
                        <br />
                        <code className="bg-background border border-border px-1.5 py-0.5 rounded font-mono text-slate-700 text-[11px] block mt-1 select-all shadow-inner">
                          {vialSize}mg / {waterAdded}mL = {calculations.concentrationMgMl.toFixed(2)} mg/mL ({calculations.concentrationMcgMl.toLocaleString({maximumFractionDigits: 1})} mcg/mL)
                        </code>
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  {isInsulinSyringe && (
                    <div className="flex items-start gap-2.5 pb-2.5 border-b border-border">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background border border-border text-[10px] font-mono text-primary font-bold mt-0.5 shadow-xs">
                        2
                      </span>
                      <div>
                        <p className="font-semibold text-slate-850 font-sans">Formulate Syringe Graduation Factor</p>
                        <p className="text-slate-600 mt-0.5">
                          Since 1 mL of U-100 contains exactly 100 graduation lines (units):
                        </p>
                        <p className="text-slate-600 mt-1">
                          The dose weight inside a single unit tick mark is:
                          <br />
                          <code className="bg-background border border-border px-1.5 py-0.5 rounded font-mono text-slate-700 text-[11px] block mt-1 select-all shadow-inner">
                            {calculations.concentrationMcgMl.toLocaleString({maximumFractionDigits: 1})} mcg/mL / 100 Units = {calculations.concentrationMcgPerUnit.toFixed(1)} mcg per Unit
                          </code>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3 */}
                  <div className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-background border border-border text-[10px] font-mono text-primary font-bold mt-0.5 shadow-xs">
                      {isInsulinSyringe ? '3' : '2'}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-850 font-sans">Final Target Draw Calculation</p>
                      <p className="text-slate-600 mt-0.5">
                        To receive your target research dose of <strong className="text-slate-800 font-extrabold">{desiredDose} {doseUnit}</strong>:
                      </p>
                      
                      <div className="mt-1.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 bg-background border border-border p-2 rounded text-[11px] font-mono shadow-xs">
                          <ChevronRight className="w-3.5 h-3.5 text-primary" />
                          <span>Volumetric Fluid:</span>
                          <span className="text-primary font-extrabold">{calculations.volToInjectMl.toFixed(3)} mL</span>
                        </div>
                        {isInsulinSyringe && (
                          <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/10 p-2 rounded text-[11px] font-mono shadow-xs">
                            <Check className="w-3.5 h-3.5 text-primary animate-bounce" />
                            <span>Insulin Indicator:</span>
                            <span className="text-slate-850 font-extrabold">{calculations.unitsToInject.toFixed(1)} Graduation Units</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
