-- CreateEnum
CREATE TYPE "DiscountHistoryStatus" AS ENUM ('ACTIVE', 'USED', 'BURNED');

-- AlterTable
ALTER TABLE "DiscountHistory" ADD COLUMN     "status" "DiscountHistoryStatus" NOT NULL DEFAULT E'ACTIVE';
