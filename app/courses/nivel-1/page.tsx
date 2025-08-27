import Link from 'next/link';
import { Clock, Users, BookOpen, Play, CheckCircle, Lock, Download } from 'lucide-react';

export default function Nivel1Page() {
  const courseData = {
    title: "Nivel 1: Fundamentos del Emprendimiento",
    description: "Construye las bases sólidas de tu emprendimiento. Aprende a identificar oportunidades, validar ideas y crear tu modelo de negocio inicial.",
    duration: "4 semanas",
    level: "Principiante",
    students: 150,
    sessions: [
      {
        id: 1,
        title: "Mentalidad Emprendedora",
        date: "Martes 27 de agosto",
        time: "7:00 PM - 9:00 PM",
        status: "available",
        topics: [
          "¿Qué es el emprendimiento?",
          "Características del emprendedor exitoso",
          "Mitos y realidades del emprendimiento",
          "Mindset de crecimiento vs. fijo"
        ],
        resources: ["Guía PDF", "Ejercicios prácticos", "Video explicativo"]
      },
      {
        id: 2,
        title: "Identificación de Oportunidades",
        date: "Miércoles 27 de Agosto",
        time: "7:00 PM - 9:00 PM",
        status: "upcoming",
        topics: [
          "Cómo detectar problemas en el mercado",
          "Técnicas de observación y análisis",
          "Matriz de oportunidades",
          "Evaluación de viabilidad inicial"
        ],
        resources: ["Template de análisis", "Checklist de oportunidades", "Casos de estudio"]
      },
      {
        id: 3,
        title: "Validación de Ideas",
        date: "Viernes 29 de Agosto",
        time: "7:00 PM - 9:00 PM",
        status: "upcoming",
        topics: [
          "Metodología Lean Startup",
          "Creación de hipótesis",
          "Técnicas de validación rápida",
          "Interpretación de resultados"
        ],
        resources: ["Canvas de validación", "Scripts de entrevistas", "Herramientas digitales"]
      },
      {
        id: 4,
        title: "Modelo de Negocio Básico",
        date: "Lunes 1 de Septiembre",
        time: "7:00 PM - 9:00 PM",
        status: "upcoming",
        topics: [
          "Business Model Canvas",
          "Propuesta de valor",
          "Segmentos de clientes",
          "Fuentes de ingresos básicas"
        ],
        resources: ["Canvas imprimible", "Ejemplos reales", "Plantilla digital"]
      },
      {
        id: 5,
        title: "Primeros Pasos y Planificación",
        date: "Miércoles 3 de Septiembre",
        time: "7:00 PM - 9:00 PM",
        status: "upcoming",
        topics: [
          "Plan de acción inmediato",
          "Recursos necesarios mínimos",
          "Cronograma de implementación",
          "Preparación para Nivel 2"
        ],
        resources: ["Template de plan", "Cronograma editable", "Lista de recursos"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav className="mb-8">
            <Link href="/academia" className="text-blue-200 hover:text-white transition-colors">
              ← Volver a Academia
            </Link>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-blue-500/30 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/30 px-3 py-1 rounded-full">
                  <BookOpen className="h-4 w-4" />
                  <span>{courseData.level}</span>
                </div>
                <div className="flex items-center space-x-2 bg-blue-500/30 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4" />
                  <span>{courseData.students} estudiantes</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">¿Qué lograrás?</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Desarrollar mentalidad emprendedora</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Identificar oportunidades de negocio</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Validar tu idea emprendedora</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Crear tu primer modelo de negocio</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sessions */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sesiones del Curso</h2>
          
          <div className="space-y-6">
            {courseData.sessions.map((session, index) => (
              <div key={session.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                        session.status === 'available' ? 'bg-green-500' :
                        session.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-400'
                      }`}>
                        {session.status === 'available' ? <CheckCircle className="h-6 w-6" /> :
                         session.status === 'upcoming' ? <Clock className="h-6 w-6" /> :
                         <Lock className="h-6 w-6" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{session.title}</h3>
                        <p className="text-gray-600">{session.date} • {session.time}</p>
                      </div>
                    </div>
                    
                    {session.status === 'available' && (
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Play className="h-4 w-4" />
                        <span>Iniciar Sesión</span>
                      </button>
                    )}
                    
                    {session.status === 'upcoming' && (
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" disabled>
                        <Clock className="h-4 w-4" />
                        <span>Próximamente</span>
                      </button>
                    )}
                  </div>
                  
                  {/* Temas */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Temas a cubrir:</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {session.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recursos */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recursos disponibles:</h4>
                    <div className="flex flex-wrap gap-2">
                      {session.resources.map((resource, resourceIndex) => (
                        <button
                          key={resourceIndex}
                          className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                          disabled={session.status !== 'available'}
                        >
                          <Download className="h-3 w-3" />
                          <span>{resource}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">¿Completaste el Nivel 1?</h2>
          <p className="text-lg mb-6">Continúa tu camino emprendedor con el Nivel 2: Desarrollo y Validación Avanzada</p>
          <Link href="/courses/nivel-2">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Continuar al Nivel 2
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
