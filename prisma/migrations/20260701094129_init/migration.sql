/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `Episode` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VideoQuality" AS ENUM ('P360', 'P480', 'P720', 'P1080');

-- AlterTable
ALTER TABLE "Episode" DROP COLUMN "videoUrl";

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "server" TEXT NOT NULL,
    "quality" "VideoQuality" NOT NULL,
    "url" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
