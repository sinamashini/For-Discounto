/*
  Warnings:

  - You are about to drop the column `ancestorsIds` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfDiectSubPeople` on the `Clients` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfIndirectSubPeople` on the `Clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clients" DROP COLUMN "ancestorsIds",
DROP COLUMN "numberOfDiectSubPeople",
DROP COLUMN "numberOfIndirectSubPeople";
