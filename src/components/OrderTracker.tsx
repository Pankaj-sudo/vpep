/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { doc, onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { Order, OrderStatus, OrderStatusHistory } from '../types.ts';
import { Search, MapPin, Calendar, Clock, CheckCircle2, Circle, AlertTriangle, RefreshCw } from 'lucide-react';

interface OrderTrackerProps {
  initialOrderId?: string;
  toast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export default function OrderTracker({ initialOrderId = '', toast }: OrderTrackerProps) {
  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState(initialOrderId);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [historyData, setHistoryData] = useState<OrderStatusHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Auto trigger tracking if loaded from success state
  useEffect(() => {
    if (initialOrderId) {
      setOrderIdInput(initialOrderId);
      setActiveOrderId(initialOrderId);
    }
  }, [initialOrderId]);

  // Set up real-time listener whenever activeOrderId state updates
  useEffect(() => {
    if (!activeOrderId.trim()) {
      setOrderData(null);
      setHistoryData([]);
      return;
    }

    setLoading(true);
    setErrorText('');

    const orderDocRef = doc(db, 'orders', activeOrderId.trim());

    // 1. Listen to Order Document in real-time
    const unsubscribeOrder = onSnapshot(orderDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as Order;
        setOrderData(data);
        setErrorText('');
      } else {
        setOrderData(null);
        setErrorText(`No peptide shipment found with identifier: '${activeOrderId}'`);
      }
      setLoading(false);
    }, (err) => {
      setLoading(false);
      try {
        handleFirestoreError(err, OperationType.GET, `orders/${activeOrderId}`);
      } catch (fErr) {
        setErrorText("You must sign in to track or view private order datasets.");
      }
    });

    // 2. Listen to Subcollection for Status Timeline history
    const historySubRef = collection(db, `orders/${activeOrderId}/status_history`);
    const historyQuery = query(historySubRef, orderBy('created_at', 'asc'));

    const unsubscribeHistory = onSnapshot(historyQuery, (querySnap) => {
      const historyList: OrderStatusHistory[] = [];
      querySnap.forEach(hDoc => {
        historyList.push(hDoc.data() as OrderStatusHistory);
      });
      setHistoryData(historyList);
    }, (err) => {
      console.warn("Subcollection history tracking failed, falling back inline");
    });

    return () => {
      unsubscribeOrder();
      unsubscribeHistory();
    };
  }, [activeOrderId]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      toast("Please inputs a valid peptide order code", 'error');
      return;
    }
    setActiveOrderId(orderIdInput.trim().toUpperCase());
  };

  // Convert firestore timestamp or date payload safely
  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Pending check';
    
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Define steps
  const steps: { key: OrderStatus; title: string; desc: string }[] = [
    { key: 'Pending', title: 'Order Registered', desc: 'Laboratory receipt pending GCash payment validation.' },
    { key: 'Confirmed', title: 'Batch Confirmed', desc: 'Acertified biologist confirmed payment. Preparing peptide vial aliquots.' },
    { key: 'Shipped', title: 'En Route', desc: 'Out for local dispatch via GrabExpress/Lalamove. Rider en route.' }
  ];

  const getStepStatus = (stepKey: OrderStatus) => {
    if (!orderData) return 'pending';
    
    const statusMap: Record<OrderStatus, number> = {
      'Pending': 1,
      'Confirmed': 2,
      'Shipped': 3
    };

    const currentIdx = statusMap[orderData.status] || 1;
    const stepIdx = statusMap[stepKey];

    if (currentIdx > stepIdx) return 'completed';
    if (currentIdx === stepIdx) return 'active';
    return 'pending';
  };

  const getHistoryTimeForStatus = (statusKey: OrderStatus) => {
    const match = historyData.find(h => h.status === statusKey);
    if (match) return formatTimestamp(match.created_at);
    
    // Fallback directly to order date fields
    if (statusKey === 'Pending' && orderData) return formatTimestamp(orderData.created_at);
    if (statusKey === orderData?.status) return formatTimestamp(orderData.updated_at);

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" id="order-tracker-portal">
      
      {/* Centered tracking search panel */}
      <div className="bg-bg-card p-6 rounded-2xl border border-border text-center shadow-md">
        <h3 className="font-display font-extrabold text-xl text-white">Compound Dispatch Tracker</h3>
        <p className="text-xs text-text-muted mt-1 leading-normal">Enter your 8-digit randomized PT-XXXXXX order reference below.</p>
        
        <form onSubmit={handleTrackSubmit} className="mt-5 max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="PT-NSBQ3A"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
              className="w-full text-xs rounded-lg border border-border bg-bg-deep pl-10 pr-3 py-3 text-white focus:border-accent focus:outline-none font-mono uppercase placeholder-text-muted/50 font-bold"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-lg bg-accent text-bg-deep font-bold text-xs hover:bg-accent-dim hover:shadow-[0_0_12px_rgba(0,212,255,0.2)] transition flex items-center space-x-1.5"
          >
            {loading ? (
              <RefreshCw className="h-3 w-3 animate-spin" />
            ) : (
              <span>Track</span>
            )}
          </button>
        </form>
      </div>

      {/* Loading state indicator */}
      {loading && (
        <div className="py-12 text-center rounded-2xl border border-border bg-bg-card/40">
          <div className="h-7 w-7 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-text-muted mt-3 animate-pulse font-mono uppercase tracking-wider">Syncing database node...</p>
        </div>
      )}

      {/* Error state */}
      {errorText && !loading && (
        <div className="p-5 rounded-2xl border border-danger/20 bg-danger/5 flex items-start space-x-3 max-w-2xl">
          <AlertTriangle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-white">Tracking Dispatch Failed</h4>
            <p className="text-xs text-text-primary/80 mt-1 leading-relaxed">{errorText}</p>
          </div>
        </div>
      )}

      {/* Order tracing timeline card */}
      {orderData && !loading && (
        <div className="bg-bg-card rounded-2xl border border-border overflow-hidden shadow-xl animate-in fade-in duration-200">
          {/* Header metadata summary */}
          <div className="p-6 bg-bg-deep/40 border-b border-border text-xs flex flex-wrap gap-y-3 justify-between items-center">
            <div>
              <p className="text-[10px] font-mono text-text-muted uppercase">Peptide Cargo Code</p>
              <p className="text-sm font-mono font-bold text-white tracking-wide mt-0.5">{orderData.order_id}</p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-text-muted uppercase">Dispatch Target</p>
              <p className="font-semibold text-white mt-0.5">{orderData.customer_name}</p>
            </div>

            <div>
              <p className="text-[10px] font-mono text-text-muted uppercase">Logistics Settlement</p>
              <p className="font-mono font-bold text-accent mt-0.5">₱{orderData.total_amount.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-b border-border pb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-accent" /> Shipment Milestones & Timeline
            </h4>

            {/* Stepper Timeline Visual render */}
            <div className="relative pl-6 space-y-12 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-border/60">
              
              {steps.map((st, idx) => {
                const statusType = getStepStatus(st.key);
                const matchingTime = getHistoryTimeForStatus(st.key);

                return (
                  <div key={st.key} className="relative group">
                    {/* Stepper Dot */}
                    <div className="absolute -left-[29px] top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-bg-card">
                      {statusType === 'completed' && (
                        <div className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-accent text-bg-deep border border-accent">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      )}
                      
                      {statusType === 'active' && (
                        <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-accent/25 border border-accent animate-pulse">
                          <div className="h-2 w-2 rounded-full bg-accent" />
                        </div>
                      )}

                      {statusType === 'pending' && (
                        <div className="h-4 w-4 rounded-full border border-border bg-bg-deep" />
                      )}
                    </div>

                    {/* Step Card Text details */}
                    <div className="pl-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                        <h5 className={`text-sm font-bold ${statusType === 'active' ? 'text-accent' : statusType === 'completed' ? 'text-white' : 'text-text-muted/80'}`}>
                          {st.title}
                        </h5>
                        
                        {matchingTime && (
                          <span className="text-[10px] font-mono text-text-muted flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {matchingTime}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-xs text-text-muted mt-1 leading-normal max-w-md">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Shipment address bottom bar */}
            <div className="pt-6 border-t border-border/60 text-xs flex items-start space-x-3 text-text-muted">
              <MapPin className="h-4.5 w-4.5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[9px] font-mono text-text-muted uppercase">Destination coordinates ({orderData.delivery_method})</p>
                <p className="text-text-primary font-medium mt-1 leading-relaxed">
                  {orderData.shipping_address}, {orderData.city}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
