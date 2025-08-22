// hooks/useOrders.ts
'use client';

import { useState } from 'react';

export interface Order {
  id: string;
  items: any[];
  shipping: any;
  payment: any;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    setIsCreating(true);
    try {
      // Aquí conectarías con tu API real
      const newOrder: Order = {
        ...orderData,
        id: `order-${Date.now()}`,
        status: 'pending',
        createdAt: new Date()
      };

      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (error) {
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  return {
    orders,
    createOrder,
    isCreating
  };
}
