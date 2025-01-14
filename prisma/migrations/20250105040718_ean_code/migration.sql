/*
  Warnings:

  - You are about to drop the column `ean13` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[codigoean13]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_ean13_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "ean13",
ADD COLUMN     "codigoean13" VARCHAR(13);

-- CreateIndex
CREATE UNIQUE INDEX "Product_codigoean13_key" ON "Product"("codigoean13");
