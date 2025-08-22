const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Academia data...');

  // Crear instructor
  const instructor = await prisma.user.upsert({
    where: { email: 'instructor@mercadolocal.co' },
    update: {},
    create: {
      email: 'instructor@mercadolocal.co',
      firstName: 'María',
      lastName: 'González'
    }
  });

  // Crear curso
  const course = await prisma.course.upsert({
    where: { slug: 'fundamentos-emprendimiento-local' },
    update: {},
    create: {
      title: 'Fundamentos del Emprendimiento Local',
      description: 'Aprende los conceptos básicos para crear y hacer crecer tu negocio local.',
      slug: 'fundamentos-emprendimiento-local',
      level: 'BEGINNER',
      status: 'PUBLISHED',
      tags: ['emprendimiento', 'negocio local'],
      instructorId: instructor.id,
      publishedAt: new Date()
    }
  });

  // Crear lección de ejemplo con video de Bunny Stream
  const lesson = await prisma.lesson.upsert({
    where: {
      courseId_slug: {
        courseId: course.id,
        slug: 'introduccion'
      }
    },
    update: {},
    create: {
      title: 'Introducción al Emprendimiento Local',
      description: 'Una introducción completa al mundo del emprendimiento local.',
      slug: 'introduccion',
      order: 1,
      duration: 900,
      bunnyVideoId: '95c57c4c-eccb-428b-9519-2a468002a0cf',
      bunnyLibraryId: '476857',
      bunnyPlaybackUrl: 'https://iframe.mediadelivery.net/play/476857/95c57c4c-eccb-428b-9519-2a468002a0cf',
      isPreview: true,
      courseId: course.id
    }
  });

  console.log('✅ Academia seeded successfully');
  console.log(`• Course: ${course.title}`);
  console.log(`• Lesson: ${lesson.title}`);
  console.log(`• Video URL: ${lesson.bunnyPlaybackUrl}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
