/*
  Warnings:

  - Added the required column `facebook` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL;
