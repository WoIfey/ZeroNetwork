/*
  Warnings:

  - You are about to drop the column `serversId` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `serversId` on the `Teams` table. All the data in the column will be lost.
  - You are about to drop the column `serversId` on the `Timeline` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_serversId_fkey";

-- DropForeignKey
ALTER TABLE "Teams" DROP CONSTRAINT "Teams_serversId_fkey";

-- DropForeignKey
ALTER TABLE "Timeline" DROP CONSTRAINT "Timeline_serversId_fkey";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "serversId";

-- AlterTable
ALTER TABLE "Teams" DROP COLUMN "serversId";

-- AlterTable
ALTER TABLE "Timeline" DROP COLUMN "serversId";
