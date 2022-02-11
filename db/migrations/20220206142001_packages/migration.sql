/*
  Warnings:

  - You are about to drop the column `ancestorsIds` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the `DiscountClient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('ACTIVE', 'ARCHIVE');

-- DropForeignKey
ALTER TABLE "DiscountClient" DROP CONSTRAINT "DiscountClient_clientId_fkey";

-- DropForeignKey
ALTER TABLE "DiscountClient" DROP CONSTRAINT "DiscountClient_discountId_fkey";

-- DropForeignKey
ALTER TABLE "Discounts" DROP CONSTRAINT "Discounts_clientId_fkey";

-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "ancestorsIds";

-- DropTable
DROP TABLE "DiscountClient";

-- DropTable
DROP TABLE "Discounts";

-- CreateTable
CREATE TABLE "ClientsMap" (
    "id" SERIAL NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "childId" INTEGER,
    "parentId" INTEGER,
    "status" "StatusEnum" NOT NULL,

    CONSTRAINT "ClientsMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Packages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deadLineAfterMaxPayment" INTEGER,
    "maxPayment" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "PackageStatus" NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackagesClients" (
    "clientId" INTEGER NOT NULL,
    "packageId" INTEGER NOT NULL,
    "status" "StatusEnum" NOT NULL,

    CONSTRAINT "PackagesClients_pkey" PRIMARY KEY ("clientId","packageId")
);

-- CreateTable
CREATE TABLE "PackageLevels" (
    "id" SERIAL NOT NULL,
    "levelNumber" INTEGER NOT NULL DEFAULT 1,
    "percent" INTEGER NOT NULL DEFAULT 0,
    "packageId" INTEGER NOT NULL,

    CONSTRAINT "PackageLevels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientsMap" ADD CONSTRAINT "ClientsMap_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsMap" ADD CONSTRAINT "ClientsMap_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagesClients" ADD CONSTRAINT "PackagesClients_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackagesClients" ADD CONSTRAINT "PackagesClients_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageLevels" ADD CONSTRAINT "PackageLevels_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
