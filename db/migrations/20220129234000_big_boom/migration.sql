/*
  Warnings:

  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackageClient` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('PERSON', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('ACTIVE', 'USED', 'HALF_USED', 'DEACTIVE');

-- DropForeignKey
ALTER TABLE "PackageClient" DROP CONSTRAINT "PackageClient_clientId_fkey";

-- DropForeignKey
ALTER TABLE "PackageClient" DROP CONSTRAINT "PackageClient_packageId_fkey";

-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "currentDiscount" INTEGER DEFAULT 0,
ADD COLUMN     "numberOfDiectSubPeople" INTEGER DEFAULT 0,
ADD COLUMN     "numberOfIndirectSubPeople" INTEGER DEFAULT 0,
ADD COLUMN     "parentIds" INTEGER[],
ADD COLUMN     "typeOfClient" "ClientType" NOT NULL DEFAULT E'PERSON',
ALTER COLUMN "nationalCode" DROP NOT NULL;

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "PackageClient";

-- CreateTable
CREATE TABLE "Discounts" (
    "id" SERIAL NOT NULL,
    "numberOfNesting" INTEGER NOT NULL,
    "discountPercent" INTEGER NOT NULL,
    "numberOfIncludedPeople" INTEGER NOT NULL,
    "typeOfDiscount" "ClientType",
    "preDiscountForOrganizations" INTEGER,
    "status" "StatusEnum" NOT NULL DEFAULT E'ACTIVE',
    "clients" INTEGER[],
    "clientId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscountClient" (
    "clientId" INTEGER NOT NULL,
    "discountId" INTEGER NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT E'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscountClient_pkey" PRIMARY KEY ("clientId","discountId")
);

-- CreateTable
CREATE TABLE "Gifts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Gifts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Discounts" ADD CONSTRAINT "Discounts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountClient" ADD CONSTRAINT "DiscountClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiscountClient" ADD CONSTRAINT "DiscountClient_discountId_fkey" FOREIGN KEY ("discountId") REFERENCES "Discounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gifts" ADD CONSTRAINT "Gifts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
