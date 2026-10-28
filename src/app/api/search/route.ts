import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "@/services/anime.services";
import { maintenanceGuard } from "@/lib/maintenanceGuard";


const service = new AnimeService();

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("q") ?? "";

  const data = await service.searchAnime(keyword);

  const guard = await maintenanceGuard();
                
  if (guard) return guard;

  return NextResponse.json(data);
}