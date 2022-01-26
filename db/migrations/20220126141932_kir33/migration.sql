-- CreateTable
CREATE TABLE "OpratorLogs" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "happend" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OpratorLogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpratorLogs" ADD CONSTRAINT "OpratorLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
