/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Servers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Timeline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_serversId_fkey";

-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_serversId_fkey";

-- DropForeignKey
ALTER TABLE "Timeline" DROP CONSTRAINT "Timeline_serversId_fkey";

-- DropTable
DROP TABLE "Images";

-- DropTable
DROP TABLE "Servers";

-- DropTable
DROP TABLE "Teams";

-- DropTable
DROP TABLE "Timeline";

-- CreateTable
CREATE TABLE "servers" (
    "id" SERIAL NOT NULL,
    "ips" TEXT[],
    "alert" TEXT NOT NULL,
    "visible" BOOLEAN[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "url" TEXT[],
    "button" BOOLEAN[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serversId" INTEGER,

    CONSTRAINT "timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serversId" INTEGER,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "serversId" INTEGER,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timeline" ADD CONSTRAINT "timeline_serversId_fkey" FOREIGN KEY ("serversId") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_serversId_fkey" FOREIGN KEY ("serversId") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_serversId_fkey" FOREIGN KEY ("serversId") REFERENCES "servers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
