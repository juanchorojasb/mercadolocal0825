import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { CartProvider } from '@/components/cart/CartProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Academia Mercado Local Caldas',
  description: 'Plataforma de educación y marketplace para emprendedores de Caldas',
  keywords: 'emprendimiento, caldas, marketplace, academia, cursos',
  authors: [{ name: 'Mercado Local Caldas' }],
  openGraph: {
    title: 'Academia Mercado Local Caldas',
    description: 'Conectamos productores locales con consumidores, promoviendo la economía de nuestra región',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          <CartProvider>
            {children}
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
