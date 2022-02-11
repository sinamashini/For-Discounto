/*
  Warnings:

  - You are about to drop the column `parentIds` on the `Clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "parentIds",
ADD COLUMN     "ancestorsIds" INTEGER[];
