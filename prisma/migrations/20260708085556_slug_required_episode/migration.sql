/*
  Warnings:

  - Made the column `slug` on table `Episode` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Episode" ALTER COLUMN "slug" SET NOT NULL;
