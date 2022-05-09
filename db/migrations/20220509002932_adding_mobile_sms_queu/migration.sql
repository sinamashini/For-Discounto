/*
  Warnings:

  - Added the required column `receptor` to the `SmsList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SmsList" ADD COLUMN     "receptor" TEXT NOT NULL;
