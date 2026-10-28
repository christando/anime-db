import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "@/services/anime.services";

const service = new AnimeService();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const anime = await service.getAnimeDetail(Number(id));

    return NextResponse.json(anime);
  } catch {
    return NextResponse.json(
      { message: "Anime tidak ditemukan" },
      { status: 404 }
    );
  }
}