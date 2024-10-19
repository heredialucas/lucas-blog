/*
  Warnings:

  - Made the column `firstName` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `domain` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "domain" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "userId" INTEGER NOT NULL;
