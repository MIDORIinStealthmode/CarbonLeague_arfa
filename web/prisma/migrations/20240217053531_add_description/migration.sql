/*
  Warnings:

  - Added the required column `description` to the `Superpower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Superpower" ADD COLUMN     "description" TEXT NOT NULL;
