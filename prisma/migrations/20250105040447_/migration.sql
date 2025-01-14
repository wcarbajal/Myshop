/*
  Warnings:

  - A unique constraint covering the columns `[ean13]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "ean13" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_ean13_key" ON "Product"("ean13");
