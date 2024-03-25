/*
  Warnings:

  - A unique constraint covering the columns `[superpowerId]` on the table `CompetitionReward` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CompetitionReward_superpowerId_key" ON "CompetitionReward"("superpowerId");
