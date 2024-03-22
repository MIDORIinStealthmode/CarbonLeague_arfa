/*
  Warnings:

  - You are about to drop the column `nftId` on the `Superpower` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Superpower" DROP COLUMN "nftId",
ADD COLUMN     "tokenId" INTEGER;
