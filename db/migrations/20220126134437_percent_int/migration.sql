/*
  Warnings:

  - You are about to drop the column `discountOfEachLevel` on the `Package` table. All the data in the column will be lost.
  - Added the required column `discountOfEachLevelByPercent` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "discountOfEachLevel",
ADD COLUMN     "discountOfEachLevelByPercent" INTEGER NOT NULL;
