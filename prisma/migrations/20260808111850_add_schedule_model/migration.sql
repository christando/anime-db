-- CreateEnum
CREATE TYPE "Hari" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU', 'RANDOM');

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "animeId" INTEGER NOT NULL,
    "hari" "Hari" NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_animeId_key" ON "Schedule"("animeId");

-- CreateIndex
CREATE INDEX "Schedule_hari_idx" ON "Schedule"("hari");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_animeId_fkey" FOREIGN KEY ("animeId") REFERENCES "Anime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
