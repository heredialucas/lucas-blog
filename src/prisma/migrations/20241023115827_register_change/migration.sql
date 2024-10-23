/*
  Warnings:

  - You are about to drop the column `isPremium` on the `Client` table. All the data in the column will be lost.
  - Made the column `imageUrl` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "isPremium",
ADD COLUMN     "isSubscribed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "firstName" DROP NOT NULL,
ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "domain" DROP NOT NULL,
ALTER COLUMN "hero" DROP NOT NULL,
ALTER COLUMN "resumeLink" DROP NOT NULL,
ALTER COLUMN "timeline" DROP NOT NULL,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "facebook" DROP NOT NULL,
ALTER COLUMN "instagram" DROP NOT NULL,
ALTER COLUMN "linkedin" DROP NOT NULL,
ALTER COLUMN "twitter" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "imageUrl" SET NOT NULL;
