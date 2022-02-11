/*
  Warnings:

  - Added the required column `updatedAt` to the `Gifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gifts" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "BuyHistory" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "BuyHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuyHistory" ADD CONSTRAINT "BuyHistory_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
