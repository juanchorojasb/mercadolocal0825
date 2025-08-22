'use client';

import { useParams } from 'next/navigation';
import { CheckCircle, Package, Truck, CreditCard, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string || "unknown";

  // Si no hay orderId, mostrar error
  if (!params?.orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pedido no encontrado</h1>
          <p className="text-gray-600 mb-6">No se pudo encontrar la información del pedido.</p>
          <Link
            href="/marketplace"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Volver al Marketplace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pedido Confirmado!
          </h1>
          
          <p className="text-gray-600 mb-2">
            Tu pedido <span className="font-mono text-green-600">#{orderId}</span> ha sido procesado exitosamente.
          </p>
          
          <p className="text-gray-600 mb-8">
            Recibirás un email de confirmación con los detalles de tu pedido.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <Package className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Preparación</h3>
              <p className="text-sm text-gray-600">1-2 días hábiles</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Truck className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-gray-900">Entrega</h3>
              <p className="text-sm text-gray-600">3-5 días hábiles</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/dashboard/orders"
              className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Ver mis pedidos
            </Link>
            <Link
              href="/marketplace"
              className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-medium transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
