import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "@/services/anime.services";
import { success,error } from "@/lib/api";
import { maintenanceGuard } from "@/lib/maintenanceGuard";


const service = new AnimeService();

export async function GET(req: NextRequest) {
  try {
    // const page = Number(req.nextUrl.searchParams.get("page")) || 1;

    const result = await service.getLatestAnime();
    const guard = await maintenanceGuard();

    if (guard) return guard;

    return success(result, 200);
  } catch(e){
        if(e instanceof Error){

            if(e.message==="Unauthorized")
                return error("Unauthorized",401);

            if(e.message==="Forbidden")
                return error("Forbidden",403);
            
            return error(e.message,500);

        }

        return error("Internal Server Error");
    }
}