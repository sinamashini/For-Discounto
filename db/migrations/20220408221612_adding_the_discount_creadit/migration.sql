-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "burnedDiscountAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "discountAmount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remainDiscountAmount" INTEGER NOT NULL DEFAULT 0;
