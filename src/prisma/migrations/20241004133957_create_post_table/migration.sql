-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "imageUrl" TEXT,
    "referencePostUrl" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
