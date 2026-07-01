/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CoaSummary {
  purity: string;
  appearance: string;
  batchNo: string;
  testDate: string;
  method: string;
}

export interface Product {
  // Shared properties
  id: string | number;
  name: string;
  price: number;

  // vpep properties
  description?: string;
  concentration?: string;
  category?: string;
  coaUrl?: string;
  coaSummary?: CoaSummary;
  dosageDefaultMg?: number;

  // P Project properties
  unit?: string;
  stock?: number;
  cat?: string;
  desc?: string;
  image?: string;
  abbr?: string;
  popularity?: number;
}

export interface CartItem {
  // vpep structure
  product?: Product;
  quantity?: number;

  // P Project structure
  id?: string | number;
  name?: string;
  unit?: string;
  price?: number;
  qty?: number;
  stock?: number;
  image?: string;
  abbr?: string;
  selectedAddonId?: string;
  selectedAddonName?: string;
  selectedAddonPrice?: number;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { label: string; value: string; icon: string }[];
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Completed';

export interface Order {
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  delivery_method: 'Lalamove' | 'GrabExpress';
  payment_method: 'GCash';
  payment_proof: string; // Base64 encoded screenshot string
  items: OrderItem[];
  subtotal: number;
  shipping_fee: number;
  total_amount: number;
  status: OrderStatus;
  created_at: any; // Firestore Timestamp
  updated_at: any; // Firestore Timestamp
}

export interface OrderStatusHistory {
  status: OrderStatus;
  updated_by: string;
  created_at: any; // Firestore Timestamp
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
