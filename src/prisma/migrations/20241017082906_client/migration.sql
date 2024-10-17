-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "domain" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);
