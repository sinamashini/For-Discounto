-- AlterTable
ALTER TABLE "Clients" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "ClientsTrash" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "nationalCode" TEXT NOT NULL,
    "notes" TEXT,
    "email" TEXT,
    "address" TEXT,
    "hashedPassword" TEXT,
    "parentName" TEXT,
    "parentNationalCode" TEXT,
    "deletedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "packageName" TEXT,

    CONSTRAINT "ClientsTrash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfNesting" INTEGER NOT NULL,
    "discountOfEachLevel" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageClient" (
    "packageId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "assignAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PackageClient_pkey" PRIMARY KEY ("packageId","clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientsTrash_nationalCode_key" ON "ClientsTrash"("nationalCode");

-- CreateIndex
CREATE UNIQUE INDEX "ClientsTrash_email_key" ON "ClientsTrash"("email");

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientsTrash" ADD CONSTRAINT "ClientsTrash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageClient" ADD CONSTRAINT "PackageClient_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PackageClient" ADD CONSTRAINT "PackageClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
