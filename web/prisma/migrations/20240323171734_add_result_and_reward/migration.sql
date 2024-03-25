-- AlterTable
ALTER TABLE "CompetitionEntry" ADD COLUMN     "entryAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resultId" TEXT;

-- CreateTable
CREATE TABLE "CompetitionReward" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "superpowerId" TEXT,
    "rewardAmount" INTEGER,

    CONSTRAINT "CompetitionReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionResult" (
    "id" TEXT NOT NULL,
    "competitionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "rewardReceived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CompetitionResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompetitionEntry" ADD CONSTRAINT "CompetitionEntry_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "CompetitionResult"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionReward" ADD CONSTRAINT "CompetitionReward_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionReward" ADD CONSTRAINT "CompetitionReward_superpowerId_fkey" FOREIGN KEY ("superpowerId") REFERENCES "Superpower"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionResult" ADD CONSTRAINT "CompetitionResult_competitionId_fkey" FOREIGN KEY ("competitionId") REFERENCES "Competition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitionResult" ADD CONSTRAINT "CompetitionResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
