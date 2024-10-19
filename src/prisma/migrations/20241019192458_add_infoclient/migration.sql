/*
  Warnings:

  - You are about to drop the column `userId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientDomain` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "userId",
ADD COLUMN     "clientDomain" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InfoClient" (
    "id" SERIAL NOT NULL,
    "clientDomain" TEXT NOT NULL,
    "hero" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "resumeLink" TEXT NOT NULL,

    CONSTRAINT "InfoClient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_domain_key" ON "Client"("domain");
