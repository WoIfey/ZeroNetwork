/*
  Warnings:

  - Added the required column `subtitle` to the `timeline` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "timeline" ADD COLUMN     "images" TEXT[],
ADD COLUMN     "subtitle" TEXT NOT NULL;
