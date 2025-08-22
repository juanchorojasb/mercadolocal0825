// components/cart/CartButton.tsx
'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export function CartButton() {
  const { summary, isOpen, setIsOpen } = useCart();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed bottom-6 right-6 z-30 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
    >
      <ShoppingCart className="h-6 w-6" />
      {summary.totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
          {summary.totalItems > 99 ? '99+' : summary.totalItems}
        </span>
      )}
    </button>
  );
}
