// /app/api/certificates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Generar certificado al completar curso
export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const body = await request.json();
    const { courseId, templateId = 'default' } = body;

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Verificar que el curso existe
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        lessons: true
      }
    });

    if (!course) {
      return NextResponse.json({ error: 'Curso no encontrado' }, { status: 404 });
    }

    // Verificar progreso del curso
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      }
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'No inscrito en el curso' }, { status: 400 });
    }

    // Calcular métricas de completación
    const lessonProgress = await prisma.lessonProgress.findMany({
      where: {
        userId: user.id,
        lesson: {
          courseId: courseId
        }
      }
    });

    const totalLessons = course.lessons.length;
    const completedLessons = lessonProgress.filter(p => p.isCompleted).length;
    const completionRate = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    // Verificar si ya tiene certificado
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId: user.id,
        courseId: courseId,
        status: 'ACTIVE'
      }
    });

    if (existingCertificate) {
      return NextResponse.json({
        success: true,
        certificate: existingCertificate,
        message: 'Certificado ya existe'
      });
    }

    // Generar código único del certificado
    const certificateCode = generateCertificateCode();
    const verificationHash = generateVerificationHash(certificateCode, user.id, courseId);

    // Calcular horas totales (estimado)
    const totalHours = Math.round((course.lessons.length * 1.5)); // 1.5 horas promedio por lección

    // Crear certificado
    const certificate = await prisma.certificate.create({
      data: {
        certificateCode,
        title: `Certificado de Completación - ${course.title}`,
        description: `Este certificado acredita que ${user.firstName} ${user.lastName} ha completado exitosamente el curso "${course.title}" con un ${completionRate.toFixed(1)}% de completación.`,
        userId: user.id,
        courseId: courseId,
        templateId: templateId,
        totalHours: totalHours,
        completionRate: completionRate,
        verificationHash: verificationHash,
        shareableLink: `${process.env.NEXT_PUBLIC_APP_URL}/verify/${certificateCode}`,
        customData: {
          studentName: `${user.firstName} ${user.lastName}`,
          courseName: course.title,
          completionDate: new Date().toLocaleDateString('es-ES'),
          completedLessons: completedLessons,
          totalLessons: totalLessons
        }
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: {
          select: {
            title: true,
            description: true
          }
        }
      }
    });

    // Actualizar enrollment como completado
    await prisma.enrollment.update({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: courseId
        }
      },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        progress: completionRate
      }
    });

    return NextResponse.json({
      success: true,
      certificate: certificate,
      message: 'Certificado generado exitosamente'
    });

  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Obtener certificados del usuario
export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Verificar que el usuario existe
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Obtener certificados del usuario
    const certificates = await prisma.certificate.findMany({
      where: {
        userId: user.id,
        status: 'ACTIVE'
      },
      include: {
        course: {
          select: {
            title: true,
            thumbnail: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({
      success: true,
      certificates: certificates
    });

  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Funciones auxiliares
function generateCertificateCode(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CERT-${timestamp}-${random}`.toUpperCase();
}

function generateVerificationHash(certificateCode: string, userId: string, courseId: string): string {
  const data = `${certificateCode}-${userId}-${courseId}-${process.env.NEXTAUTH_SECRET}`;
  return crypto.createHash('sha256').update(data).digest('hex');
}
