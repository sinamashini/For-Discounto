-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "ancestorsIds" INTEGER[];

-- AlterTable
ALTER TABLE "Discounts" ADD COLUMN     "description" TEXT,
ADD COLUMN     "usedDiscountPercent" INTEGER DEFAULT 0;
