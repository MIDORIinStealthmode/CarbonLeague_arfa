/*
  Warnings:

  - A unique constraint covering the columns `[competitionId,userId,superpowerId]` on the table `CompetitionEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[competitionId,userId,order]` on the table `CompetitionEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `CompetitionEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompetitionEntry" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionEntry_competitionId_userId_superpowerId_key" ON "CompetitionEntry"("competitionId", "userId", "superpowerId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitionEntry_competitionId_userId_order_key" ON "CompetitionEntry"("competitionId", "userId", "order");
