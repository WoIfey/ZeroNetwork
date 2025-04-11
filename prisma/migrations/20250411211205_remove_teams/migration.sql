/*
  Warnings:

  - You are about to drop the column `isAnonymous` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "teams" DROP CONSTRAINT "teams_serversId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "isAnonymous";

-- DropTable
DROP TABLE "teams";
