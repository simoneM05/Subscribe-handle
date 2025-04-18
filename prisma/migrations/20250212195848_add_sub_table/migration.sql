-- CreateTable
CREATE TABLE "Sub" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "renewal" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sub" ADD CONSTRAINT "Sub_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
