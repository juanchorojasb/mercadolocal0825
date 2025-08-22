'use client';

import { CartButton } from './CartButton';
import { CartSlideOver } from './CartSlideOver';

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartButton />
      <CartSlideOver />
    </>
  );
}
