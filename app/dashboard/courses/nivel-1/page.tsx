import Link from 'next/link';
import { Clock, Users, BookOpen, Play, CheckCircle, Lock, Download } from 'lucide-react';

export default function Nivel1Page() {
  const courseData = {
    title: "Nivel 1: Fundamentos del Emprendimiento",
    description: "Construye las bases sólidas de tu emprendimiento. Aprende a identificar oportunidades, validar ideas y crear tu modelo de negocio inicial.",
    duration: "3 sesiones",
    level: "Principiante",
    students: 150,
    sessions: [
      {
        id: 1,
        title: "M0: Desmitificando la IA para Emprendedores",
        date: "Miércoles 27 de Agosto",
        time: "7:00 PM - 8:30 PM",
        status: "available",
        topics: [
          "¿Qué es realmente la Inteligencia Artificial?",
          "Mitos y realidades sobre la IA en los negocios",
          "Casos de éxito de emprendedores usando IA",
          "Primeros pasos para integrar IA en tu negocio"
        ],
        resources: ["Guía PDF", "Ejercicios prácticos", "Video explicativo"]
      },
      {
        id: 2,
        title: "M1: Universo de LLMs y Estrategia de Marca",
        date: "Miércoles 3 de Septiembre",
        time: "7:00 PM - 8:30 PM",
        status: "upcoming",
        topics: [
          "Panorama de los Large Language Models",
          "ChatGPT, Claude, Gemini: ¿cuál elegir?",
          "Fundamentos de estrategia de marca",
          "Cómo la IA puede potenciar tu branding"
        ],
        resources: ["Comparativo LLMs", "Template de marca", "Ejercicios prácticos"]
      },
      {
        id: 3,
        title: "M2: Prompts Ganadores para Branding",
        date: "Miércoles 10 de Septiembre",
        time: "7:00 PM - 8:30 PM",
        status: "upcoming",
        topics: [
          "Anatomía de un prompt efectivo",
          "Técnicas avanzadas de prompting",
          "Creación de identidad visual con IA",
          "Taller práctico: Tu marca con IA"
        ],
        resources: ["Biblioteca de prompts", "Templates visuales", "Casos de estudio"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <nav className="mb-8">
            <Link href="/dashboard/courses" className="text-green-200 hover:text-white transition-colors">
              ← Volver a Academia
            </Link>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">{courseData.title}</h1>
              <p className="text-xl text-green-100 mb-6">{courseData.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center space-x-2 bg-green-500/30 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4" />
                  <span>{courseData.duration}</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/30 px-3 py-1 rounded-full">
                  <BookOpen className="h-4 w-4" />
                  <span>{courseData.level}</span>
                </div>
                <div className="flex items-center space-x-2 bg-green-500/30 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4" />
                  <span>{courseData.students} estudiantes</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">🎯 Módulos del Nivel 1</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>M0: Desmitificando la IA para Emprendedores</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>M1: Universo de LLMs y Estrategia de Marca</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>M2: Prompts Ganadores para Branding</span>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sesiones del Nivel 1</h2>
          
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
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
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
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">¿Completaste el Nivel 1?</h2>
          <p className="text-lg mb-6">Continúa tu camino emprendedor con el Nivel 2: El Emprendedor Aumentado</p>
          <Link href="/dashboard/courses/nivel-2">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Continuar al Nivel 2
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
