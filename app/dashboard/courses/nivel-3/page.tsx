import { Calendar, Clock, Download, Play, Users, Target, ShoppingCart, Zap, TrendingUp } from 'lucide-react';

export default function Nivel3Page() {
  const sessions = [
    {
      id: 1,
      title: "M1: Estrategia de Contenidos con IA",
      date: "Miércoles 1 de Octubre",
      time: "7:00 PM - 8:30 PM",
      description: "Domina la creación de contenidos estratégicos usando IA para posicionar tu marca y generar engagement auténtico.",
      topics: [
        "Content Marketing 4.0 con IA",
        "Automatización de creación de contenidos",
        "SEO inteligente y optimización",
        "Calendario editorial automatizado"
      ],
      resources: [
        "Template Estrategia de Contenidos",
        "Prompts para Content Creation",
        "Calendario Editorial IA"
      ],
      status: "upcoming"
    },
    {
      id: 2,
      title: "M2: E-commerce y Automatización Inteligente",
      date: "Miércoles 8 de Octubre",
      time: "7:00 PM - 8:30 PM",
      description: "Construye tu tienda online inteligente con automatizaciones que optimizan ventas y mejoran la experiencia del cliente.",
      topics: [
        "Plataformas e-commerce modernas",
        "Automatización de ventas con IA",
        "Chatbots y atención al cliente",
        "Optimización de conversiones"
      ],
      resources: [
        "Checklist E-commerce Setup",
        "Templates de Automatización",
        "Guía Chatbots Inteligentes"
      ],
      status: "upcoming"
    }
  ];

  const courseInfo = {
    title: "Nivel 3: Marketing Digital Avanzado",
    description: "Domina las estrategias de marketing digital más efectivas usando IA para escalar tu emprendimiento y maximizar tus ventas online.",
    duration: "2 sesiones",
    level: "Avanzado",
    students: 50,
    totalHours: "3 horas"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <nav className="flex items-center space-x-4 text-sm">
              <a href="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</a>
              <span className="text-gray-400">/</span>
              <a href="/dashboard/courses" className="text-gray-500 hover:text-gray-700">Cursos</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Nivel 3</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="h-6 w-6" />
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  {courseInfo.level}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">{courseInfo.title}</h1>
              <p className="text-purple-100 text-lg mb-4 max-w-2xl">{courseInfo.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {courseInfo.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {courseInfo.students} estudiantes
                </div>
                <div className="flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {courseInfo.totalHours} de contenido
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold mb-1">1 - 8</div>
                <div className="text-purple-200 text-sm">Octubre 2025</div>
                <div className="text-purple-200 text-sm">Miércoles 7:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  🚀 Contenido del Programa
                </h2>
                <p className="text-gray-600">
                  2 sesiones especializadas en marketing digital y automatización
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {sessions.map((session, index) => (
                  <div key={session.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          session.status === 'available' ? 'bg-green-500' :
                          session.status === 'upcoming' ? 'bg-purple-500' : 'bg-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {session.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {session.date}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {session.time}
                              </div>
                            </div>
                            <p className="text-gray-600 mb-4">{session.description}</p>
                          </div>
                          
                          <div className="flex-shrink-0 ml-4">
                            {session.status === 'upcoming' ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Próximamente
                              </span>
                            ) : (
                              <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                                <Play className="h-4 w-4 mr-2" />
                                Ver Sesión
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Topics */}
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">📋 Temas a cubrir:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {session.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start text-sm text-gray-600">
                                <Zap className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Resources */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">📁 Recursos disponibles:</h4>
                          <div className="flex flex-wrap gap-2">
                            {session.resources.map((resource, resourceIndex) => (
                              <span key={resourceIndex} className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                <Download className="h-3 w-3 mr-1" />
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Tu Progreso</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Nivel completado</span>
                    <span>0%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-1">
                    <span>Sesiones completadas</span>
                    <span>0 de 2</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acciones Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Sesiones
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Recursos
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ver E-commerce
                </button>
              </div>
            </div>

            {/* Marketing Tips */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white p-6">
              <h3 className="text-lg font-semibold mb-2">💡 Tip de Marketing</h3>
              <p className="text-purple-100 text-sm mb-4">
                El 87% de los emprendedores que automatizan su marketing digital ven un aumento del 30% en ventas en los primeros 3 meses.
              </p>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                <span>Empieza hoy mismo</span>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white p-6">
              <h3 className="text-lg font-semibold mb-2">🤝 ¿Necesitas Ayuda?</h3>
              <p className="text-orange-100 text-sm mb-4">
                Nuestro equipo de marketing digital está listo para impulsar tu negocio.
              </p>
              <button className="w-full bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Mentoría 1:1
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
