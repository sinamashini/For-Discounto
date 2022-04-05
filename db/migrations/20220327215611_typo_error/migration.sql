/*
  Warnings:

  - You are about to drop the column `prriceWithDiscount` on the `BuyHistory` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BuyHistory" DROP COLUMN "prriceWithDiscount",
ADD COLUMN     "priceWithDiscount" INTEGER NOT NULL DEFAULT 0;
