import { Calendar, Clock, Download, Play, Users, Award, Trophy, Star, Gift, Handshake, Target } from 'lucide-react';

export default function SesionCierrePage() {
  const eventInfo = {
    title: "Sesión de Cierre y Graduación",
    subtitle: "Programa Intensivo Norte de Caldas",
    date: "Miércoles 15 de Octubre",
    time: "7:00 PM - 9:00 PM",
    description: "Celebramos el cierre del programa con entrega de certificados, presentación de proyectos finales y networking entre emprendedores graduados.",
    duration: "2 horas",
    participants: 50,
    location: "Virtual + Presencial"
  };

  const agenda = [
    {
      time: "7:00 - 7:15 PM",
      title: "🎉 Bienvenida y Celebración",
      description: "Recibimiento y reconocimiento al esfuerzo de todos los participantes",
      icon: Gift
    },
    {
      time: "7:15 - 7:45 PM", 
      title: "🚀 Presentación de Proyectos",
      description: "Cada emprendedor presenta su proyecto desarrollado durante el programa",
      icon: Target
    },
    {
      time: "7:45 - 8:15 PM",
      title: "🏆 Entrega de Certificados",
      description: "Ceremonia oficial de certificación del programa",
      icon: Award
    },
    {
      time: "8:15 - 8:45 PM",
      title: "🤝 Networking y Alianzas",
      description: "Espacio para crear conexiones entre emprendedores graduados",
      icon: Handshake
    },
    {
      time: "8:45 - 9:00 PM",
      title: "📅 Próximos Pasos",
      description: "Anuncio de programas avanzados y acompañamiento continuo",
      icon: Calendar
    }
  ];

  const achievements = [
    {
      title: "Certificado Oficial",
      description: "Reconocimiento del programa por Secretaría de Desarrollo de Caldas",
      icon: Award,
      color: "bg-blue-500"
    },
    {
      title: "Red de Emprendedores",
      description: "Acceso permanente a la comunidad de graduados",
      icon: Users,
      color: "bg-green-500"
    },
    {
      title: "Mentoría Continua",
      description: "3 meses adicionales de acompañamiento especializado",
      icon: Star,
      color: "bg-purple-500"
    },
    {
      title: "Proyecto Finalizado",
      description: "Tu emprendimiento validado y con plan de acción",
      icon: Trophy,
      color: "bg-yellow-500"
    }
  ];

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
              <span className="text-gray-900 font-medium">Sesión de Cierre</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl text-white p-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="h-12 w-12 mr-4" />
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">{eventInfo.title}</h1>
                <p className="text-xl text-yellow-100">{eventInfo.subtitle}</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <Calendar className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">{eventInfo.date}</div>
                  <div className="text-yellow-200 text-sm">{eventInfo.time}</div>
                </div>
                <div>
                  <Users className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">{eventInfo.participants} Graduados</div>
                  <div className="text-yellow-200 text-sm">Norte de Caldas</div>
                </div>
                <div>
                  <Clock className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-semibold">{eventInfo.duration}</div>
                  <div className="text-yellow-200 text-sm">{eventInfo.location}</div>
                </div>
              </div>
            </div>

            <p className="text-lg text-yellow-100 mt-6 max-w-3xl mx-auto">
              {eventInfo.description}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Agenda */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  📋 Agenda del Evento
                </h2>
                <p className="text-gray-600">
                  Cronograma detallado de la sesión de cierre y graduación
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {agenda.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <IconComponent className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  🏆 Lo que Recibirás
                </h2>
                <p className="text-gray-600">
                  Reconocimientos y beneficios al completar el programa
                </p>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 ${achievement.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Estado del Evento</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Fecha del evento</span>
                  <span className="text-sm font-medium text-gray-900">15 Oct 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Participantes confirmados</span>
                  <span className="text-sm font-medium text-green-600">45 de 50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Proyectos presentados</span>
                  <span className="text-sm font-medium text-blue-600">42 listos</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '90%'}}></div>
                </div>
                <p className="text-xs text-gray-500">90% de completación del programa</p>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Acciones</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-colors">
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirmar Asistencia
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar Plantilla
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Compañeros
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white p-6">
              <h3 className="text-lg font-semibold mb-2">📝 Para Graduarte</h3>
              <ul className="text-blue-100 text-sm space-y-2">
                <li>✅ Asistir a la sesión de cierre</li>
                <li>✅ Presentar proyecto final</li>
                <li>✅ Completar evaluación del programa</li>
                <li>✅ Participar en networking</li>
              </ul>
              <div className="mt-4 text-center">
                <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                  🎓 Certificación Oficial
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white p-6">
              <h3 className="text-lg font-semibold mb-2">🤝 ¿Dudas?</h3>
              <p className="text-green-100 text-sm mb-4">
                Nuestro equipo está listo para ayudarte con cualquier pregunta sobre la graduación.
              </p>
              <button className="w-full bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Contactar Organizadores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
