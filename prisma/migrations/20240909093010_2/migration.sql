/*
  Warnings:

  - You are about to drop the `servers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `timeline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "servers";

-- DropTable
DROP TABLE "timeline";

-- CreateTable
CREATE TABLE "Timeline" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "button" BOOLEAN NOT NULL,
    "buttonURL" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servers" (
    "id" SERIAL NOT NULL,
    "server1" TEXT NOT NULL,
    "server2" TEXT NOT NULL,
    "alert" TEXT NOT NULL,
    "alert_visible" BOOLEAN NOT NULL,
    "server2_visible" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);
