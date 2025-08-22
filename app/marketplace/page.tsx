'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, MapPin, Star, ShoppingCart, Heart, Eye, Zap, TrendingUp, Users, ArrowRight, Loader2, AlertTriangle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '@/hooks/useProducts';

// Interfaz común para todos los productos
interface EnhancedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  createdAt: Date;
  store: {
    name: string;
    city?: string;
    state?: string;
  };
  featured: boolean;
  rating: number;
  reviews: number;
  discount?: number;
  location: string;
}

const CATEGORIES = [
  'Todos',
  'Alimentos',
  'Artesanías',
  'Servicios',
  'Tecnología',
  'Hogar',
  'Moda',
  'Salud',
  'Deportes',
  'Belleza'
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Cargar productos de la base de datos
  const { products: dbProducts, loading, error } = useProducts();

  // Convertir productos de BD al formato común
  const allProducts = useMemo((): EnhancedProduct[] => {
    // Productos de la base de datos con campos adicionales simulados
    const enhancedDbProducts: EnhancedProduct[] = dbProducts.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      createdAt: product.createdAt,
      store: {
        name: product.store.name,
        city: product.store.city,
        state: product.store.state,
      },
      featured: Math.random() > 0.7,
      rating: Number((4.0 + Math.random() * 1.0).toFixed(1)),
      reviews: Math.floor(Math.random() * 200) + 10,
      discount: Math.random() > 0.8 ? Math.floor(Math.random() * 25) + 5 : undefined,
      location: product.store.city && product.store.state 
        ? `${product.store.city}, ${product.store.state}`
        : product.store.city || product.store.state || 'Caldas'
    }));

    // Productos de ejemplo si no hay productos en BD
    const sampleProducts: EnhancedProduct[] = [
      {
        id: 'sample-1',
        name: 'Café Premium de Caldas',
        description: 'Café 100% arábica cultivado en las montañas de Caldas',
        price: 25000,
        image: undefined,
        category: 'Alimentos',
        createdAt: new Date(),
        store: {
          name: 'Finca El Recuerdo',
          city: 'Manizales',
          state: 'Caldas'
        },
        featured: true,
        rating: 4.8,
        reviews: 156,
        discount: 15,
        location: 'Manizales, Caldas'
      },
      {
        id: 'sample-2',
        name: 'Artesanía en Guadua',
        description: 'Hermosas piezas decorativas hechas a mano con guadua local',
        price: 45000,
        image: undefined,
        category: 'Artesanías',
        createdAt: new Date(),
        store: {
          name: 'Taller Bambú',
          city: 'Salamina',
          state: 'Caldas'
        },
        featured: true,
        rating: 4.9,
        reviews: 89,
        discount: undefined,
        location: 'Salamina, Caldas'
      },
      {
        id: 'sample-3',
        name: 'Miel de Abejas Orgánica',
        description: 'Miel pura extraída de colmenas en el paisaje cafetero',
        price: 18000,
        image: undefined,
        category: 'Alimentos',
        createdAt: new Date(),
        store: {
          name: 'Apiario San José',
          city: 'Anserma',
          state: 'Caldas'
        },
        featured: false,
        rating: 4.7,
        reviews: 234,
        discount: undefined,
        location: 'Anserma, Caldas'
      }
    ];

    // Retornar productos de BD o de ejemplo
    return enhancedDbProducts.length > 0 ? enhancedDbProducts : sampleProducts;
  }, [dbProducts]);

  // Filtros y búsqueda
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filtro por categoría
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filtro por búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.store.name.toLowerCase().includes(searchLower) ||
        product.location?.toLowerCase().includes(searchLower)
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
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'featured':
        default:
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return filtered;
  }, [allProducts, searchTerm, selectedCategory, sortBy]);

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

  // Estadísticas calculadas
  const stats = useMemo(() => {
    const uniqueLocations = new Set(
      filteredProducts.map(p => p.location).filter(Boolean)
    ).size;

    const averageRating = filteredProducts.length > 0
      ? filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length
      : 0;

    return {
      totalProducts: filteredProducts.length,
      uniqueLocations,
      averageRating: Math.round(averageRating * 10) / 10,
      totalStores: new Set(filteredProducts.map(p => p.store.name)).size
    };
  }, [filteredProducts]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <AlertTriangle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar productos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
                  <span className="text-green-100">+{stats.totalStores} Vendedores</span>
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
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredProducts.filter(p => p.featured).slice(0, 3).map(product => (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid lg:grid-cols-4 gap-4">
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
            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Destacados</option>
                <option value="newest">Más Recientes</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600">Cargando productos...</p>
          </div>
        )}

        {!loading && (
          <div className="mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalProducts}</div>
                <div className="text-gray-600 text-sm">Productos encontrados</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.uniqueLocations}</div>
                <div className="text-gray-600 text-sm">Ubicaciones</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalStores}</div>
                <div className="text-gray-600 text-sm">Tiendas activas</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{stats.averageRating}</div>
                <div className="text-gray-600 text-sm">Calificación promedio</div>
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                        <span className="text-green-600 font-medium text-center px-4">
                          {product.name}
                        </span>
                      </div>
                    )}
                  </div>
                  
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

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

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

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </div>
                      <div className="text-xs text-gray-500">por {product.store.name}</div>
                    </div>
                  </div>

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Agregar al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta cambiar los filtros o el término de búsqueda</p>
          </div>
        )}

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
