'use client';

import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import {
  BookOpen, Users, Trophy, Star, ArrowRight,
  Calendar, MessageCircle, TrendingUp, Target,
  MapPin, Clock, Award
} from 'lucide-react';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [planUsuario, setPlanUsuario] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const plan = user.unsafeMetadata?.plan as string;
      setPlanUsuario(plan);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const isProgramaGratuito = planUsuario === 'programa';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">MercadoLocal</h1>
              <span className="ml-3 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {isProgramaGratuito ? 'Programa de Formación' : 'Plan Premium'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ¡Hola, {user?.firstName || 'Emprendedor'}!
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Banner Sesión en Vivo */}
      <div className="bg-gradient-to-r from-red-600 via-orange-600 to-red-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-white">
                <h2 className="text-lg sm:text-xl font-bold flex items-center">
                  🔴 EN VIVO HOY
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    7:00 PM
                  </span>
                </h2>
                <p className="text-white/90 text-sm">
                  <strong>Transformación Digital Norte de Caldas</strong>
                </p>
                <p className="text-white/80 text-xs">
                  Miércoles, 27 de agosto • 7:00 – 8:30pm
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <a 
                href="https://meet.google.com/frx-deap-ixi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-red-600 hover:bg-red-50 font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 animate-pulse"
              >
                🚀 UNIRSE AHORA
              </a>
              
              <div className="sm:hidden text-center">
                <p className="text-white/80 text-xs">
                  📞 Teléfono: +593 95 866 6050
                </p>
                <p className="text-white/80 text-xs">
                  PIN: 312 459 368 0812
                </p>
              </div>
              
              <div className="hidden sm:block text-right">
                <p className="text-white/90 text-sm font-medium">
                  📞 Respaldo telefónico:
                </p>
                <p className="text-white/80 text-xs">
                  +593 95 866 6050
                </p>
                <p className="text-white/80 text-xs">
                  PIN: 312 459 368 0812
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-3">
            <p className="text-white/90 text-sm">
              ⚡ Primera sesión del programa - ¡No te la pierdas! ⚡
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isProgramaGratuito ? (
          /* Dashboard para Programa de Formación */
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🎓 Tu Programa de Formación
              </h2>
              <p className="text-gray-600">
                Bienvenido al programa gratuito del Norte de Caldas
              </p>
            </div>

            {/* Sección Psicognitiva Destacada */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white shadow-lg mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🧠</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">🤝 ALIANZA</span>
                    </div>
                    <h3 className="text-xl font-bold">Habilidades Blandas para Emprendedores</h3>
                    <p className="text-orange-100">Desarrolla inteligencia emocional y liderazgo</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-80">Modalidad Virtual</div>
                  <div className="font-bold">Certificación Psicognitiva</div>
                </div>
              </div>
              
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">📚 Módulos:</h4>
                  <ul className="space-y-1 text-sm text-orange-100">
                    <li>• Inteligencia Emocional Empresarial</li>
                    <li>• Liderazgo y Gestión de Equipos</li>
                    <li>• Comunicación Efectiva y Persuasión</li>
                    <li>• Manejo del Estrés y Resiliencia</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎯 Beneficios:</h4>
                  <ul className="space-y-1 text-sm text-orange-100">
                    <li>• Mejor toma de decisiones bajo presión</li>
                    <li>• Liderazgo más efectivo</li>
                    <li>• Mayor productividad personal</li>
                    <li>• Relaciones empresariales sólidas</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">Modalidad Virtual</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">Certificación Psicognitiva</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">Complementario a IA</span>
                </div>
                <a 
                  href="https://psicognitiva.thinkific.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Acceder a Psicognitiva →
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Progreso</p>
                    <p className="text-2xl font-semibold text-gray-900">15%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Calendar className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Próxima Sesión</p>
                    <p className="text-2xl font-semibold text-gray-900">Mié 27</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Compañeros</p>
                    <p className="text-2xl font-semibold text-gray-900">50</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Logros</p>
                    <p className="text-2xl font-semibold text-gray-900">3</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  📚 Tu Ruta de Aprendizaje
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      1
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Nivel 1: Fundamentos IA</p>
                      <p className="text-sm text-gray-600">3 sesiones - En progreso</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      2
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Nivel 2: Emprendedor Aumentado</p>
                      <p className="text-sm text-gray-600">2 sesiones - Próximamente</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      3
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Nivel 3: Marketing Digital</p>
                      <p className="text-sm text-gray-600">2 sesiones - Próximamente</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a 
                    href="/dashboard/courses" 
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block text-center"
                  >
                    Ver Academia Completa
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  🎯 Próximas Actividades
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-medium text-gray-900">Sesión 1: Desmitificando la IA</p>
                    <p className="text-sm text-gray-600">Miércoles 27 Agosto - 7:00 PM</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-medium text-gray-900">Sesión 2: Universo de LLMs</p>
                    <p className="text-sm text-gray-600">Miércoles 3 Septiembre - 7:00 PM</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="font-medium text-gray-900">Sesión 3: Prompts Ganadores</p>
                    <p className="text-sm text-gray-600">Miércoles 10 Septiembre - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Dashboard para otros planes */
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                🚀 Tu Marketplace
              </h2>
              <p className="text-gray-600">
                Panel de control de tu negocio en MercadoLocal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Ventas Este Mes</p>
                    <p className="text-2xl font-semibold text-gray-900">$850K</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Productos</p>
                    <p className="text-2xl font-semibold text-gray-900">12</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Clientes</p>
                    <p className="text-2xl font-semibold text-gray-900">246</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Star className="w-8 h-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Rating</p>
                    <p className="text-2xl font-semibold text-gray-900">4.8</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                🛍️ Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Target className="w-6 h-6 text-blue-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Agregar Producto</p>
                    <p className="text-sm text-gray-600">Sube un nuevo producto</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Mensajes</p>
                    <p className="text-sm text-gray-600">5 mensajes nuevos</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>

                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Estadísticas</p>
                    <p className="text-sm text-gray-600">Ver analíticas</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
