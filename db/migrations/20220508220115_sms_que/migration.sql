-- CreateTable
CREATE TABLE "SmsList" (
    "id" SERIAL NOT NULL,
    "jobId" TEXT NOT NULL,
    "text" TEXT,
    "template" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SmsList_pkey" PRIMARY KEY ("id")
);
