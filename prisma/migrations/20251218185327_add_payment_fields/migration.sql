-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'seller';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "paymentStatus" TEXT;
