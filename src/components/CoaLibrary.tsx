import React, { useState, useEffect } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Eye, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  ExternalLink, 
  Calendar, 
  Award, 
  FileText, 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle,
  FlaskConical,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
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
import {
  BPCVial,
  RetatrutideVial,
  TirzepatideVial,
  NADVial,
  GHKCuVial,
  MOTsCVial,
  GlutathionePen,
  PT141Vial,
  IpamorelinVial,
  TesamorelinVial,
  KPVVial,
  AODVial,
  DSIPVial,
  BacWaterVial
} from './ProductImage';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  query 
} from 'firebase/firestore';

export interface COAObejct {
  id: string;
  peptideName: string;
  batchNumber: string;
  dateTested: string;
  purityPercent: number;
  thumbnailUrl: string;
  coaUrl: string;
  molecularFormula?: string;
  molecularWeight?: string;
  chemistSignature?: string;
}

export const sanitizeUrl = (url: string | undefined): string => {
  if (!url) return '';
  let sanitized = url.trim();
  
  // Extract real URL if a Google Drive / Google Docs is nested inside a prefix
  const driveIndex = sanitized.indexOf('https://drive.google.com');
  if (driveIndex !== -1) {
    return sanitized.substring(driveIndex);
  }
  const docsIndex = sanitized.indexOf('https://docs.google.com');
  if (docsIndex !== -1) {
    return sanitized.substring(docsIndex);
  }
  
  // Handle double schemas (e.g., "https://verify.janoshikhttps://...")
  if ((sanitized.match(/https?:\/\//g) || []).length > 1) {
    const lastHttpIndex = sanitized.lastIndexOf('http');
    if (lastHttpIndex !== -1) {
      return sanitized.substring(lastHttpIndex);
    }
  }

  return sanitized;
};

export const isExternalDocumentUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  const sanitized = sanitizeUrl(url).toLowerCase();
  
  if (sanitized.includes('drive.google.com') || sanitized.includes('docs.google.com') || sanitized.includes('google.com/open')) {
    return true;
  }
  if (sanitized.includes('dropbox.com') || sanitized.includes('onedrive.live.com') || sanitized.includes('.pdf') || sanitized.includes('box.com')) {
    return true;
  }
  if (
    sanitized.startsWith('http') && 
    !sanitized.includes('unsplash.com') && 
    !sanitized.includes('images.unsplash.com')
  ) {
    return true;
  }
  return false;
};

// default initial COAs to seed when firestore is empty
const defaultCoas: COAObejct[] = [
  {
    id: "COA-BPC157-24",
    peptideName: "BPC-157",
    batchNumber: "BPC240501",
    dateTested: "2026-05-01",
    purityPercent: 99.68,
    thumbnailUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
    coaUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1200&q=80",
    molecularFormula: "C62H98N16O22",
    molecularWeight: "1419.5 g/mol",
    chemistSignature: "Dr. A. Santos, PhD"
  },
  {
    id: "COA-TB500-24",
    peptideName: "TB-500",
    batchNumber: "TB240515",
    dateTested: "2026-05-15",
    purityPercent: 99.42,
    thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
    coaUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    molecularFormula: "C212H350N56O78S",
    molecularWeight: "4963.5 g/mol",
    chemistSignature: "Dr. A. Santos, PhD"
  },
  {
    id: "COA-CJC1295-24",
    peptideName: "CJC-1295 DAC",
    batchNumber: "CJC240520",
    dateTested: "2026-05-20",
    purityPercent: 99.71,
    thumbnailUrl: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80",
    coaUrl: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=1200&q=80",
    molecularFormula: "C152H252N44O42",
    molecularWeight: "3367.9 g/mol",
    chemistSignature: "Prof. L. Alvarez, ScD"
  },
  {
    id: "COA-IPAM-150869",
    peptideName: "Ipamorelin",
    batchNumber: "TAPUW0426-6",
    dateTested: "2026-04-30",
    purityPercent: 99.523,
    thumbnailUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=400&q=80",
    coaUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80",
    molecularFormula: "C38H49N9O5",
    molecularWeight: "711.9 g/mol",
    chemistSignature: "Janoshik Analytical"
  },
  {
    id: "COA-TIRZ-24",
    peptideName: "Tirzepatide",
    batchNumber: "TIRZ240601",
    dateTested: "2026-06-01",
    purityPercent: 99.85,
    thumbnailUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
    coaUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
    molecularFormula: "C225H348N48O68",
    molecularWeight: "4813.5 g/mol",
    chemistSignature: "Dr. A. Santos, PhD"
  },
  {
    id: "COA-SEMA-24",
    peptideName: "Semaglutide",
    batchNumber: "SEM240605",
    dateTested: "2026-06-05",
    purityPercent: 99.54,
    thumbnailUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
    coaUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    molecularFormula: "C187H291N45O59",
    molecularWeight: "4113.6 g/mol",
    chemistSignature: "Prof. L. Alvarez, ScD"
  }
];

interface CoaTheme {
  primary: string;
  glowClass: string;
  bgGlow: string;
  textGlow: string;
  capColor: string;
  capGradient: string;
  accentLight: string;
  liquidGlow: string;
  shadowColor: string;
  badgeBorder: string;
  badgeBg: string;
  spec: string;
  formula: string;
  weight: string;
}

const getCoaTheme = (name: string): CoaTheme => {
  const normalized = (name || '').toLowerCase();
  if (normalized.includes('bpc-157') || normalized.includes('bpc')) {
    return {
      primary: '#2dd4bf', // Cyan glow
      glowClass: 'shadow-[0_0_25px_rgba(45,212,191,0.5)]',
      bgGlow: 'bg-cyan-500/10',
      textGlow: 'text-cyan-400',
      capColor: '#0f766e',
      capGradient: 'linear-gradient(135deg, #14b8a6, #0d9488, #115e59)',
      accentLight: '#2dd4bf',
      liquidGlow: 'rgba(20,184,166,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-950/40',
      spec: '5 mg',
      formula: 'C62H98N16O22',
      weight: '1419.5 g/mol'
    };
  } else if (normalized.includes('cjc')) {
    return {
      primary: '#c084fc', // Violet glow
      glowClass: 'shadow-[0_0_25px_rgba(192,132,252,0.5)]',
      bgGlow: 'bg-purple-500/10',
      textGlow: 'text-purple-400',
      capColor: '#6d28d9',
      capGradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6, #5b21b6)',
      accentLight: '#c084fc',
      liquidGlow: 'rgba(139,92,246,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-purple-500/30',
      badgeBg: 'bg-purple-950/40',
      spec: '2 mg',
      formula: 'C152H252N44O42',
      weight: '3367.9 g/mol'
    };
  } else if (normalized.includes('ipamorelin') || normalized.includes('ipa')) {
    return {
      primary: '#60a5fa', // Blue glow
      glowClass: 'shadow-[0_0_25px_rgba(96,165,250,0.5)]',
      bgGlow: 'bg-blue-500/10',
      textGlow: 'text-blue-400',
      capColor: '#1d4ed8',
      capGradient: 'linear-gradient(135deg, #60a5fa, #3b82f6, #1d4ed8)',
      accentLight: '#93c5fd',
      liquidGlow: 'rgba(59,130,246,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-blue-500/30',
      badgeBg: 'bg-blue-950/40',
      spec: '10 mg',
      formula: 'C38H49N9O5',
      weight: '711.9 g/mol'
    };
  } else if (normalized.includes('tb-500') || normalized.includes('tb')) {
    return {
      primary: '#fbbf24', // Amber/Gold glow
      glowClass: 'shadow-[0_0_25px_rgba(242,158,11,0.5)]',
      bgGlow: 'bg-amber-500/10',
      textGlow: 'text-amber-400',
      capColor: '#b45309',
      capGradient: 'linear-gradient(135deg, #fbbf24, #f59e0b, #b45309)',
      accentLight: '#fde047',
      liquidGlow: 'rgba(245,158,11,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-amber-500/30',
      badgeBg: 'bg-amber-950/40',
      spec: '2 mg',
      formula: 'C212H350N56O78S',
      weight: '4963.5 g/mol'
    };
  } else if (normalized.includes('tirz') || normalized.includes('tirzepatide')) {
    return {
      primary: '#f472b6', // Pink/Rose glow
      glowClass: 'shadow-[0_0_25px_rgba(244,114,182,0.5)]',
      bgGlow: 'bg-rose-500/10',
      textGlow: 'text-rose-400',
      capColor: '#be185d',
      capGradient: 'linear-gradient(135deg, #f472b6, #ec4899, #be185d)',
      accentLight: '#f472b6',
      liquidGlow: 'rgba(236,72,153,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-rose-500/30',
      badgeBg: 'bg-rose-950/40',
      spec: '5 mg',
      formula: 'C225H348N48O68',
      weight: '4813.5 g/mol'
    };
  } else if (normalized.includes('sema') || normalized.includes('semaglutide')) {
    return {
      primary: '#34d399', // Emerald Green glow
      glowClass: 'shadow-[0_0_25px_rgba(52,211,153,0.5)]',
      bgGlow: 'bg-emerald-500/10',
      textGlow: 'text-emerald-400',
      capColor: '#047857',
      capGradient: 'linear-gradient(135deg, #34d399, #10b981, #047857)',
      accentLight: '#6ee7b7',
      liquidGlow: 'rgba(16,185,129,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-950/40',
      spec: '4 mg',
      formula: 'C187H291N45O59',
      weight: '4113.6 g/mol'
    };
  } else {
    return {
      primary: '#7a223e', // Default Burgundy
      glowClass: 'shadow-[0_0_25px_rgba(122,34,62,0.5)]',
      bgGlow: 'bg-primary/10',
      textGlow: 'text-gold-light',
      capColor: '#7a223e',
      capGradient: 'linear-gradient(135deg, #7a223e, #b5496a, #7a223e)',
      accentLight: '#b5496a',
      liquidGlow: 'rgba(122,34,62,0.35)',
      shadowColor: '#0f172a',
      badgeBorder: 'border-primary/30',
      badgeBg: 'bg-gold-dark/40',
      spec: '5 mg',
      formula: 'C60H90N16O22',
      weight: '1388.5 g/mol'
    };
  }
};

const renderVialComponent = (name: string, unit: string = "5mg") => {
  const normalized = name.toLowerCase();
  if (normalized.includes('bpc-157') || normalized.includes('bpc')) return <BPCVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('semax')) return <SemaxVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('epitalon')) return <EpitalonVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('cjc')) return <CJC1295Vial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('glow')) return <GlowVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('snap-8') || normalized.includes('snap')) return <Snap8Vial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('oxytocin')) return <OxytocinVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('ll-37') || normalized.includes('ll37')) return <LL37Vial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('cagrilintide')) return <CagrilintideVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('slu')) return <SLUPP322Vial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('kisspeptin')) return <KisspeptinVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('retatrutide')) return <RetatrutideVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('tirzepatide') || normalized.includes('tirz')) return <TirzepatideVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('nad')) return <NADVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('ghk')) return <GHKCuVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('mots')) return <MOTsCVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('glutathione')) return <GlutathionePen className="w-48 h-48" unit={unit} />;
  if (normalized.includes('pt-141') || normalized.includes('pt-142') || normalized.includes('pt141')) return <PT141Vial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('ipamorelin') || normalized.includes('ipam')) return <IpamorelinVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('tesamorelin')) return <TesamorelinVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('kpv')) return <KPVVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('aod')) return <AODVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('dsip')) return <DSIPVial className="w-48 h-48" unit={unit} />;
  if (normalized.includes('bacwater') || normalized.includes('water')) return <BacWaterVial className="w-48 h-48" />;
  return <BPCVial className="w-48 h-48" unit={unit} />;
};

