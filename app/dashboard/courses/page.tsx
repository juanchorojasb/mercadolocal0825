'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CoursesPage() {
  const [activeTab, setActiveTab] = useState('formacion-vivo')

  const sesionesGrabadas = [
    {
      id: 1,
      titulo: "Sesión 1: Transformación Digital Norte de Caldas",
      fecha: "27 de Agosto, 2025",
      duracion: "1h 30min",
      descripcion: "Conceptos fundamentales y introducción a la transformación digital",
      videoUrl: "https://iframe.mediadelivery.net/play/481547/5bb91813-21a3-428e-ae3a-78a9b03ecf63"
    }
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Norte de Caldas */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏛️</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Formaciones Norte de Caldas</h1>
            <p className="text-gray-600">Programa oficial de transformación digital con IA</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">🎯 Proyecto #4 - Norte de Caldas</h2>
              <p className="text-gray-600">50 emprendedores seleccionados • Agosto-Septiembre 2025</p>
              <p className="text-gray-600">Sesiones en vivo: Miércoles 7:00 PM • Inicia 27 de agosto</p>
            </div>
            <div className="text-right">
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">GANADOR 2024</div>
              <div className="text-sm text-gray-600 mt-1">Fondo CTeI Caldas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navegación de Secciones */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab('formacion-vivo')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'formacion-vivo' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            📚 Formación en Vivo
          </button>
          <button 
            onClick={() => setActiveTab('videos-grabados')}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              activeTab === 'videos-grabados' 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:bg-white hover:text-gray-900'
            }`}
          >
            🎥 Videos Grabados
          </button>
        </div>
      </div>

      {/* Contenido de Formación en Vivo */}
      {activeTab === 'formacion-vivo' && (
        <div className="space-y-8">
          {/* NIVEL 1: Sesiones 1-3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🌱</span>
                  <div>
                    <h3 className="text-2xl font-bold">NIVEL 1</h3>
                    <p className="text-lg font-semibold">Fundamentos de IA para Emprendedores</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-80">Sesiones 1-3</div>
                  <div className="font-bold">3 miércoles</div>
                  <div className="text-sm opacity-80">⏰ 7:00 PM</div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">
                Establece las bases para dialogar con la IA de manera efectiva.
                Domina el arte de los prompts para desarrollar tu branding y propuesta de valor.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span>📚</span> Módulos:
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• M0: Desmitificando la IA para Emprendedores</li>
                    <li>• M1: Universo de LLMs y Estrategia de Marca</li>
                    <li>• M2: Prompts Ganadores para Branding</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <span>📅</span> Calendario:
                  </h4>
                  <div className="text-gray-600 space-y-1">
                    <div>• Miércoles 27 agosto</div>
                    <div>• Miércoles 3 septiembre</div>
                    <div>• Miércoles 10 septiembre</div>
                    <div className="font-semibold mt-2">⏰ 7:00 PM - 8:30 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido de Videos Grabados */}
      {activeTab === 'videos-grabados' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
              <span>🎥</span> Biblioteca de Videos Grabados
            </h3>
            
            {/* Sesiones Grabadas */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-6">Sesiones Completadas</h4>
              <div className="grid gap-6">
                {sesionesGrabadas.map((sesion) => (
                  <div key={sesion.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                            ✅ DISPONIBLE
                          </span>
                        </div>
                        <h5 className="text-lg font-bold text-gray-900 mb-2">
                          {sesion.titulo}
                        </h5>
                        <p className="text-gray-600 text-sm mb-2">
                          {sesion.descripcion}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{sesion.fecha}</span>
                          <span>•</span>
                          <span>{sesion.duracion}</span>
                        </div>
                      </div>
                      <div className="ml-6">
                        
                          href={sesion.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <span>▶️</span>
                          Ver Grabación
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximas secciones */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🎓</div>
                <h4 className="font-semibold mb-2">Tutoriales Básicos</h4>
                <p className="text-gray-600 text-sm mb-4">Videos introductorios a la IA</p>
                <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
                  Próximamente
                </button>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <div className="text-4xl mb-3">🛠️</div>
                <h4 className="font-semibold mb-2">Casos Prácticos</h4>
                <p className="text-gray-600 text-sm mb-4">Ejemplos reales aplicados</p>
                <button className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed">
                  Próximamente
                </button>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                Los videos estarán disponibles después de cada sesión en vivo
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
