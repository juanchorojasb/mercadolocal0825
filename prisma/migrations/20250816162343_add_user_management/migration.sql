/*
  Warnings:

  - The values [CANCELLED,EXPIRED] on the enum `EnrollmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [EXPERT] on the enum `Level` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `isActive` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isFeatured` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - The `images` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `facebook` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `desafios` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `empleados` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `etapa` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `historia` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `municipio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nombreNegocio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nombreTienda` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `objetivos` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `redesSociales` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sitioWeb` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `tiempoExperiencia` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `adminNotes` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentProof` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `courses` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the column `expiresAt` on the `enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `watchTime` on the `lesson_progress` table. All the data in the column will be lost.
  - Made the column `storeId` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ownerId` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `startDate` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `enrollments` table without a default value. This is not possible if the table is not empty.
  - Made the column `lastPosition` on table `lesson_progress` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'INSTRUCTOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING');

-- AlterEnum
ALTER TYPE "CourseStatus" ADD VALUE 'SUSPENDED';

-- AlterEnum
BEGIN;
CREATE TYPE "EnrollmentStatus_new" AS ENUM ('ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED');
ALTER TABLE "enrollments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "enrollments" ALTER COLUMN "status" TYPE "EnrollmentStatus_new" USING ("status"::text::"EnrollmentStatus_new");
ALTER TYPE "EnrollmentStatus" RENAME TO "EnrollmentStatus_old";
ALTER TYPE "EnrollmentStatus_new" RENAME TO "EnrollmentStatus";
DROP TYPE "EnrollmentStatus_old";
ALTER TABLE "enrollments" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Level_new" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
ALTER TABLE "courses" ALTER COLUMN "level" DROP DEFAULT;
ALTER TABLE "courses" ALTER COLUMN "level" TYPE "Level_new" USING ("level"::text::"Level_new");
ALTER TYPE "Level" RENAME TO "Level_old";
ALTER TYPE "Level_new" RENAME TO "Level";
DROP TYPE "Level_old";
ALTER TABLE "courses" ALTER COLUMN "level" SET DEFAULT 'BEGINNER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_userId_fkey";

-- DropForeignKey
ALTER TABLE "course_reviews" DROP CONSTRAINT "course_reviews_courseId_fkey";

-- DropForeignKey
ALTER TABLE "course_reviews" DROP CONSTRAINT "course_reviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_instructorId_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_courseId_fkey";

-- DropForeignKey
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_userId_fkey";

-- DropForeignKey
ALTER TABLE "lesson_progress" DROP CONSTRAINT "lesson_progress_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "lesson_progress" DROP CONSTRAINT "lesson_progress_userId_fkey";

-- DropIndex
DROP INDEX "Store_userId_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isActive",
DROP COLUMN "isFeatured",
DROP COLUMN "userId",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2),
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "storeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "facebook",
DROP COLUMN "instagram",
DROP COLUMN "userId",
DROP COLUMN "whatsapp",
ADD COLUMN     "coordinates" JSONB,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "settings" JSONB,
ADD COLUMN     "socialMedia" JSONB,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "department" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "desafios",
DROP COLUMN "empleados",
DROP COLUMN "etapa",
DROP COLUMN "historia",
DROP COLUMN "municipio",
DROP COLUMN "nombreNegocio",
DROP COLUMN "nombreTienda",
DROP COLUMN "objetivos",
DROP COLUMN "redesSociales",
DROP COLUMN "sector",
DROP COLUMN "sitioWeb",
DROP COLUMN "telefono",
DROP COLUMN "tiempoExperiencia",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT NOT NULL DEFAULT 'es',
ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "loginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "marketingEmails" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "permissions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "preferences" JSONB,
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "pushNotifications" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'STUDENT',
ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "timezone" TEXT,
ALTER COLUMN "clerkId" DROP NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "adminNotes",
DROP COLUMN "amount",
DROP COLUMN "paymentMethod",
DROP COLUMN "paymentProof",
DROP COLUMN "plan",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "price" DECIMAL(10,2),
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "studentsCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "enrollments" DROP COLUMN "expiresAt",
ADD COLUMN     "completedLessons" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lastAccessedAt" TIMESTAMP(3),
ADD COLUMN     "totalLessons" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "lesson_progress" DROP COLUMN "watchTime",
ADD COLUMN     "progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "watchedSeconds" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "lastPosition" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_progress" ADD CONSTRAINT "lesson_progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_reviews" ADD CONSTRAINT "course_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_reviews" ADD CONSTRAINT "course_reviews_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
