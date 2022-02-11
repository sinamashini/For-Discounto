/*
  Warnings:

  - You are about to drop the `ClientsTrash` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientsTrash" DROP CONSTRAINT "ClientsTrash_userId_fkey";

-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "ClientsTrash";
