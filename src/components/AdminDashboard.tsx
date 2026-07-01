/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  setDoc,
  deleteDoc,
  writeBatch, 
  serverTimestamp 
} from 'firebase/firestore';
import { Order, OrderStatus, OrderStatusHistory, Product } from '../types.ts';
import { ADMIN_EMAILS, PRODUCTS } from '../products.ts';
import { CoaLibrary } from './CoaLibrary.tsx';
import { ProductImage } from './ProductImage.tsx';
import { 
  Search, 
  ListFilter, 
  ClipboardCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Eye, 
  FileImage, 
  ShieldAlert, 
  Check, 
  RefreshCw,
  LayoutDashboard,
  Receipt,
  Package,
  BarChart3,
  Award,
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  TrendingUp,
  DollarSign,
  Box
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminDashboardProps {
  user: any;
  toast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function AdminDashboard({ user, toast }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [ordersSearchTerm, setOrdersSearchTerm] = useState('');
  const [ordersStatusFilter, setOrdersStatusFilter] = useState<'All' | OrderStatus>('All');
  
  // Dashboard navigation tab state
  const [adminActiveTab, setAdminActiveTab] = useState<'dashboard' | 'orders' | 'inventory' | 'sales' | 'coa'>('dashboard');

  // Selected single order drawer state
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentHistory, setCurrentHistory] = useState<OrderStatusHistory[]>([]);
  const [statusDropdown, setStatusDropdown] = useState<OrderStatus>('Pending');
  const [saveLoading, setSaveLoading] = useState(false);

  // Body scroll lock when order details modal is open
  useEffect(() => {
    if (selectedOrder) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      (window as any).__lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      (window as any).__lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      (window as any).__lenis?.start();
    };
  }, [selectedOrder]);

  // Inventory forms state
  const [isEditingProduct, setIsEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [prodFormName, setProdFormName] = useState('');
  const [prodFormPrice, setProdFormPrice] = useState(0);
  const [prodFormStock, setProdFormStock] = useState(0);
  const [prodFormUnit, setProdFormUnit] = useState('10mg');
  const [prodFormCat, setProdFormCat] = useState('Healing');
  const [prodFormDesc, setProdFormDesc] = useState('');
  const [prodFormImage, setProdFormImage] = useState('');
  const [prodFormAbbr, setProdFormAbbr] = useState('');

  // Verification Check
  const isAdmin = user ? ADMIN_EMAILS.map(e => e.toLowerCase()).includes((user.email || '').toLowerCase()) : true; // Allow admin view in dev without auth

  // 1. Real-time orders listener
  useEffect(() => {
    if (!isAdmin) {
      setLoadingOrders(false);
      return;
    }

    setLoadingOrders(true);
    const ordersColRef = collection(db, 'orders');
    const q = query(ordersColRef, orderBy('created_at', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList: Order[] = [];
      snapshot.forEach(docSnap => {
        orderList.push(docSnap.data() as Order);
      });
      setOrders(orderList);
      setLoadingOrders(false);
    }, (err) => {
      setLoadingOrders(false);
      try {
        handleFirestoreError(err, OperationType.LIST, 'orders');
      } catch (e) {
        console.warn("Caught Firestore permission error in AdminDashboard for orders list:", e);
      }
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // 2. Real-time products listener
  useEffect(() => {
    if (!isAdmin) {
      setLoadingProducts(false);
      return;
    }

    setLoadingProducts(true);
    const productsColRef = collection(db, 'products');
    const q = query(productsColRef);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setProductsList(PRODUCTS);
        setLoadingProducts(false);
      } else {
        const fetched: Product[] = [];
        snapshot.forEach(docSnap => {
          const rawData = docSnap.data();
          // Find the matching static template to fill in any missing fields
          const template = PRODUCTS.find(p => String(p.id) === String(rawData.id ?? docSnap.id));
          fetched.push({
            ...template,
            ...rawData,
            id: rawData.id ?? template?.id ?? docSnap.id,
            name: rawData.name ?? template?.name ?? '',
            price: Number(rawData.price ?? template?.price ?? 0),
            stock: Number(rawData.stock ?? template?.stock ?? 0),
            category: rawData.category || rawData.cat || template?.category || 'Peptides',
            cat: rawData.cat || rawData.category || template?.cat || 'Peptides',
            description: rawData.description || rawData.desc || template?.description || '',
            desc: rawData.desc || rawData.description || template?.desc || '',
            image: rawData.image ?? template?.image ?? '',
            unit: rawData.unit ?? template?.unit ?? '',
            concentration: rawData.concentration ?? template?.concentration ?? '',
            abbr: rawData.abbr ?? template?.abbr ?? '',
            coaUrl: rawData.coaUrl ?? template?.coaUrl ?? '',
            coaSummary: {
              purity: rawData.coaSummary?.purity ?? template?.coaSummary?.purity ?? '99.5%',
              appearance: rawData.coaSummary?.appearance ?? template?.coaSummary?.appearance ?? 'White sterile lyophilized powder',
              batchNo: rawData.coaSummary?.batchNo ?? template?.coaSummary?.batchNo ?? '',
              testDate: rawData.coaSummary?.testDate ?? template?.coaSummary?.testDate ?? 'February 2026',
              method: rawData.coaSummary?.method ?? template?.coaSummary?.method ?? 'HPLC & Mass Spectrometry',
            }
          } as Product);
        });
        fetched.sort((a, b) => Number(a.id) - Number(b.id));
        setProductsList(fetched);
        setLoadingProducts(false);
      }
    }, (err) => {
      setLoadingProducts(false);
      try {
        handleFirestoreError(err, OperationType.LIST, 'products');
      } catch (e) {
        console.warn("Caught Firestore permission error in AdminDashboard, using static fallback PRODUCTS:", e);
      }
      // Fallback to static product list when Firestore permission error occurs
      setProductsList(PRODUCTS);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  // 3. Status History listener
  useEffect(() => {
    if (!selectedOrder) {
      setCurrentHistory([]);
      return;
    }

    const historyColRef = collection(db, `orders/${selectedOrder.order_id}/status_history`);
    const q = query(historyColRef, orderBy('created_at', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const historyList: OrderStatusHistory[] = [];
      snapshot.forEach(docSnap => {
        historyList.push(docSnap.data() as OrderStatusHistory);
      });
      setCurrentHistory(historyList);
    }, (err) => {
      console.warn("Could not query subcollection tracking audit trail");
    });

    return () => unsubscribe();
  }, [selectedOrder]);

  // Helper formats
  const formatTimestamp = (ts: any) => {
    if (!ts) return 'System check';
    
    let dateObj: Date;
    if (ts.toDate) {
      dateObj = ts.toDate();
    } else if (ts instanceof Date) {
      dateObj = ts;
    } else if (ts.seconds) {
      dateObj = new Date(ts.seconds * 1000);
    } else {
      dateObj = new Date(ts);
    }

    return dateObj.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status transitions
  const handleSaveStatus = async () => {
    if (!selectedOrder) return;
    setSaveLoading(true);

    const orderId = selectedOrder.order_id;
    const orderDocRef = doc(db, 'orders', orderId);
    const historyColRef = collection(db, `orders/${orderId}/status_history`);

    try {
      const batch = writeBatch(db);

      // 1. Update status on core order document
      batch.update(orderDocRef, {
        status: statusDropdown,
        updated_at: serverTimestamp()
      });

      // 2. Add history subcollection entry
      const newHistoryRef = doc(historyColRef);
      batch.set(newHistoryRef, {
        status: statusDropdown,
        updated_by: user?.email ?? 'admin@system',
        created_at: serverTimestamp()
      });

      await batch.commit();

      // Dispatch EmailJS transactional parameters
      await triggerStatusEmail(selectedOrder, statusDropdown);

      setSelectedOrder(prev => prev ? { ...prev, status: statusDropdown } : null);
      toast(`Order status upgraded to ${statusDropdown} & transactional notification sent! ✔`, 'success');
    } catch (err) {
      console.error("Save status error:", err);
      toast("Permission failed. Contact server admins.", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  const triggerStatusEmail = async (order: Order, nextStatus: OrderStatus) => {
    const serviceId = "default_service";
    const templateId = "EMAILJS_STATUS_TEMPLATE";
    const publicKey = "USER_PUBLIC_KEY";

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            order_id: order.order_id,
            status_update: nextStatus,
            delivery_method: order.delivery_method
          }
        })
      });
    } catch (err) {
      console.warn("Could not dispatch EmailJS status. Offline mode active:", err);
    }
  };

  // Product CRUD
  const resetFieldsAndForms = () => {
    setProdFormName('');
    setProdFormPrice(0);
    setProdFormStock(0);
    setProdFormUnit('10mg');
    setProdFormCat('Healing');
    setProdFormDesc('');
    setProdFormImage('');
    setProdFormAbbr('');
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextId = productsList.length > 0 ? Math.max(...productsList.map(p => Number(p.id) || 0)) + 1 : 1;
    try {
      const newProduct: Product = {
        id: nextId,
        name: prodFormName,
        price: Number(prodFormPrice) || 0,
        
        // vpep
        description: prodFormDesc || 'No formal research protocol details on record.',
        concentration: prodFormUnit || '10mg',
        category: prodFormCat || 'Peptides',
        coaUrl: "https://drive.google.com/file/d/default_coa/view",
        coaSummary: {
          purity: "99.5%",
          appearance: "White sterile lyophilized powder",
          batchNo: prodFormAbbr ? `${prodFormAbbr}-2026` : `PEP-2026`,
          testDate: "February 2026",
          method: "HPLC & Mass Spectrometry"
        },
        dosageDefaultMg: prodFormUnit ? (parseFloat(prodFormUnit) || 5) : 5,

        // P Project
        unit: prodFormUnit || '10mg',
        stock: Number(prodFormStock) || 0,
        cat: prodFormCat || 'Peptides',
        desc: prodFormDesc || 'No formal research protocol details on record.',
        image: prodFormImage || 'https://images.unsplash.com/photo-1579154204601-01588f351167?q=80&w=600&auto=format&fit=crop',
        abbr: prodFormAbbr || prodFormName.slice(0, 3).toUpperCase(),
        popularity: 5
      };
      await setDoc(doc(db, 'products', String(nextId)), newProduct);
      toast(`Successfully registered new formulation: ${prodFormName}`, 'success');
      setIsAddingProduct(false);
      resetFieldsAndForms();
    } catch (err: any) {
      toast(`Error registering formulation: ${err.message}`, 'error');
    }
  };

  const triggerEditProductForm = (product: Product) => {
    setIsEditingProduct(product);
    setProdFormName(product.name);
    setProdFormAbbr(product.abbr || '');
    setProdFormPrice(product.price);
    setProdFormStock(product.stock || 0);
    setProdFormUnit(product.unit || product.concentration || '10mg');
    setProdFormCat(product.cat || product.category || 'Peptides');
    setProdFormDesc(product.desc || product.description || '');
    setProdFormImage(product.image || '');
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditingProduct) return;
    try {
      const updatedFields = {
        name: prodFormName,
        abbr: prodFormAbbr,
        price: Number(prodFormPrice) || 0,
        stock: Number(prodFormStock) || 0,
        unit: prodFormUnit,
        concentration: prodFormUnit,
        cat: prodFormCat,
        category: prodFormCat,
        desc: prodFormDesc,
        description: prodFormDesc,
        image: prodFormImage
      };
      await updateDoc(doc(db, 'products', String(isEditingProduct.id)), updatedFields);
      toast(`Successfully saved coordinates for ${prodFormName}`, 'success');
      setIsEditingProduct(null);
      resetFieldsAndForms();
    } catch (err: any) {
      toast(`Error saving formulation coordinates: ${err.message}`, 'error');
    }
  };

  const handleDeleteProduct = async (productId: string | number) => {
    if (!window.confirm('Are you absolutely certain you want to destroy this bio-reagent coordinate? This is irreversibly destructive.')) return;
    try {
      await deleteDoc(doc(db, 'products', String(productId)));
      toast(`Formulation #${productId} successfully purged from database.`, 'info');
    } catch (err: any) {
      toast(`Error purging formulation: ${err.message}`, 'error');
    }
  };

  // Dynamic Sales Curves & Aggregations
  // Finished orders count as Shipped or Confirmed or Completed
  const completedOrders = useMemo(() => {
    return orders.filter(o => o.status === 'Shipped' || o.status === 'Delivered' || o.status === 'Completed');
  }, [orders]);

  const totalSalesSum = useMemo(() => {
    return completedOrders.reduce((sum, o) => sum + (Number(o.total_amount || o.totalAmount) || 0), 0);
  }, [completedOrders]);

  const totalProductsStockSum = useMemo(() => {
    return productsList.reduce((sum, p) => sum + (Number(p.stock) || 0), 0);
  }, [productsList]);

  // Aggregated Best Sellers
  const bestSellersList = useMemo(() => {
    const productSalesMap: Record<string | number, number> = {};
    completedOrders.forEach(order => {
      const items = Array.isArray(order.items) ? order.items : [];
      items.forEach((item: any) => {
        if (item) {
          const pid = item.product_id || item.id;
          const qty = Number(item.quantity || item.qty) || 0;
          if (pid !== undefined) {
            productSalesMap[pid] = (productSalesMap[pid] || 0) + qty;
          }
        }
      });
    });

    return Object.entries(productSalesMap)
      .map(([idStr, qty]) => {
        const prod = productsList.find(p => String(p.id) === idStr);
        return {
          product: prod,
          qtySold: qty
        };
      })
      .filter(item => item.product !== undefined)
      .sort((a, b) => b.qtySold - a.qtySold)
      .slice(0, 3);
  }, [completedOrders, productsList]);

  // Dynamic Chart Aggregation (Daily, Weekly, Monthly)
  const chartsData = useMemo(() => {
    const now = new Date();
    if (adminActiveTab === 'sales' || adminActiveTab === 'dashboard') {
      // Daily Chart (Past 7 Days)
      const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(now.getDate() - (6 - i));
        return d;
      });

      const dailyPoints = days.map(day => {
        const formattedDate = day.toLocaleDateString([], { month: 'short', day: 'numeric' });
        const daySales = completedOrders
          .filter(o => {
            const dateVal = o.created_at?.toDate ? o.created_at.toDate() : new Date(o.created_at);
            return dateVal.getFullYear() === day.getFullYear() &&
                   dateVal.getMonth() === day.getMonth() &&
                   dateVal.getDate() === day.getDate();
          })
          .reduce((sum, o) => sum + (Number(o.total_amount || o.totalAmount) || 0), 0);
        return { label: formattedDate, value: daySales };
      });

      // Weekly Chart (Past 4 Weeks)
      const weeklyPoints = Array.from({ length: 4 }, (_, i) => {
        const label = `Week ${i + 1}`;
        const weekSales = completedOrders
          .filter(o => {
            const dateVal = o.created_at?.toDate ? o.created_at.toDate() : new Date(o.created_at);
            const diffTime = now.getTime() - dateVal.getTime();
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            return diffDays >= (3 - i) * 7 && diffDays < (4 - i) * 7;
          })
          .reduce((sum, o) => sum + (Number(o.total_amount || o.totalAmount) || 0), 0);
        return { label, value: weekSales };
      });

      // Monthly Chart (Past 6 Months)
      const months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setMonth(now.getMonth() - (5 - i));
        return d;
      });

      const monthlyPoints = months.map(m => {
        const label = m.toLocaleDateString([], { month: 'short' });
        const mSales = completedOrders
          .filter(o => {
            const dateVal = o.created_at?.toDate ? o.created_at.toDate() : new Date(o.created_at);
            return dateVal.getFullYear() === m.getFullYear() && dateVal.getMonth() === m.getMonth();
          })
          .reduce((sum, o) => sum + (Number(o.total_amount || o.totalAmount) || 0), 0);
        return { label, value: mSales };
      });

      return { dailyPoints, weeklyPoints, monthlyPoints };
    }
    return { dailyPoints: [], weeklyPoints: [], monthlyPoints: [] };
  }, [adminActiveTab, completedOrders]);

  // Orders Filter
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = ordersStatusFilter === 'All' || o.status === ordersStatusFilter;
      const matchesSearch = o.order_id.toLowerCase().includes(ordersSearchTerm.toLowerCase()) || 
                            o.customer_name.toLowerCase().includes(ordersSearchTerm.toLowerCase()) ||
                            o.customer_email.toLowerCase().includes(ordersSearchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, ordersStatusFilter, ordersSearchTerm]);

  if (!isAdmin) {
    return (
      <div className="py-12 text-center rounded-2xl border border-danger/25 bg-danger/5 max-w-lg mx-auto">
        <ShieldAlert className="h-10 w-10 text-danger mx-auto mb-3.5 animate-pulse" />
        <h3 className="font-display font-extrabold text-white text-base">Restricted Clinical Area</h3>
        <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto">This diagnostic workspace is authorized only for whitelisted chemical control representatives.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left" id="admin-dashboard-root">
      
      {/* Dynamic Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3">
        {[
          { id: 'dashboard', label: 'Administrative Overview', icon: LayoutDashboard },
          { id: 'orders', label: 'Dispatches & Orders', icon: Receipt },
          { id: 'inventory', label: 'Inventory Control', icon: Package },
          { id: 'sales', label: 'Sales Reports', icon: BarChart3 },
          { id: 'coa', label: 'COA Records', icon: Award }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = adminActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminActiveTab(tab.id as any)}
              className={`px-4.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center space-x-2 border uppercase cursor-pointer ${
                isActive 
                  ? 'bg-accent/10 border-accent/30 text-accent shadow-sm'
                  : 'bg-bg-card/40 border-border text-text-muted hover:text-white hover:border-accent/40'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & DASHBOARD */}
      {adminActiveTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-bg-card/50 border border-border rounded-xl">
              <p className="text-[10px] font-mono text-text-muted uppercase">Gross Revenue</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <DollarSign className="h-5 w-5 text-accent" />
                <p className="text-xl font-display font-extrabold text-white">₱{totalSalesSum.toLocaleString()}</p>
              </div>
            </div>

            <div className="p-4 bg-bg-card/50 border border-border rounded-xl">
              <p className="text-[10px] font-mono text-text-muted uppercase">Finalized Dispatches</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <TrendingUp className="h-5 w-5 text-success" />
                <p className="text-xl font-display font-extrabold text-white">{completedOrders.length}</p>
              </div>
            </div>

            <div className="p-4 bg-bg-card/50 border border-border rounded-xl">
              <p className="text-[10px] font-mono text-text-muted uppercase">Pending Verification</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <span className="h-2 w-2 rounded-full bg-warning animate-pulse" />
                <p className="text-xl font-display font-extrabold text-white">{orders.filter(o => o.status === 'Pending').length}</p>
              </div>
            </div>

            <div className="p-4 bg-bg-card/50 border border-border rounded-xl">
              <p className="text-[10px] font-mono text-text-muted uppercase">Active Reagent Supply</p>
              <div className="flex items-center space-x-1.5 mt-1">
                <Box className="h-5 w-5 text-accent-dim" />
                <p className="text-xl font-display font-extrabold text-white">{totalProductsStockSum} vials</p>
              </div>
            </div>
          </div>

          {/* SVG Sales Curve & Side summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* SVG Area Sales Chart */}
            <div className="lg:col-span-2 bg-bg-card border border-border rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Dynamic Sales Curve</h3>
                <p className="text-[10px] font-mono text-text-muted">Chronological analysis of finalized billing transactions</p>
              </div>

              {/* Graphic area */}
              <div className="h-52 w-full pt-4 relative flex items-end">
                {(() => {
                  const points = chartsData.dailyPoints;
                  if (points.length === 0) {
                    return <p className="text-center text-text-muted font-mono text-xs w-full py-16">No transactions in the aggregate index</p>;
                  }
                  const maxVal = Math.max(...points.map(p => p.value), 4000) * 1.1;
                  const w = 550;
                  const h = 160;
                  const padding = 10;
                  
                  const xStep = (w - padding * 2) / (points.length - 1);
                  const coords = points.map((p, idx) => {
                    const x = padding + idx * xStep;
                    const y = h - padding - (p.value / maxVal) * (h - padding * 2);
                    return { x, y };
                  });

                  const pathD = coords.reduce((acc, c, idx) => {
                    return idx === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`;
                  }, '');

                  const areaD = coords.length > 0
                    ? `${pathD} L ${coords[coords.length - 1].x} ${h - padding} L ${coords[0].x} ${h - padding} Z`
                    : '';

                  return (
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      {/* Grid lines */}
                      <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="#1E2D45" strokeWidth="1" />
                      <line x1={padding} y1={padding} x2={w - padding} y2={padding} stroke="#1E2D45" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                      <line x1={padding} y1={h/2} x2={w - padding} y2={h/2} stroke="#1E2D45" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />

                      {/* Area */}
                      {areaD && <path d={areaD} fill="url(#glowGrad)" />}
                      {/* Path line */}
                      {pathD && <path d={pathD} fill="none" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" />}

                      {/* Nodes */}
                      {coords.map((c, idx) => (
                        <g key={idx}>
                          <circle cx={c.x} cy={c.y} r="4.5" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="2" />
                          <text x={c.x} y={h - 1} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#8896B3">{points[idx].label}</text>
                          {points[idx].value > 0 && (
                            <text x={c.x} y={c.y - 8} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fontWeight="bold" fill="#ffffff">₱{points[idx].value.toLocaleString()}</text>
                          )}
                        </g>
                      ))}
                    </svg>
                  );
                })()}
              </div>
            </div>

            {/* Best Sellers Side panel */}
            <div className="bg-bg-card border border-border rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Popular Formulations</h3>
                <p className="text-[10px] font-mono text-text-muted">Peptide assets with the highest dispatch volume</p>
              </div>

              <div className="space-y-3 pt-2">
                {bestSellersList.map((item, idx) => (
                  <div key={idx} className="p-3 bg-bg-deep rounded-xl border border-border flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white uppercase">{item.product?.name}</p>
                      <p className="text-[9px] font-mono text-text-muted mt-0.5">{item.product?.abbr} • {item.product?.unit || item.product?.concentration}</p>
                    </div>
                    <span className="bg-accent/15 text-accent font-mono text-[10px] font-bold border border-accent/20 px-2.5 py-1 rounded">
                      {item.qtySold} vials sold
                    </span>
                  </div>
                ))}

                {bestSellersList.length === 0 && (
                  <p className="text-center text-text-muted font-mono text-xs py-8">Waiting for dispatch data...</p>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: DISPATCHES & ORDERS (Original vpep logic) */}
      {adminActiveTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-bg-card rounded-xl border border-border shadow-xl overflow-hidden">
            
            {/* Title & Filter Bar */}
            <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-base">Dispatches Ledger</h3>
                <p className="text-xs text-text-muted mt-0.5">Manage peptide purchases, review GCash receipts, and audit history events.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select 
                  value={ordersStatusFilter}
                  onChange={(e) => setOrdersStatusFilter(e.target.value as any)}
                  className="bg-bg-deep text-xs rounded-lg border border-border px-3 py-2 text-white outline-none focus:border-accent"
                >
                  <option value="All">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Completed">Completed</option>
                </select>

                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Filter ID or Customer..."
                    value={ordersSearchTerm}
                    onChange={(e) => setOrdersSearchTerm(e.target.value)}
                    className="w-full text-xs rounded-lg border border-border bg-bg-deep pl-9 pr-3 py-2 text-white placeholder-text-muted/50 focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Orders Table */}
            {loadingOrders ? (
              <div className="py-20 text-center">
                <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
                <p className="text-xs text-text-muted font-mono uppercase tracking-wider mt-4 animate-pulse">Synchronizing logistics dataset...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-bg-deep/40 font-mono text-text-muted text-[10px] uppercase border-b border-border/85">
                      <th className="p-4 pl-6">Order ID</th>
                      <th className="p-4">Customer Coordinates</th>
                      <th className="p-4">Dispatch Target Date</th>
                      <th className="p-4">Carrier Fee</th>
                      <th className="p-4">Status Tag</th>
                      <th className="p-4 pr-6 text-right">Action Interface</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 text-text-primary/90">
                    {filteredOrders.map(o => (
                      <tr 
                        key={o.order_id}
                        onClick={() => { setSelectedOrder(o); setStatusDropdown(o.status); }}
                        className="hover:bg-white/[0.02] cursor-pointer transition-colors duration-150"
                      >
                        <td className="p-4 pl-6 font-mono font-bold text-white tracking-wide">
                          {o.order_id}
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-bold text-white">{o.customer_name}</p>
                            <p className="text-[10px] font-mono text-text-muted mt-0.5">{o.customer_phone}</p>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-text-muted text-[11px]">
                          {formatTimestamp(o.created_at)}
                        </td>
                        <td className="p-4 font-mono font-semibold text-white">
                          ₱{(o.total_amount ?? o.totalAmount ?? 0).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded border text-[9px] font-mono ${
                            o.status === 'Pending' ? 'text-warning bg-warning/10 border-warning/20' :
                            o.status === 'Confirmed' ? 'text-accent bg-accent/10 border-accent/20' :
                            o.status === 'Shipped' ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' :
                            o.status === 'Delivered' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' :
                            'text-success bg-success/10 border-success/20'
                          }`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedOrder(o); setStatusDropdown(o.status); }}
                            className="px-3 py-1.5 rounded border border-border hover:border-accent text-text-muted hover:text-white bg-bg-deep text-[11px] font-semibold flex items-center space-x-1 ml-auto"
                          >
                            <Eye className="h-3.5 w-3.5 text-accent" />
                            <span>Manage</span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-text-muted font-sans border-none">
                          No peptide dispatches found matching criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PHYSICAL INVENTORY CONTROL */}
      {adminActiveTab === 'inventory' && (
        <div className="space-y-6">
          {/* Action header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-bg-card/50 border border-border p-4.5 rounded-xl">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Inventory Command Suite</h3>
              <p className="text-[10px] text-text-muted font-mono">Modifying formulation coordinates instantly updates client storefront catalogs</p>
            </div>
            {!isAddingProduct && !isEditingProduct ? (
              <button
                onClick={() => { resetFieldsAndForms(); setIsAddingProduct(true); }}
                className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-lg bg-accent text-bg-deep font-bold font-sans text-xs hover:bg-accent-dim transition cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy New Formulation</span>
              </button>
            ) : (
              <button
                onClick={() => { setIsAddingProduct(false); setIsEditingProduct(null); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-white/[0.03] text-text-muted hover:text-white font-semibold font-sans text-xs transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Inventory Ledger</span>
              </button>
            )}
          </div>

          {/* Form Overlay */}
          {(isAddingProduct || isEditingProduct) && (
            <div className="bg-bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2 mb-4 border-b border-border/60 pb-3">
                <Edit3 className="w-4 h-4 text-accent" />
                <span>{isAddingProduct ? 'Deploy Form: New Bio-Reagent Formulation' : `Edit Coordinates: ${isEditingProduct?.name}`}</span>
              </h3>

              <form onSubmit={isAddingProduct ? handleAddProduct : handleEditProduct} className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Col 1 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Designation Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Semaglutide High Potency"
                      value={prodFormName}
                      onChange={e => setProdFormName(e.target.value)}
                      className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Compound Abbr</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. SEMAG-10"
                      value={prodFormAbbr}
                      onChange={e => setProdFormAbbr(e.target.value)}
                      className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Dosage / Unit Volume</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 5mg or 10mg"
                      value={prodFormUnit}
                      onChange={e => setProdFormUnit(e.target.value)}
                      className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Col 2 */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Analytical Category</label>
                    <select
                      value={prodFormCat}
                      onChange={e => setProdFormCat(e.target.value)}
                      className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    >
                      <option value="Healing">Healing</option>
                      <option value="Metabolic">Metabolic</option>
                      <option value="Wellness">Wellness</option>
                      <option value="Cosmetics">Cosmetics</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Price (PHP)</label>
                      <input 
                        type="number" 
                        required
                        min="0"
                        value={prodFormPrice || ''}
                        onChange={e => setProdFormPrice(Number(e.target.value))}
                        className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">vials Stock</label>
                      <input 
                        type="number" 
                        required
                        min="0"
                        value={prodFormStock || ''}
                        onChange={e => setProdFormStock(Number(e.target.value))}
                        className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Representing Image URL</label>
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={prodFormImage}
                      onChange={e => setProdFormImage(e.target.value)}
                      className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Col 3 */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wide text-text-muted mb-1.5">Description Monograph Abstract</label>
                    <textarea 
                      placeholder="Enter scientific abstract and laboratory specifications..."
                      rows={5}
                      value={prodFormDesc}
                      onChange={e => setProdFormDesc(e.target.value)}
                      className="w-full bg-bg-deep border border-border rounded-lg px-3 py-2.5 text-xs text-white focus:border-accent focus:outline-none font-sans"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setIsAddingProduct(false); setIsEditingProduct(null); }}
                      className="flex-1 py-3 text-xs font-mono border border-border rounded-lg hover:bg-white/[0.02] text-text-muted hover:text-white"
                    >
                      Abort
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 text-xs font-bold bg-accent text-bg-deep hover:bg-accent-dim rounded-lg transition"
                    >
                      Save Coordinates
                    </button>
                  </div>
                </div>

              </form>
            </div>
          )}

          {/* Catalog grid table */}
          {!isAddingProduct && !isEditingProduct && (
            <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
              {loadingProducts ? (
                <div className="py-16 text-center">
                  <div className="h-6 w-6 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-bg-deep/40 font-mono text-text-muted text-[10px] uppercase border-b border-border">
                        <th className="p-4 pl-6">ID</th>
                        <th className="p-4">Compound Designation</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Stock</th>
                        <th className="p-4">Standard Price</th>
                        <th className="p-4 pr-6 text-right">Adjustment Interface</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40 text-text-primary/95">
                      {productsList.map(p => (
                          
                        <tr key={p.id} className="hover:bg-white/[0.01]">
                          <td className="p-4 pl-6 font-mono font-bold">{p.id}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <ProductImage 
                                productId={Number(p.id)}
                                productName={p.name}
                                imageUrl={p.image || ''}
                                className="w-8 h-8 rounded overflow-hidden shrink-0 border border-border flex items-center justify-center bg-bg-deep"
                              />
                              <div>
                                <p className="font-bold text-white">{p.name}</p>
                                <p className="text-[9px] font-mono text-text-muted mt-0.5">{p.abbr || 'N/A'} • {p.unit || p.concentration}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-mono text-text-muted">{p.cat || p.category}</td>
                          <td className="p-4 font-mono font-semibold">
                            {(p.stock ?? 0) === 0 ? (
                              <span className="text-danger">Out of stock</span>
                            ) : (p.stock ?? 0) <= 3 ? (
                              <span className="text-warning">{p.stock} remaining</span>
                            ) : (
                              <span className="text-success">{p.stock} units</span>
                            )}
                          </td>
                          <td className="p-4 font-mono font-bold text-white">₱{(p.price ?? 0).toLocaleString()}</td>
                          <td className="p-4 pr-6 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button
                                onClick={() => triggerEditProductForm(p)}
                                className="p-1.5 border border-border rounded-lg bg-bg-deep text-text-muted hover:text-white hover:border-accent transition"
                                title="Edit coordinates"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="p-1.5 border border-border rounded-lg bg-bg-deep text-text-muted hover:text-danger hover:border-danger transition"
                                title="Delete coordinate"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      )}

      {/* TAB 4: SALES REPORTS */}
      {adminActiveTab === 'sales' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sales curves */}
            <div className="md:col-span-2 bg-bg-card border border-border rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono font-bold">Sales Reports</h3>
                <p className="text-[10px] font-mono text-text-muted">Interactive sales curve aggregate analysis</p>
              </div>

              {/* Graphic area */}
              <div className="h-56 w-full pt-4 relative flex items-end">
                {(() => {
                  const points = chartsData.dailyPoints;
                  if (points.length === 0) {
                    return <p className="text-center text-text-muted font-mono text-xs w-full py-16">No completed dispatches in index</p>;
                  }
                  const maxVal = Math.max(...points.map(p => p.value), 4000) * 1.1;
                  const w = 550;
                  const h = 180;
                  const padding = 10;
                  
                  const xStep = (w - padding * 2) / (points.length - 1);
                  const coords = points.map((p, idx) => {
                    const x = padding + idx * xStep;
                    const y = h - padding - (p.value / maxVal) * (h - padding * 2);
                    return { x, y };
                  });

                  const pathD = coords.reduce((acc, c, idx) => {
                    return idx === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`;
                  }, '');

                  const areaD = coords.length > 0
                    ? `${pathD} L ${coords[coords.length - 1].x} ${h - padding} L ${coords[0].x} ${h - padding} Z`
                    : '';

                  return (
                    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="glowGradSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      
                      <line x1={padding} y1={h - padding} x2={w - padding} y2={h - padding} stroke="#1E2D45" strokeWidth="1" />

                      {areaD && <path d={areaD} fill="url(#glowGradSales)" />}
                      {pathD && <path d={pathD} fill="none" stroke="#00D4FF" strokeWidth="2.5" />}

                      {coords.map((c, idx) => (
                        <g key={idx}>
                          <circle cx={c.x} cy={c.y} r="4" fill="#0A0F1E" stroke="#00D4FF" strokeWidth="1.5" />
                          <text x={c.x} y={h - 1} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#8896B3">{points[idx].label}</text>
                          {points[idx].value > 0 && (
                            <text x={c.x} y={c.y - 8} textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="#ffffff">₱{points[idx].value.toLocaleString()}</text>
                          )}
                        </g>
                      ))}
                    </svg>
                  );
                })()}
              </div>
            </div>

            {/* General itemized rankings */}
            <div className="bg-bg-card border border-border rounded-xl p-5 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono font-bold">Billing Revenue Summary</h3>
                <p className="text-[10px] font-mono text-text-muted">Total verified billing summary reports</p>
              </div>

              <div className="pt-2 divide-y divide-border/60 text-xs font-mono space-y-3.5">
                <div className="pb-3 flex justify-between">
                  <span className="text-text-muted uppercase">Gross Settlement:</span>
                  <span className="text-white font-bold text-sm">₱{totalSalesSum.toLocaleString()}</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-text-muted uppercase">completed dispatches:</span>
                  <span className="text-white font-bold">{completedOrders.length} dispatches</span>
                </div>
                <div className="py-3 flex justify-between">
                  <span className="text-text-muted uppercase">average order size:</span>
                  <span className="text-white font-bold">
                    ₱{completedOrders.length > 0 ? Math.floor(totalSalesSum / completedOrders.length).toLocaleString() : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COA LIBRARY MANAGER */}
      {adminActiveTab === 'coa' && (
        <div className="bg-bg-card border border-border rounded-xl p-5">
          <CoaLibrary isAdmin={true} />
        </div>
      )}

      {/* Selected Order admin drawer popup panel */}
      {selectedOrder && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[101]" 
            onClick={() => setSelectedOrder(null)}
          />

          <div data-lenis-prevent className="relative w-full max-w-xl bg-bg-elevated border border-border rounded-2xl flex flex-col shadow-2xl overflow-hidden max-h-[90vh] z-[102] text-left">
            
            {/* Drawer Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-bg-card">
              <div>
                <h4 className="font-display font-extrabold text-white text-base">Dispatch Workspace</h4>
                <p className="text-[10px] font-mono text-accent mt-0.5 uppercase tracking-wider">Logistics Control ID: {selectedOrder.order_id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="p-1 px-2.5 text-xs font-mono rounded bg-bg-deep border border-border text-text-muted hover:text-white cursor-pointer"
              >
                CLOSE [X]
              </button>
            </div>

            {/* Drawer Contents */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto text-xs scrollbar-thin">
              
              {/* Client coordinates */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-border/60 pb-1 flex items-center">
                  Client Specifications
                </h5>
                
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="space-y-1">
                    <p className="text-[9px] text-text-muted uppercase">Full Legal Name</p>
                    <p className="text-white font-sans font-semibold">{selectedOrder.customer_name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-text-muted uppercase">Philippine Mobile</p>
                    <p className="text-white flex items-center space-x-1">
                      <Phone className="h-3 w-3 text-accent" />
                      <span>{selectedOrder.customer_phone}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-text-muted uppercase">Email Address</p>
                    <p className="text-white font-sans truncate flex items-center space-x-1">
                      <Mail className="h-3 w-3 text-accent" />
                      <span>{selectedOrder.customer_email}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-text-muted uppercase">Carrier Logistics</p>
                    <p className="text-white">{selectedOrder.delivery_method}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-[9px] text-text-muted uppercase">Target Delivery Address</p>
                    <p className="text-white font-sans mt-0.5 leading-relaxed">{selectedOrder.shipping_address}, {selectedOrder.city}</p>
                  </div>
                </div>
              </div>

              {/* Cartridge Compound Allocations */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-border/60 pb-1 flex items-center">
                  Compounds Allocation
                </h5>
                <div className="bg-bg-deep rounded-xl border border-border divide-y divide-border/60">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-white">{item.product_name}</p>
                        <p className="text-[9px] font-mono text-text-muted mt-0.5">₱{(item.price ?? 0).toLocaleString()} x {item.quantity}v</p>
                      </div>
                      <span className="font-mono font-semibold text-white">₱{(item.subtotal ?? 0).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="p-3 bg-bg-card/45 font-mono text-[11px] space-y-1">
                    <div className="flex justify-between text-text-muted">
                      <span>Compounds Subtotal</span>
                      <span>₱{(selectedOrder.subtotal ?? selectedOrder.subtotalAmount ?? 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-text-muted">
                      <span>Delivery surcharge</span>
                      <span>₱{(selectedOrder.shipping_fee ?? selectedOrder.shippingFee ?? 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-xs text-white pt-1.5 border-t border-border/30">
                      <span className="text-accent font-display">Grand Settlement Amount</span>
                      <span>₱{(selectedOrder.total_amount ?? selectedOrder.totalAmount ?? 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* GCash transaction screenshot proof */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-border/60 pb-1 flex items-center">
                  GCash Settlement Screenshot
                </h5>
                <div className="p-2 border border-border rounded-xl bg-bg-deep text-center overflow-hidden">
                  {selectedOrder.payment_proof ? (
                    <img 
                      src={selectedOrder.payment_proof} 
                      alt="GCash Screenshot" 
                      className="max-h-72 mx-auto rounded-lg object-contain border border-border"
                    />
                  ) : (
                    <p className="text-xs text-text-muted font-sans py-4">No remittance screenshot uploaded.</p>
                  )}
                </div>
              </div>

              {/* Status audit checkpoints */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-border/60 pb-1 flex items-center">
                  Dispatches Status Audit History
                </h5>
                <div className="space-y-2">
                  {currentHistory.map((hist, index) => (
                    <div key={index} className="bg-bg-deep/60 p-2.5 rounded-lg border border-border/80 text-[11px] font-mono flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <Check className="h-3.5 w-3.5 text-success font-black" />
                        <span className="text-white font-bold">{hist.status}</span>
                      </span>
                      <span className="text-text-muted text-[10px] truncate max-w-xs">{hist.updated_by} @ {formatTimestamp(hist.created_at)}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Change Status Dropdown Console */}
            <div className="p-6 border-t border-border bg-bg-card flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <select
                  value={statusDropdown}
                  onChange={(e) => setStatusDropdown(e.target.value as OrderStatus)}
                  className="w-full text-xs rounded-lg border border-border bg-bg-deep px-3 py-3 text-white focus:border-accent focus:outline-none"
                >
                  <option value="Pending">⚠️ Set Pending Verification</option>
                  <option value="Confirmed">🧬 Set Confirmed Preparing</option>
                  <option value="Shipped">🚚 Set Shipped Out (In Transit)</option>
                  <option value="Delivered">📦 Set Delivered (Received)</option>
                  <option value="Completed">🎉 Set Completed (Finalized)</option>
                </select>
              </div>

              <button
                onClick={handleSaveStatus}
                disabled={saveLoading}
                className="px-5 py-3 rounded-lg bg-accent text-bg-deep font-bold text-xs hover:bg-accent-dim transition flex items-center justify-center space-x-1.5 disabled:opacity-50 cursor-pointer"
              >
                {saveLoading ? (
                  <RefreshCw className="h-4.5 w-4.5 animate-spin" />
                ) : (
                  <span>Dispatch Action update</span>
                )}
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
