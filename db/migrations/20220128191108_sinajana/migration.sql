/*
  Warnings:

  - You are about to drop the column `discountForEver` on the `PackageClient` table. All the data in the column will be lost.
  - You are about to drop the column `used` on the `PackageClient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PackageClient" DROP COLUMN "discountForEver",
DROP COLUMN "used",
ADD COLUMN     "clientIdsUsedFor" INTEGER[],
ADD COLUMN     "numberOfUsed" INTEGER NOT NULL DEFAULT 0;
