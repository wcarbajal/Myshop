-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "state" "State" DEFAULT 'activo',
ADD COLUMN     "telefono" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
