/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { Order, OrderStatus } from '../types.ts';
import { FileSpreadsheet, Play, Activity, Clock, Inbox, ChevronRight } from 'lucide-react';

interface MyOrdersProps {
  user: any;
  onTrackOrder: (orderId: string) => void;
}

export default function MyOrders({ user, onTrackOrder }: MyOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const ordersColRef = collection(db, 'orders');
    
    // Query personal client orders by e-mail coordinates
    const q = query(
      ordersColRef, 
      where('customer_email', '==', user.email),
      orderBy('created_at', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const orderList: Order[] = [];
      snapshot.forEach(docSnap => {
        orderList.push(docSnap.data() as Order);
      });
      setOrders(orderList);
      setLoading(false);
    }, (err) => {
      setLoading(false);
      try {
        handleFirestoreError(err, OperationType.LIST, 'orders');
      } catch (e) {
        console.warn("Caught Firestore permission error in MyOrders for orders list:", e);
      }
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return (
      <div className="py-20 text-center rounded-2xl border border-border bg-bg-card max-w-md mx-auto">
        <Activity className="h-10 w-10 text-accent mx-auto mb-3.5 animate-pulse" />
        <h3 className="font-display font-extrabold text-white text-base">Authentication Required</h3>
        <p className="text-xs text-text-muted mt-1 max-w-xs mx-auto">Sign in with your Google account in the navbar to audit your peptide order ledgers.</p>
      </div>
    );
  }

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch(status) {
      case 'Pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'Confirmed': return 'text-sky-400 bg-sky-500/10 border-sky-400/20';
      case 'Shipped': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-muted bg-border/20 border-border/15';
    }
  };

  const formatTimestamp = (ts: any) => {
    if (!ts) return 'Analyzing';
    
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

    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" id="my-orders-dashboard">
      
      {/* Title block */}
      <div className="border-b border-border pb-4.5">
        <h3 className="font-display font-extrabold text-xl text-white">Your Peptide Purge Ledgers</h3>
        <p className="text-xs text-text-muted mt-1 leading-normal">Audit historical purchases and monitor active dispatch pathways in real-time.</p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin mx-auto" />
          <p className="text-xs text-text-muted mt-4 font-mono uppercase tracking-wider animate-pulse">Retrieving diagnostic orders...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="bg-bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-bg-deep/40 font-mono text-text-muted text-[10px] uppercase border-b border-border">
                  <th className="p-4 pl-6">Order ID</th>
                  <th className="p-4">Purchase Date</th>
                  <th className="p-4">Allocated Compounds</th>
                  <th className="p-4">Total Settled</th>
                  <th className="p-4">Logistics Status</th>
                  <th className="p-4 pr-6 text-right">Pathway Tracker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-text-primary/90">
                {orders.map(o => (
                  <tr key={o.order_id} className="hover:bg-white/[0.01] transition-colors">
                    
                    <td className="p-4 pl-6 font-mono font-bold text-accent tracking-widest">
                      {o.order_id}
                    </td>

                    <td className="p-4 font-mono text-text-muted">
                      {formatTimestamp(o.created_at)}
                    </td>

                    <td className="p-4 font-sans text-xs">
                      <p className="font-medium text-white max-w-[200px] truncate">
                        {o.items.map(item => `${item.product_name} x${item.quantity}`).join(', ')}
                      </p>
                    </td>

                    <td className="p-4 font-mono font-semibold text-white">
                      ₱{o.total_amount.toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-mono ${getStatusBadgeStyle(o.status)}`}>
                        {o.status}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => onTrackOrder(o.order_id)}
                        className="px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent hover:text-bg-deep text-accent text-[11px] font-bold flex items-center space-x-1 ml-auto group transition"
                      >
                        <span>Track Pathway</span>
                        <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-all text-current" />
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      ) : (
        <div className="py-16 text-center border border-dashed border-border bg-bg-card/40 rounded-2xl max-w-md mx-auto">
          <Inbox className="h-10 w-10 text-text-muted/50 mx-auto mb-3" />
          <h4 className="text-sm font-semibold text-white">No chemical history recorded</h4>
          <p className="text-xs text-text-muted max-w-xs mx-auto mt-1 leading-relaxed">
            You currently have no registered compound dispatches. Place your first peptide order to initialize logs.
          </p>
        </div>
      )}

    </div>
  );
}
