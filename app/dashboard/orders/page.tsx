// app/dashboard/orders/page.tsx
'use client';

import { Package, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

const MOCK_ORDERS = [
  {
    id: 'order-1692847392',
    status: 'delivered',
    total: 87500,
    items: 3,
    date: '2025-08-20',
    estimatedDelivery: '2025-08-23'
  },
  {
    id: 'order-1692847393',
    status: 'shipped',
    total: 45000,
    items: 2,
    date: '2025-08-22',
    estimatedDelivery: '2025-08-25'
  }
];

const STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  confirmed: { label: 'Confirmado', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  shipped: { label: 'Enviado', color: 'bg-purple-100 text-purple-800', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-800', icon: Package }
};

export default function OrdersPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis Pedidos</h1>
        <p className="text-gray-600">Historial y estado de tus compras</p>
      </div>

      <div className="space-y-6">
        {MOCK_ORDERS.map((order) => {
          const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
          const StatusIcon = statusConfig.icon;

          return (
            <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Pedido #{order.id}</h3>
                  <p className="text-sm text-gray-600">Realizado el {formatDate(order.date)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusConfig.color}`}>
                  <StatusIcon className="h-4 w-4" />
                  {statusConfig.label}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="font-semibold text-lg text-green-600">{formatPrice(order.total)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Productos</p>
                  <p className="font-medium">{order.items} artículos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Entrega estimada</p>
                  <p className="font-medium">{formatDate(order.estimatedDelivery)}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                  Ver detalles
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition-colors">
                  Rastrear pedido
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {MOCK_ORDERS.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes pedidos aún</h3>
          <p className="text-gray-600 mb-6">¡Explora nuestro marketplace y realiza tu primera compra!</p>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Ir al Marketplace
          </Link>
        </div>
      )}
    </div>
  );
}
