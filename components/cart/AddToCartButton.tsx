// components/cart/AddToCartButton.tsx
'use client';

import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    store: {
      name: string;
      city?: string;
      state?: string;
    };
  };
  className?: string;
}

export function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, 1);
    setIsAdded(true);
    
    // Reset animation after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`transition-all duration-300 font-medium rounded-lg flex items-center justify-center gap-2 ${
        isAdded
          ? 'bg-green-700 text-white scale-105'
          : 'bg-green-600 hover:bg-green-700 text-white hover:scale-105'
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4" />
          ¡Agregado!
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Agregar al carrito
        </>
      )}
    </button>
  );
}
