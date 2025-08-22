// hooks/useCart.ts
'use client';

import { useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  store: {
    name: string;
    city?: string;
    state?: string;
  };
  quantity: number;
  maxQuantity?: number;
}

interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const SHIPPING_RATE = 5000; // $5.000 COP
const TAX_RATE = 0.19; // 19% IVA

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito del localStorage al inicializar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('mercadolocal_cart');
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mercadolocal_cart', JSON.stringify(items));
    }
  }, [items]);

  // Agregar producto al carrito
  const addItem = useCallback((product: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Si ya existe, actualizar cantidad
        const newItems = [...currentItems];
        const currentQuantity = newItems[existingItemIndex].quantity;
        const maxQuantity = product.maxQuantity || 10;
        const newQuantity = Math.min(currentQuantity + quantity, maxQuantity);
        
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity
        };
        return newItems;
      } else {
        // Si no existe, agregar nuevo item
        return [...currentItems, { ...product, quantity }];
      }
    });
    
    // Abrir carrito cuando se agregue un item
    setIsOpen(true);
  }, []);

  // Actualizar cantidad de un producto
  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.min(quantity, item.maxQuantity || 10) }
          : item
      )
    );
  }, []);

  // Remover producto del carrito
  const removeItem = useCallback((productId: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  }, []);

  // Limpiar carrito completo
  const clearCart = useCallback(() => {
    setItems([]);
    setIsOpen(false);
  }, []);

  // Calcular resumen del carrito
  const summary: CartSummary = {
    items,
    totalItems: items.reduce((total, item) => total + item.quantity, 0),
    subtotal: items.reduce((total, item) => total + (item.price * item.quantity), 0),
    shipping: items.length > 0 ? SHIPPING_RATE : 0,
    tax: 0, // Calculado después
    total: 0 // Calculado después
  };

  summary.tax = summary.subtotal * TAX_RATE;
  summary.total = summary.subtotal + summary.shipping + summary.tax;

  return {
    items,
    summary,
    isOpen,
    setIsOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    isEmpty: items.length === 0
  };
}
