/*
  Warnings:

  - You are about to drop the `InfoClient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hero` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resumeLink` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeline` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "hero" TEXT NOT NULL,
ADD COLUMN     "resumeLink" TEXT NOT NULL,
ADD COLUMN     "timeline" TEXT NOT NULL;

-- DropTable
DROP TABLE "InfoClient";
