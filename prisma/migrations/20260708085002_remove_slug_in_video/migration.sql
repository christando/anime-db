/*
  Warnings:

  - You are about to drop the column `slug` on the `Video` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Video_slug_key";

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "slug";
