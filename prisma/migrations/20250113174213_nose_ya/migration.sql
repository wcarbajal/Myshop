/*
  Warnings:

  - Made the column `descriptionMeasure` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `measure` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `codigoean13` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "descriptionMeasure" SET NOT NULL,
ALTER COLUMN "measure" SET NOT NULL,
ALTER COLUMN "codigoean13" SET NOT NULL;
