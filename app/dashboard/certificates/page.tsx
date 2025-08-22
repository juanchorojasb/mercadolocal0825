'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { 
  Award, 
  Download, 
  Share2, 
  ExternalLink, 
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Eye,
  Copy,
  QrCode
} from 'lucide-react';

interface Certificate {
  id: string;
  certificateCode: string;
  title: string;
  description: string;
  issueDate: string;
  totalHours: number;
  completionRate: number;
  shareableLink: string;
  downloadCount: number;
  course: {
    title: string;
    thumbnail: string;
  };
}

export default function CertificatesPage() {
  const { user } = useUser();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    if (user) {
      fetchCertificates();
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates');
      const data = await response.json();
      
      if (data.success) {
        setCertificates(data.certificates);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (courseId: string) => {
    try {
      const response = await fetch('/api/certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseId }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Actualizar lista de certificados
        fetchCertificates();
        alert('¡Certificado generado exitosamente!');
      } else {
        alert(data.error || 'Error generando certificado');
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generando certificado');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Enlace copiado al portapapeles');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <nav className="flex items-center space-x-4 text-sm">
              <a href="/dashboard" className="text-gray-500 hover:text-gray-700">Dashboard</a>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">Certificados</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-yellow-600" />
            <h1 className="text-3xl font-bold text-gray-900">Mis Certificados</h1>
          </div>
          <p className="text-gray-600">
            Gestiona y comparte tus certificados de completación de cursos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Certificados</p>
                <p className="text-2xl font-semibold text-gray-900">{certificates.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Horas Certificadas</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {certificates.reduce((acc, cert) => acc + cert.totalHours, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verificaciones</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {certificates.reduce((acc, cert) => acc + cert.downloadCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tienes certificados</h3>
            <p className="mt-1 text-sm text-gray-500">
              Completa un curso para generar tu primer certificado
            </p>
            <div className="mt-6">
              <a
                href="/dashboard/courses"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Ver Cursos
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Certificate Thumbnail */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 flex items-center justify-center">
                  <Award className="h-12 w-12 text-white" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {certificate.title}
                  </h3>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(certificate.issueDate).toLocaleDateString('es-ES')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {certificate.totalHours} horas certificadas
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      {certificate.completionRate.toFixed(1)}% completado
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Verificado
                    </span>
                    <span className="text-xs text-gray-500">
                      {certificate.downloadCount} verificaciones
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedCertificate(certificate)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      Ver
                    </button>
                    <button
                      onClick={() => copyToClipboard(certificate.shareableLink)}
                      className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificate Detail Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Detalles del Certificado</h2>
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Certificate Preview */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white text-center mb-6">
                  <Award className="h-16 w-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Certificado de Completación</h3>
                  <p className="text-blue-100 mb-4">Academia Mercado Local Caldas</p>
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-lg font-semibold">{user?.firstName} {user?.lastName}</p>
                    <p className="text-sm text-blue-200 mt-2">
                      Ha completado exitosamente el curso
                    </p>
                    <p className="text-lg font-bold mt-2">{selectedCertificate.course.title}</p>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Código de Certificado</label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {selectedCertificate.certificateCode}
                      </code>
                      <button
                        onClick={() => copyToClipboard(selectedCertificate.certificateCode)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Fecha de Emisión</label>
                    <p className="text-sm text-gray-900 mt-1">
                      {new Date(selectedCertificate.issueDate).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => copyToClipboard(selectedCertificate.shareableLink)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Compartir Enlace
                  </button>
                  <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Descargar PDF
                  </button>
                  <button
                    onClick={() => window.open(selectedCertificate.shareableLink, '_blank')}
                    className="bg-gray-600 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Verificar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
