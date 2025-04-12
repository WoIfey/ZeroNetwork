/*
  Warnings:

  - You are about to drop the column `voterIps` on the `poll` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "poll" DROP COLUMN "voterIps";

-- CreateTable
CREATE TABLE "poll_vote" (
    "id" SERIAL NOT NULL,
    "pollId" INTEGER NOT NULL,
    "ipHash" TEXT NOT NULL,
    "fingerprint" TEXT NOT NULL,
    "votedOption" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "poll_vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "poll_vote_pollId_ipHash_fingerprint_key" ON "poll_vote"("pollId", "ipHash", "fingerprint");

-- AddForeignKey
ALTER TABLE "poll_vote" ADD CONSTRAINT "poll_vote_pollId_fkey" FOREIGN KEY ("pollId") REFERENCES "poll"("id") ON DELETE CASCADE ON UPDATE CASCADE;
