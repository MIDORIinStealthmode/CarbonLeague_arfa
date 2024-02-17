/*
  Warnings:

  - Added the required column `imageUrl` to the `Superpower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Superpower" ADD COLUMN     "imageUrl" TEXT NOT NULL;
