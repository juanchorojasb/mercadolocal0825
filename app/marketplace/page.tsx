'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Star, ShoppingCart, Heart, Eye, Zap, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  seller: {
    name: string;
    verified: boolean;
  };
  featured: boolean;
  discount?: number;
}

const CATEGORIES = [
  'Todos',
  'Alimentos',
  'Artesanías',
  'Servicios',
  'Tecnología',
  'Hogar',
  'Moda',
  'Salud'
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Café Premium de Caldas',
    description: 'Café 100% arábica cultivado en las montañas de Caldas',
    price: 25000,
    image: '/api/placeholder/300/200',
    category: 'Alimentos',
    location: 'Manizales',
    rating: 4.8,
    reviews: 156,
    seller: { name: 'Finca El Recuerdo', verified: true },
    featured: true,
    discount: 15
  },
  {
    id: '2',
    name: 'Artesanía en Guadua',
    description: 'Hermosas piezas decorativas hechas a mano con guadua local',
    price: 45000,
    image: '/api/placeholder/300/200',
    category: 'Artesanías',
    location: 'Salamina',
    rating: 4.9,
    reviews: 89,
    seller: { name: 'Taller Bambú', verified: true },
    featured: true
  },
  {
    id: '3',
    name: 'Miel de Abejas Orgánica',
    description: 'Miel pura extraída de colmenas en el paisaje cafetero',
    price: 18000,
    image: '/api/placeholder/300/200',
    category: 'Alimentos',
    location: 'Anserma',
    rating: 4.7,
    reviews: 234,
    seller: { name: 'Apiario San José', verified: false },
    featured: false
  },
  {
    id: '4',
    name: 'Ruana de Lana Virgen',
    description: 'Ruana tradicional tejida a mano con lana 100% natural',
    price: 120000,
    image: '/api/placeholder/300/200',
    category: 'Moda',
    location: 'Aguadas',
    rating: 4.6,
    reviews: 67,
    seller: { name: 'Tejidos Ancestrales', verified: true },
    featured: false
  },
  {
    id: '5',
    name: 'Panela Artesanal',
    description: 'Panela tradicional procesada en trapiche de agua',
    price: 12000,
    image: '/api/placeholder/300/200',
    category: 'Alimentos',
    location: 'Supía',
    rating: 4.5,
    reviews: 145,
    seller: { name: 'Trapiche La Esperanza', verified: true },
    featured: false
  },
  {
    id: '6',
    name: 'Cerámica Decorativa',
    description: 'Piezas únicas de cerámica inspiradas en la cultura caldense',
    price: 35000,
    image: '/api/placeholder/300/200',
    category: 'Artesanías',
    location: 'La Dorada',
    rating: 4.4,
    reviews: 92,
    seller: { name: 'Alfarería Caldas', verified: false },
    featured: false
  }
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filtros y búsqueda
  const filteredProducts = useMemo(() => {
    let filtered = SAMPLE_PRODUCTS;

    // Filtro por categoría
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtro por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Descubre el <span className="text-yellow-300">Mercado Local</span> de Caldas
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Conectamos productores locales con consumidores, promoviendo la economía de nuestra región
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-200" />
                  <span className="text-green-100">+500 Vendedores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-200" />
                  <span className="text-green-100">Entregas Rápidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-200" />
                  <span className="text-green-100">Precios Justos</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-4">¡Productos Destacados!</h3>
                <div className="space-y-3">
                  {SAMPLE_PRODUCTS.filter(p => p.featured).slice(0, 3).map(product => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                        <Star className="h-6 w-6 text-yellow-300" />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-green-200 text-sm">{formatPrice(product.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid lg:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar productos, vendedores, ubicaciones..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categoría */}
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Ordenar */}
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{filteredProducts.length}</div>
              <div className="text-gray-600 text-sm">Productos encontrados</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {new Set(filteredProducts.map(p => p.location)).size}
              </div>
              <div className="text-gray-600 text-sm">Municipios</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {filteredProducts.filter(p => p.seller.verified).length}
              </div>
              <div className="text-gray-600 text-sm">Vendedores verificados</div>
            </div>
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length * 10) / 10}
              </div>
              <div className="text-gray-600 text-sm">Calificación promedio</div>
            </div>
          </div>
        </div>

        {/* Grid de Productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Imagen del producto */}
              <div className="relative">
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                    <span className="text-green-600 font-medium">Imagen del producto</span>
                  </div>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.featured && (
                    <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      DESTACADO
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Botones de acción */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className={`p-2 rounded-full transition-colors ${
                      favorites.includes(product.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
                    }`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                  <Link
                    href={`/marketplace/producto/${product.id}`}
                    className="p-2 bg-white text-gray-600 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Información del producto */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  {product.seller.verified && (
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      ✓ Verificado
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                {/* Ubicación y rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <MapPin className="h-4 w-4" />
                    {product.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                </div>

                {/* Precio y vendedor */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-xs text-gray-500">por {product.seller.name}</div>
                  </div>
                </div>

                {/* Botón de compra */}
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta cambiar los filtros o el término de búsqueda</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">¿Eres productor local?</h2>
          <p className="text-lg mb-6 text-green-100">
            Únete a nuestra plataforma y lleva tus productos a más hogares caldenses
          </p>
          <Link
            href="/vendedor"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Comienza a vender
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
