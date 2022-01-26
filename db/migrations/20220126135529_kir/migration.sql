-- AlterTable
ALTER TABLE "PackageClient" ADD COLUMN     "discountForEver" INTEGER,
ADD COLUMN     "discountOfEachLevelByPercent" INTEGER,
ADD COLUMN     "numberOfNesting" INTEGER,
ADD COLUMN     "used" BOOLEAN NOT NULL DEFAULT false;
