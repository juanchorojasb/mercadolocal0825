import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Users, BookOpen, Play, CheckCircle, Lock } from 'lucide-react';

interface CoursePageProps {
  params: Promise<{ slug: string }>; // Corregido para Next.js 15
  searchParams: Promise<{ lesson?: string }>; // Corregido para Next.js 15
}

async function getCourse(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/courses?slug=${slug}`,
      { cache: 'no-store' }
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.courses?.[0] || null;
  } catch (error) {
    return null;
  }
}

export default async function CoursePage({ params, searchParams }: CoursePageProps) {
  // Await params y searchParams (Next.js 15)
  const { slug } = await params;
  const { lesson: currentLessonSlug } = await searchParams;
  
  const course = await getCourse(slug);
  
  if (!course) {
    notFound();
  }

  const currentLesson = currentLessonSlug 
    ? course.lessons?.find((l: any) => l.slug === currentLessonSlug)
    : course.lessons?.[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Video Player & Content */}
          <div className="lg:col-span-2">
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
              <Link href="/academia" className="hover:text-blue-600">Academia</Link>
              <span>›</span>
              <span className="text-gray-900">{course.title}</span>
            </nav>

            {/* Video Player */}
            {currentLesson ? (
              <div className="mb-8">
                <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                  <iframe
                    src={currentLesson.bunnyPlaybackUrl || `https://iframe.mediadelivery.net/play/476857/95c57c4c-eccb-428b-9519-2a468002a0cf`}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-8">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Selecciona una lección</h3>
                  <p className="text-gray-400">
                    Elige una lección del contenido para comenzar
                  </p>
                </div>
              </div>
            )}

            {/* Lesson Content */}
            {currentLesson && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {currentLesson.title}
                </h1>
                
                {currentLesson.description && (
                  <div className="prose max-w-none text-gray-600 mb-6">
                    <p>{currentLesson.description}</p>
                  </div>
                )}

                {currentLesson.content && (
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ 
                      __html: currentLesson.content.replace(/\n/g, '<br/>').replace(/#{1,6} /g, '<h3>').replace(/<h3>/g, '<h3 class="font-bold text-lg mt-4 mb-2">') 
                    }} />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Course Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{course.title}</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium">
                    {course.instructor?.firstName} {course.instructor?.lastName}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Lecciones:</span>
                  <span>{course.lessons?.length || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span>{Math.floor((course.duration || 0) / 60)}h {(course.duration || 0) % 60}m</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                {course.price ? `Inscribirse - $${course.price}` : 'Inscribirse Gratis'}
              </button>
            </div>

            {/* Lessons List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contenido del Curso
              </h3>
              
              <div className="space-y-2">
                {course.lessons?.map((lesson: any, index: number) => {
                  const isActive = currentLesson?.id === lesson.id;
                  const isLocked = !lesson.isPreview;
                  
                  return (
                    <Link
                      key={lesson.id}
                      href={`/academia/cursos/${course.slug}?lesson=${lesson.slug}`}
                      className={isLocked ? 'pointer-events-none' : ''}
                    >
                      <div className={`flex items-center p-4 rounded-lg border transition-colors ${
                        isActive ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}>
                        <div className="flex-shrink-0 mr-4">
                          {isLocked ? (
                            <Lock className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Play className="w-5 h-5 text-blue-600" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium truncate ${
                            isLocked ? 'text-gray-400' : 'text-gray-900'
                          }`}>
                            {lesson.title}
                          </h4>
                          {lesson.duration && (
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
