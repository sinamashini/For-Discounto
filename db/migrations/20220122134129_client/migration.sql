-- CreateTable
CREATE TABLE "Clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "nationalCode" TEXT NOT NULL,
    "notes" TEXT[],
    "email" TEXT,
    "address" TEXT,
    "hashedPassword" TEXT,
    "parentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_parentId_key" ON "Clients"("parentId");

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
