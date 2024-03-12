-- CreateEnum
CREATE TYPE "CompetitinStatus" AS ENUM ('UPCOMING', 'OPEN', 'CLOSED', 'FINISHED');

-- AlterTable
ALTER TABLE "Competition" ADD COLUMN     "status" "CompetitinStatus" NOT NULL DEFAULT 'UPCOMING';
