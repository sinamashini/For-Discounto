-- CreateTable
CREATE TABLE "DiscountHistory" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    "numberOfPeopleIncluded" INTEGER DEFAULT 0,

    CONSTRAINT "DiscountHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DiscountHistory" ADD CONSTRAINT "DiscountHistory_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