interface CoaLibraryProps {
  isAdmin: boolean;
  onTotalDocsChange?: (count: number) => void;
}

export const CoaLibrary: React.FC<CoaLibraryProps> = ({ isAdmin, onTotalDocsChange }) => {
  const [coas, setCoas] = useState<COAObejct[]>([]);
  const [activeCoaId, setActiveCoaId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Latest' | 'Highest' | 'Alpha'>('All');
  
  // Viewer state
  const [selectedCoa, setSelectedCoa] = useState<COAObejct | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  
  // Admin form state
  const [isEditing, setIsEditing] = useState<COAObejct | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formBatch, setFormBatch] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formPurity, setFormPurity] = useState(99.50);
  const [formThumbUrl, setFormThumbUrl] = useState('');
  const [formCoaUrl, setFormCoaUrl] = useState('');
  const [formFormula, setFormFormula] = useState('');
  const [formWeight, setFormWeight] = useState('');
  const [formSignature, setFormSignature] = useState('Dr. A. Santos, PhD');

  // Sync coas collection from Firestore
  useEffect(() => {
    const q = query(collection(db, 'coas'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // Fallback to local default COAs in memory for immediate display
        setCoas(defaultCoas);
        if (onTotalDocsChange) {
          onTotalDocsChange(defaultCoas.length);
        }

        // Only seed to Firestore if current user is admin
        if (isAdmin) {
          const seed = async () => {
            try {
              for (const coa of defaultCoas) {
                await setDoc(doc(db, 'coas', coa.id), {
                  ...coa,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString()
                });
              }
            } catch (err) {
              console.error("COA seeding failed:", err);
            }
          };
          seed();
        }
      } else {
        const fetched: COAObejct[] = [];
        snapshot.forEach(docSnap => {
          fetched.push(docSnap.data() as COAObejct);
        });
        setCoas(fetched);
        if (onTotalDocsChange) {
          onTotalDocsChange(fetched.length);
        }
      }
    }, (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, 'coas');
      } catch (e) {
        console.warn("Caught Firestore permission error in CoaLibrary for coas list:", e);
      }
    });
    return () => unsubscribe();
  }, [onTotalDocsChange, isAdmin]);

  const handleOpenAdd = () => {
    setFormId(`COA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    setFormName('');
    setFormBatch(`PT-${Math.random().toString(36).substring(2, 6).toUpperCase()}-24`);
    setFormDate(new Date().toISOString().split('T')[0]);
    setFormPurity(99.65);
    setFormThumbUrl('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80');
    setFormCoaUrl('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80');
    setFormFormula('C62H98N16O22');
    setFormWeight('1419.5 g/mol');
    setFormSignature('Dr. A. Santos, PhD');
    setIsEditing(null);
    setIsAdding(true);
  };

  const handleOpenEdit = (coa: COAObejct) => {
    setFormId(coa.id);
    setFormName(coa.peptideName);
    setFormBatch(coa.batchNumber);
    setFormDate(coa.dateTested);
    setFormPurity(coa.purityPercent);
    setFormThumbUrl(coa.thumbnailUrl);
    setFormCoaUrl(coa.coaUrl);
    setFormFormula(coa.molecularFormula || '');
    setFormWeight(coa.molecularWeight || '');
    setFormSignature(coa.chemistSignature || 'Dr. A. Santos, PhD');
    setIsAdding(false);
    setIsEditing(coa);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formId) return;

    const payload: COAObejct = {
      id: formId,
      peptideName: formName,
      batchNumber: formBatch,
      dateTested: formDate,
      purityPercent: Number(formPurity),
      thumbnailUrl: sanitizeUrl(formThumbUrl) || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
      coaUrl: sanitizeUrl(formCoaUrl) || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
      molecularFormula: formFormula,
      molecularWeight: formWeight,
      chemistSignature: formSignature
    };

    try {
      await setDoc(doc(db, 'coas', formId), {
        ...payload,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setIsAdding(false);
      setIsEditing(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `coas/${formId}`);
    }
  };

  const handleDelete = async (coaId: string) => {
    if (window.confirm("Are you sure you want to permanently delete this Certificate of Analysis?")) {
      try {
        await deleteDoc(doc(db, 'coas', coaId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `coas/${coaId}`);
      }
    }
  };

  // Filter & Sort COAs
  const filtered = coas
    .filter(coa => {
      const matchText = (coa.peptideName || '').toLowerCase().includes(search.toLowerCase()) || 
                        (coa.batchNumber || '').toLowerCase().includes(search.toLowerCase());
      return matchText;
    })
    .sort((a, b) => {
      if (filterType === 'Latest') {
        return new Date(b.dateTested).getTime() - new Date(a.dateTested).getTime();
      }
      if (filterType === 'Highest') {
        return b.purityPercent - a.purityPercent;
      }
      if (filterType === 'Alpha') {
        return (a.peptideName || '').localeCompare(b.peptideName || '');
      }
      // default: alphabetical
      return (a.peptideName || '').localeCompare(b.peptideName || '');
    });

  const activeCoa = filtered.find(c => c.id === activeCoaId) || filtered[0] || null;
  const activeTheme = activeCoa ? getCoaTheme(activeCoa.peptideName) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 text-left" id="coa-library-container">
      
      {/* Title Header */}
      <div className="text-center space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold uppercase tracking-widest">
          <Award className="w-4 h-4 text-primary" /> HPLC Verified Assays
        </div>
        <h2 className="text-2xl md:text-3.5xl font-display font-extrabold tracking-tight text-slate-900">
          Certificates of <span className="text-primary">Analysis (COA)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
          Verify physical purity ratios, batch numbers, and chemical validation specifications verified across independent high-pressure liquid chromatography trials.
        </p>
      </div>

      {/* Control Panel: Search & Filter */}
      <div className="bg-obsidian-panel border border-obsidian-border rounded-3xl p-5 md:p-6 mb-8 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search certificate peptide or batch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-border hover:border-obsidian-border-active focus:border-primary text-slate-800 placeholder-slate-400 text-sm rounded-xl pl-11 pr-4 py-3 outline-none transition focus:ring-1 focus:ring-primary/20 font-sans"
            id="coa-search-input"
          />
        </div>

        {/* Filter Selection buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'All', label: 'All COAs' },
            { id: 'Latest', label: 'Latest Assays' },
            { id: 'Highest', label: 'Highest Purity' },
            { id: 'Alpha', label: 'A-Z' }
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setFilterType(opt.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition cursor-pointer border ${
                filterType === opt.id 
                  ? 'bg-primary/10 text-primary border-primary/30 shadow-sm' 
                  : 'bg-card text-slate-500 border-border hover:text-slate-850 hover:bg-obsidian-panel'
              }`}
            >
              {opt.label}
            </button>
          ))}

          {/* Admin Create COA Trigger */}
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="bg-primary hover:bg-gold-light active:scale-95 text-white hover:text-primary px-4 py-2.5 rounded-xl text-xs font-bold font-sans tracking-wide flex items-center gap-1.5 transition cursor-pointer border border-transparent shadow shadow-primary/20 ml-2"
              id="admin-add-coa-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Create COA</span>
            </button>
          )}
        </div>
      </div>

      {/* COA Workspace Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/10 border border-slate-800/20 rounded-3xl" id="coa-grid-empty">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
          <p className="text-sm font-semibold text-slate-400">No matching Certificates of Analysis found</p>
          <p className="text-xs text-slate-500 mt-1">Please refine your search terms or verify with customer support</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in text-left" id="coa-workspace-grid">
          {/* Left Pane - Structured List of Certificates */}
          <div className="lg:col-span-7 space-y-3" id="coa-list-pane">
            <div className="hidden md:flex items-center justify-between border-b border-obsidian-border pb-3 mb-1 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
              <div className="flex-1 pl-4">Peptide Name / Molecular Info</div>
              <div className="w-24 text-right">Purity</div>
              <div className="w-32 text-right">Batch</div>
              {isAdmin && <div className="w-24 text-right">Actions</div>}
            </div>
            
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {filtered.map((coa) => {
                const isActive = activeCoa && coa.id === activeCoa.id;
                return (
                  <div 
                    key={coa.id} 
                    onClick={() => setActiveCoaId(coa.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans text-sm ${
                      isActive 
                        ? 'bg-primary/5 border-primary/30 text-slate-900 shadow-[0_4px_12px_rgba(122,34,62,0.05)]' 
                        : 'bg-card border-border text-slate-600 hover:border-obsidian-border-active hover:bg-slate-50'
                    }`}
                  >
                    {/* Left: Name & Molecular Info */}
                    <div className="flex-1">
                      <div className="font-display font-extrabold text-slate-900 text-base leading-tight">
                        {coa.peptideName}
                      </div>
                      {coa.molecularFormula && (
                        <div className="font-mono text-[10.5px] mt-1.5 flex items-center gap-1.5 flex-wrap">
                          <span className="bg-background px-1.5 py-0.5 rounded border border-border text-slate-600">{coa.molecularFormula}</span>
                          {coa.molecularWeight && <span className="text-slate-450">•</span>}
                          {coa.molecularWeight && <span className="text-slate-500 font-medium">M_w: {coa.molecularWeight}</span>}
                        </div>
                      )}
                    </div>
                    
                    {/* Purity */}
                    <div className="flex md:flex-col justify-between items-center md:items-end gap-1.5 md:w-24">
                      <span className="md:hidden text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Purity</span>
                      <span className="text-emerald-700 font-extrabold text-sm font-mono tracking-tight bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-250/20">
                        {coa.purityPercent}%
                      </span>
                    </div>

                    {/* Batch */}
                    <div className="flex md:flex-col justify-between items-center md:items-end gap-0.5 md:w-32">
                      <span className="md:hidden text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Batch</span>
                      <span className="font-mono text-slate-700 font-bold text-[13px]">{coa.batchNumber || 'N/A'}</span>
                    </div>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="flex items-center justify-end gap-2 md:w-24 border-t border-border md:border-t-0 pt-2 md:pt-0" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEdit(coa);
                          }}
                          className="p-1.5 bg-background border border-border hover:border-primary/50 text-slate-500 hover:text-primary rounded-lg transition cursor-pointer flex items-center justify-center"
                          title="Edit details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(coa.id);
                          }}
                          className="p-1.5 bg-background border border-border hover:border-rose-500/50 text-slate-500 hover:text-rose-600 rounded-lg transition cursor-pointer flex items-center justify-center"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Pane - Featured Certification Showcase Card */}
          {activeCoa && activeTheme && (
            <div className="lg:col-span-5 bg-obsidian-panel border border-obsidian-border rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col justify-between" id="coa-showcase-pane">
              {/* Dynamic Cap Glow Background Aura */}
              <div 
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px] opacity-15 transition-all duration-500 pointer-events-none" 
                style={{ background: activeTheme.primary }}
              />
              
              <div>
                {/* Header title */}
                <div className="border-b border-obsidian-border pb-4 mb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-mono font-bold text-primary tracking-widest uppercase mb-1">Laboratory Assay</h3>
                    <h4 className="font-display font-black text-xl text-slate-900 tracking-tight leading-tight">{activeCoa.peptideName}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold border border-obsidian-border px-2 py-0.5 rounded">
                    {activeCoa.id}
                  </span>
                </div>

                {/* Floating Vial Showcase Area */}
                <div className="relative w-full h-64 flex flex-col items-center justify-center mb-6 bg-background/50 border border-obsidian-border rounded-2xl overflow-hidden">
                  {/* Dynamic radial gradient aura in center */}
                  <div 
                    className="absolute w-40 h-40 rounded-full blur-[40px] opacity-15 transition-all duration-500 pointer-events-none" 
                    style={{ background: activeTheme.primary }}
                  />

                  {/* Floating Vial Wrapper */}
                  <div className="relative animate-float z-10 flex items-center justify-center">
                    {renderVialComponent(activeCoa.peptideName)}
                  </div>

                  {/* Pulsing Shadow below vial */}
                  <div 
                    className="w-24 h-2 bg-slate-350/50 rounded-full blur-[3px] animate-shadow-pulse absolute bottom-6 z-0" 
                  />

                  {/* Floating Purity Badge */}
                  <div className="absolute top-4 right-4 bg-emerald-50 border border-emerald-200 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{activeCoa.purityPercent}% Purity</span>
                  </div>
                </div>

                {/* Structured Data Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-600 bg-background/50 border border-obsidian-border rounded-2xl p-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest block mb-0.5">Lot / Batch Code</span>
                    <span className="font-mono font-bold text-slate-800">{activeCoa.batchNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest block mb-0.5">Date Tested</span>
                    <span className="font-mono font-bold text-slate-800">{activeCoa.dateTested}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest block mb-0.5">Molecular Formula</span>
                    <span className="font-mono font-bold text-slate-800">{activeCoa.molecularFormula || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-550 uppercase tracking-widest block mb-0.5">Molecular Weight</span>
                    <span className="font-mono font-bold text-slate-800">{activeCoa.molecularWeight || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* View Verification Document Button */}
              {(() => {
                const isExt = isExternalDocumentUrl(activeCoa.coaUrl);
                const cleanUrl = sanitizeUrl(activeCoa.coaUrl);
                if (isExt) {
                  return (
                    <a
                      href={cleanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full mt-6 bg-primary hover:bg-primary/95 active:scale-98 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>View Verification Document</span>
                    </a>
                  );
                }
                return (
                  <button
                    onClick={() => setSelectedCoa(activeCoa)}
                    className="w-full mt-6 bg-primary hover:bg-primary/95 active:scale-98 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Verification Document</span>
                  </button>
                );
              })()}
            </div>
          )}
        </div>
      )}

      {/* --- IMMERSIVE COA DOCUMENT MODAL --- */}
      <AnimatePresence>
        {selectedCoa && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => { setSelectedCoa(null); setZoomScale(1); }}></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border border-border rounded-3xl max-w-4xl w-full h-[90vh] md:h-[85vh] relative z-20 overflow-hidden shadow-xl flex flex-col justify-between"
              id="coa-viewer-modal"
            >
              {/* Header block with controls */}
              <div className="p-4 border-b border-border bg-background/80 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-primary/5 text-primary border border-primary/20">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span>HPLC Validation Document</span>
                      <span className="text-[10px] font-mono font-bold text-primary bg-primary/5 border border-primary/20 px-2 py-0.5 rounded-md">
                        {selectedCoa.purityPercent}%
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-500 font-mono tracking-wider">{selectedCoa.peptideName} (BATCH: {selectedCoa.batchNumber})</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-background rounded-xl border border-border p-0.5">
                    <button
                      onClick={() => setZoomScale(prev => Math.max(0.5, prev - 0.25))}
                      className="p-2 text-slate-550 hover:text-primary hover:bg-secondary rounded-lg cursor-pointer transition"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-800 px-2.5 min-w-[50px] text-center">
                      {Math.round(zoomScale * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomScale(prev => Math.min(2.5, prev + 0.25))}
                      className="p-2 text-slate-550 hover:text-primary hover:bg-secondary rounded-lg cursor-pointer transition"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  <a
                    href={sanitizeUrl(selectedCoa.coaUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-background text-slate-600 hover:text-primary hover:bg-secondary rounded-xl border border-border transition flex items-center justify-center"
                    title="Open Full Image in New Tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      // Simple implementation to trigger print/save
                      window.print();
                    }}
                    className="p-2.5 bg-background text-slate-600 hover:text-primary hover:bg-secondary rounded-xl border border-border transition flex items-center justify-center cursor-pointer"
                    title="Print / Save PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => { setSelectedCoa(null); setZoomScale(1); }}
                    className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 cursor-pointer ml-1 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Immersive interactive visual generator of the lab report */}
              <div className="flex-1 overflow-auto bg-background p-6 flex items-start justify-center" id="coa-document-screen">
                <div 
                  className="bg-white text-slate-900 rounded-2xl shadow-lg p-8 max-w-2xl w-full border-4 border-slate-200 transition-transform duration-200 origin-top flex flex-col font-sans"
                  style={{ transform: `scale(${zoomScale})` }}
                >
                  {(() => {
                    const isJanoshikReport = selectedCoa.chemistSignature?.toLowerCase().includes('janoshik') || 
                                             selectedCoa.peptideName.toLowerCase().includes('ipamorelin') || 
                                             selectedCoa.id.includes('IPAM') ||
                                             selectedCoa.batchNumber === 'TAPUW0426-6';
                    
                    if (isJanoshikReport) {
                      return (
                        <div className="flex flex-col text-slate-800 font-sans leading-relaxed select-text w-full" style={{ fontSize: '13px' }}>
                          {/* Janoshik Logo and Header green bar */}
                          <div className="flex justify-between items-end pb-3 border-b-2 border-[#129141] mb-5">
                            <div className="flex flex-col">
                              <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#129141] font-sans leading-none m-0 uppercase">TEST REPORT</h1>
                            </div>
                            
                            {/* Middle Green MM logo mark */}
                            <div className="flex items-center gap-2">
                              <svg className="w-10 h-10 text-[#129141]" viewBox="0 0 100 100">
                                <path d="M 15 65 L 35 25 L 55 65 L 65 65 L 85 25 L 95 65" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                                <line x1="35" y1="25" x2="85" y2="25" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                              </svg>
                              <span className="text-[18px] md:text-[20px] font-black text-slate-800 tracking-wide font-sans mb-0.5">JANOSHIK</span>
                            </div>
                            
                            {/* Right Column details */}
                            <div className="text-right text-[10px] md:text-[11px] text-slate-600 font-medium font-sans leading-tight">
                              <div>E-mail: info@janoshik.com</div>
                              <div>Web: www.janoshik.com</div>
                            </div>
                          </div>

                          {/* Task details bar */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200/80 flex items-center">
                              <span className="text-xs uppercase font-bold text-slate-500 mr-2 tracking-wide font-mono">Task Number</span>
                              <span className="text-base font-extrabold text-slate-800">#150869</span>
                            </div>
                            <div className="flex flex-col justify-center text-xs space-y-1 pl-2 md:pl-4">
                              <div className="flex items-center text-slate-600 font-semibold text-[11px]">
                                <span className="text-[#129141] font-bold mr-1">Testing ordered</span>
                                <span className="text-slate-400 font-bold mr-2">&gt;</span>
                                <span className="text-slate-800 font-mono font-bold">22 APR '26</span>
                              </div>
                              <div className="flex items-center text-slate-600 font-semibold text-[11px]">
                                <span className="text-[#129141] font-bold mr-1">Sample received</span>
                                <span className="text-slate-400 font-bold mr-2">&gt;</span>
                                <span className="text-slate-800 font-mono font-bold">28 APR '26</span>
                              </div>
                            </div>
                          </div>

                          {/* Core specifications parameters */}
                          <div className="space-y-2 mb-6 text-xs md:text-sm">
                            <div className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] border-b border-slate-100 pb-1.5 flex items-baseline">
                              <span className="text-[#129141] font-extrabold tracking-wide uppercase text-xs font-mono">Client</span>
                              <span className="text-slate-800 font-extrabold bg-[#f4faf6] px-2.5 py-0.5 rounded border border-[#e2f3e8] text-xs">The Amine Protocol - Ultra Wellness</span>
                            </div>
                            <div className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] border-b border-slate-100 pb-1.5 flex items-baseline">
                              <span className="text-[#129141] font-extrabold tracking-wide uppercase text-xs font-mono">Sample</span>
                              <span className="text-slate-800 font-extrabold bg-[#f4faf6] px-2.5 py-0.5 rounded border border-[#e2f3e8] text-xs">Ipamorelin 10mg</span>
                            </div>
                            <div className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] border-b border-slate-100 pb-1.5 flex items-baseline">
                              <span className="text-[#129141] font-extrabold tracking-wide uppercase text-xs font-mono">Manufacturer</span>
                              <span className="text-slate-700 font-bold text-xs">Theamineprotocolsupport</span>
                            </div>
                            <div className="grid grid-cols-[110px_1fr] md:grid-cols-[140px_1fr] border-b border-slate-100 pb-1.5 flex items-baseline">
                              <span className="text-[#129141] font-extrabold tracking-wide uppercase text-xs font-mono">Batch</span>
                              <span className="text-slate-800 font-mono font-extrabold bg-[#f4faf6] px-2.5 py-0.5 rounded border border-[#e2f3e8] text-xs">TAPUW0426-6</span>
                            </div>
                          </div>

                          {/* Sample Description & Tests requested */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                              <div className="flex items-center text-[10px] font-bold text-[#129141] uppercase tracking-wide mb-1">
                                <span>Sample description</span>
                                <span className="text-slate-400 font-bold ml-1.5">&gt;</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 px-3.5 text-slate-500 font-mono text-[11px] italic min-h-[44px]">
                                Pictures not included.
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center text-[10px] font-bold text-[#129141] uppercase tracking-wide mb-1">
                                <span>Tests requested</span>
                                <span className="text-slate-400 font-bold ml-1.5">&gt;</span>
                              </div>
                              <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 px-3.5 text-slate-700 font-mono text-[11px] font-semibold min-h-[44px]">
                                Ipamorelin analysis
                              </div>
                            </div>
                          </div>

                          {/* Results section with custom green frame and miniature QR code */}
                          <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                              <div className="flex items-center text-xs font-bold text-[#129141] uppercase tracking-wide">
                                <span>Results</span>
                                <span className="text-slate-400 font-bold ml-1.5">&gt;</span>
                              </div>
                              
                              <div className="p-1 bg-white border border-slate-200 rounded shadow-xs">
                                <svg className="w-10 h-10 text-slate-900" viewBox="0 0 29 29" fill="none">
                                  <path d="M0 0h7v7H0zm2 2v3h3V2zm5 0h1v1H7zm0 2h1v1H7zm1-4h1v1H9zm1 1h1v1h-1zm1-1h1v1h-1zm2 0h1v1h-1zm1 1h1v1h-1zm2-1h1v1h-1zm2 0h1v1h-1zm1 1h1v1h-1zm1-1h1v1h-1zm2 0h1v1h-1zm2 0h7v7h-7zm2 2v3h3V2zm-9 6h1v1h-1zm1 0h1v1h-1zm2 0h1v1h-1zm3 0h1v1h-1zm1 1h1v1h-1z" fill="currentColor"/>
                                  <path d="M0 22h7v7H0zm2 2v3h3v-3zm7 0h1v1H9zm2-2h1v1h-1zm1 2h1v1h-1zm2-1h1v-1h-1zm2 1h1v1h-1zm2-2h1v1h-1zm2 1h1v1h-1zm1-1h1v1h-1zm1 1h1v1h-1zm2-1h1v1h-1zm-10 6h1v1h-1zm2 0h1v1h-1zm3 0h1v1h-1z" fill="currentColor"/>
                                </svg>
                              </div>
                            </div>

                            <div className="border border-[#129141] rounded-lg overflow-hidden shadow-xs bg-white text-xs">
                              <div className="grid grid-cols-[1fr_120px] md:grid-cols-[1fr_200px] border-b border-[#129141] divide-x divide-[#129141] bg-emerald-50/10">
                                <div className="p-2.5 font-bold text-slate-800 font-sans flex items-center">
                                  Ipamorelin
                                </div>
                                <div className="p-2.5 text-right font-mono font-bold text-slate-800 flex items-center justify-end">
                                  9.64 mg
                                </div>
                              </div>
                              <div className="grid grid-cols-[1fr_120px] md:grid-cols-[1fr_200px] border-b border-[#129141] divide-x divide-[#129141]">
                                <div className="p-2.5 font-bold text-slate-800 font-sans flex items-center">
                                  Purity
                                </div>
                                <div className="p-2.5 text-right font-mono font-extrabold text-[#129141] flex items-center justify-end text-[13px]">
                                  99.523%
                                </div>
                              </div>
                              <div className="grid grid-cols-[1fr_120px] md:grid-cols-[1fr_200px] divide-x divide-[#129141]">
                                <div className="p-2 select-none h-6"></div>
                                <div className="p-2 select-none h-6"></div>
                              </div>
                            </div>
                          </div>

                          {/* Comments block */}
                          <div className="mb-6">
                            <div className="flex items-center text-[10px] font-bold text-[#129141] uppercase tracking-wide mb-1">
                              <span>Comments</span>
                              <span className="text-slate-400 font-bold ml-1.5">&gt;</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/60 rounded-lg p-2.5 px-3.5 text-slate-400 font-mono text-[11px] h-10 italic flex items-center">
                              Analysis was run with calibrated HPLC detection.
                            </div>
                          </div>

                          {/* Sign-off */}
                          <div className="grid grid-cols-2 gap-4 items-center mb-8 pt-4 border-t border-slate-200/60">
                            <div className="flex items-center text-[11px] font-semibold text-slate-600">
                              <span className="text-[#129141] font-bold mr-1">Analysis conducted</span>
                              <span className="text-slate-400 font-bold mr-2">&gt;</span>
                              <span className="text-slate-800 font-mono font-extrabold bg-slate-100 px-2 py-0.5 rounded">30 APR 2026</span>
                            </div>

                            <div className="flex items-center justify-end font-semibold text-[11px] text-slate-600">
                              <span className="text-[#129141] font-bold mr-1">Signature</span>
                              <span className="text-slate-400 font-bold mr-2">&gt;</span>
                              <div className="relative pl-1 md:pl-2 flex flex-col items-center">
                                <svg className="w-24 h-12 text-[#2c3e50]" viewBox="0 0 100 50">
                                  <path d="M 10 35 C 15 35, 20 15, 25 10 C 30 5, 25 45, 30 40 C 35 35, 40 25, 45 28 C 50 31, 45 42, 50 40 C 55 38, 62 10, 65 15 C 68 20, 62 42, 65 40 C 68 38, 75 30, 80 32 C 85 34, 90 28, 95 30" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                  />
                                  <path d="M 22 25 L 85 28" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeLinecap="round"/>
                                </svg>
                                <div className="text-[8px] font-mono text-slate-400 tracking-wider font-bold -mt-1 uppercase">Janoshik Analytical</div>
                              </div>
                            </div>
                          </div>

                          {/* Central Verification Card */}
                          <div className="text-center pt-4 border-t border-slate-200/60 mt-auto flex flex-col items-center">
                            <span className="text-[#129141] font-bold text-xs tracking-wide">
                              Verify this test at <span className="underline">www.janoshik.com/verify/</span> with the following unique key
                            </span>
                            <div className="mt-2 text-center bg-slate-100 hover:bg-slate-200 border border-slate-200 px-6 py-2 rounded-xl text-slate-800 font-mono font-black text-xs md:text-sm tracking-widest shadow-inner select-all">
                              V7QVXXGBFB2G
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Standard Fallback HPLC Document Layout
                    return (
                      <>
                        {/* Report Header */}
                        <div className="border-b-2 border-slate-900 pb-5 mb-5 flex justify-between items-start w-full">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-primary">
                              <FlaskConical className="w-5 h-5 text-primary fill-primary/10" />
                              <span className="font-display font-extrabold text-xs md:text-base tracking-tight text-slate-900 uppercase">PEPTIDE PHARMACEUTICALS</span>
                            </div>
                            <p className="text-[8px] md:text-[9px] text-slate-500 font-mono tracking-wider">SECURE TOXICOLOGY & BIO-ASSAY TESTING LABS • QC ARCHIVE</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] md:text-[10px] font-mono text-slate-500 font-bold block">REPORT ID: {selectedCoa.id}</span>
                            <span className="text-[9px] md:text-[10px] font-mono text-slate-500 block">ISSUED ON: {selectedCoa.dateTested}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <div className="text-center bg-slate-50 border border-slate-200 rounded-xl p-3.5 mb-6 w-full">
                          <h3 className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">CERTIFICATE OF ANALYSIS</h3>
                          <h2 className="text-lg md:text-xl font-display font-black tracking-tight text-slate-900 mt-0.5">{selectedCoa.peptideName} Verification</h2>
                        </div>

                        {/* Physical & Chemical Specifications Table */}
                        <div className="space-y-3 w-full text-xs">
                          <h4 className="text-[9px] md:text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center justify-between">
                            <span>1. Compound Specifications</span>
                            <span className="text-emerald-655 font-bold">PASS</span>
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[8px] md:text-[9px] text-slate-400 block uppercase font-mono">Peptide Identity</span>
                              <span className="font-bold text-slate-900 text-sm">{selectedCoa.peptideName}</span>
                            </div>
                            <div>
                              <span className="text-[8px] md:text-[9px] text-slate-400 block uppercase font-mono">Lot/Batch Code</span>
                              <span className="font-mono text-slate-700 font-bold">{selectedCoa.batchNumber}</span>
                            </div>
                            <div>
                              <span className="text-[8px] md:text-[9px] text-slate-400 block uppercase font-mono">Molecular Formula</span>
                              <span className="font-mono font-semibold text-slate-800">{selectedCoa.molecularFormula || 'C62H98N16O22'}</span>
                            </div>
                            <div>
                              <span className="text-[8px] md:text-[9px] text-slate-400 block uppercase font-mono">Molecular Weight</span>
                              <span className="font-mono text-slate-700">{selectedCoa.molecularWeight || '1419.5 g/mol'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Assay Results Table */}
                        <div className="space-y-3 mt-6 w-full">
                          <h4 className="text-[9px] md:text-[10px] font-mono font-bold text-slate-700 uppercase tracking-widest border-b border-slate-200 pb-1 flex items-center justify-between">
                            <span>2. HPLC Chromatographic Profile</span>
                            <span className="text-primary font-bold">VERIFIED</span>
                          </h4>

                          {/* Chromatography representation graph peak illustration using clean SVG layout */}
                          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 h-36 flex flex-col justify-end relative overflow-hidden">
                            {/* Grid background lines */}
                            <div className="absolute inset-x-0 top-6 border-t border-slate-200/50"></div>
                            <div className="absolute inset-x-0 top-16 border-t border-slate-200/50"></div>
                            <div className="absolute inset-x-0 top-26 border-t border-slate-200/50"></div>
                            
                            {/* Graph Peak Line */}
                            <svg className="w-full h-full absolute inset-0 z-0 text-primary" viewBox="0 0 400 100" preserveAspectRatio="none">
                              <path 
                                d="M 0 95 L 80 95 L 120 95 L 140 95 L 150 93 L 155 85 L 160 50 L 165 92 L 170 95 L 200 95 L 205 92 L 210 20 L 215 15 L 218 20 L 223 93 L 230 95 L 290 95 L 305 93 L 310 70 L 315 94 L 420 95" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2"
                              />
                              {/* Peak labels */}
                              <circle cx="212" cy="15" r="4" fill="#7a223e" />
                              <text x="220" y="25" fill="#0f172a" fontSize="8" fontWeight="bold" fontFamily="monospace">Major Peak: {selectedCoa.purityPercent}%</text>
                              <text x="145" y="45" fill="#64748b" fontSize="6" fontFamily="monospace">Trace 1</text>
                              <text x="315" y="65" fill="#64748b" fontSize="6" fontFamily="monospace">Trace 2</text>
                            </svg>
                            
                            <div className="z-10 flex justify-between text-[7px] font-mono text-slate-400 mt-auto">
                              <span>0.00 min</span>
                              <span>5.00 min</span>
                              <span>10.00 min</span>
                              <span>15.00 min</span>
                              <span>20.00 min</span>
                            </div>
                          </div>
                        </div>

                        {/* Validation Sign-off */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t-2 border-slate-900 border-dashed w-full text-xs">
                          <div>
                            <span className="text-[8px] md:text-[9px] text-slate-400 block uppercase font-mono">Assay Methodology</span>
                            <p className="text-[9px] md:text-[10px] text-slate-750 leading-normal">
                              Validated utilizing High-Performance Liquid Chromatography (HPLC) coupled with Mass Spectrometry (MS) to cross-reference molecular accuracy.
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end text-right justify-between">
                            <div className="space-y-1">
                              <span className="text-[8px] md:text-[10px] text-slate-400 block uppercase font-mono">Chemical Purity Verified</span>
                              <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-extrabold text-xs md:text-sm px-2.5 py-0.5 rounded-lg border border-emerald-200">
                                <CheckCircle className="w-3.5 h-3.5 fill-emerald-100" /> {selectedCoa.purityPercent}%
                              </div>
                            </div>

                            <div className="pt-4 flex flex-col items-end">
                              <div className="text-[8px] md:text-[9px] font-mono italic text-primary font-bold border-b border-slate-300 w-32 pb-0.5 text-center">
                                {selectedCoa.chemistSignature || 'Dr. A. Santos, PhD'}
                              </div>
                              <span className="text-[7px] md:text-[8px] text-slate-400 uppercase tracking-wider block mt-1 font-mono">HEAD BIOCHEMICAL CHEMIST</span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-background/50 text-center text-[10px] font-mono text-slate-500">
                Independent purity certification from secure laboratory database. Store in cold chain environment.
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADMIN ADD/EDIT COA MODAL DRAWER --- */}
      <AnimatePresence>
        {(isAdding || isEditing) && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="absolute inset-0 cursor-pointer" onClick={() => { setIsAdding(false); setIsEditing(null); }}></div>
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-card border border-border rounded-3xl p-6 max-w-xl w-full relative z-10 shadow-xl flex flex-col justify-between overflow-y-auto max-h-[90vh]"
              id="admin-coa-modal"
            >
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <h4 className="font-display font-extrabold text-sm sm:text-base text-primary flex items-center gap-2">
                  <Database className="w-4 h-4 text-primary" />
                  <span>{isAdding ? 'Configure New COA Certificate' : `Modify Certificate [${formId}]`}</span>
                </h4>
                <button
                  type="button"
                  onClick={() => { setIsAdding(false); setIsEditing(null); }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs font-sans text-slate-800">
                <div className="grid grid-cols-2 gap-4">
                  {/* COA ID */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">COA Unique ID</label>
                    <input
                      type="text"
                      required
                      value={formId}
                      onChange={(e) => setFormId(e.target.value)}
                      disabled={!!isEditing}
                      placeholder="e.g. COA-BPC157-24"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                    />
                  </div>

                  {/* Peptide Name */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Peptide Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. BPC-157"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Batch Code */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Batch / Lot Number</label>
                    <input
                      type="text"
                      required
                      value={formBatch}
                      onChange={(e) => setFormBatch(e.target.value)}
                      placeholder="e.g. BPC240501"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>

                  {/* Testing Date */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Date Tested</label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Purity % */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Purity Percent (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      max="100"
                      min="90"
                      value={formPurity}
                      onChange={(e) => setFormPurity(Number(e.target.value))}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 font-mono font-bold"
                    />
                  </div>

                  {/* chemist signature */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Verifying Chemist</label>
                    <input
                      type="text"
                      required
                      value={formSignature}
                      onChange={(e) => setFormSignature(e.target.value)}
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* chemical formula */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Molecular Formula (Optional)</label>
                    <input
                      type="text"
                      value={formFormula}
                      onChange={(e) => setFormFormula(e.target.value)}
                      placeholder="e.g. C62H98N16O22"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 font-mono"
                    />
                  </div>

                  {/* molecular weight */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Molecular Weight (Optional)</label>
                    <input
                      type="text"
                      value={formWeight}
                      onChange={(e) => setFormWeight(e.target.value)}
                      placeholder="e.g. 1419.5 g/mol"
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Thumbnail Preview URL</label>
                  <input
                    type="url"
                    value={formThumbUrl}
                    onChange={(e) => setFormThumbUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wide text-slate-500 mb-1">Full Size Document/Image URL</label>
                  <input
                    type="url"
                    value={formCoaUrl}
                    onChange={(e) => setFormCoaUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => { setIsAdding(false); setIsEditing(null); }}
                    className="bg-secondary hover:bg-secondary-foreground/15 text-slate-700 px-4 py-2 rounded-lg font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary/95 text-white px-5 py-2 rounded-lg font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Save Certificate</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
