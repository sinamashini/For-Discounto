/*
  Warnings:

  - A unique constraint covering the columns `[nationalCode]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Clients` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Clients" ALTER COLUMN "notes" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Clients_nationalCode_key" ON "Clients"("nationalCode");

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");
