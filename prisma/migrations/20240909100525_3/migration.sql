-- AlterTable
ALTER TABLE "Teams" ADD COLUMN     "serversId" INTEGER;

-- AlterTable
ALTER TABLE "Timeline" ADD COLUMN     "serversId" INTEGER;

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serversId" INTEGER,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Timeline" ADD CONSTRAINT "Timeline_serversId_fkey" FOREIGN KEY ("serversId") REFERENCES "Servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_serversId_fkey" FOREIGN KEY ("serversId") REFERENCES "Servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_serversId_fkey" FOREIGN KEY ("serversId") REFERENCES "Servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
