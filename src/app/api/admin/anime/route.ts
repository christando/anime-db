import { NextRequest, NextResponse } from "next/server";
import { AnimeService } from "@/services/anime.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new AnimeService();

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req)
    const body = await req.json();

    const anime = await service.createAnime(body);

    return success(anime, 200);
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

export async function GET(req: NextRequest) {
    try{
        await requireAdmin(req)

        const anime = await service.getAll();

        return success(anime, 200);
    }catch(e){
        if(e instanceof Error){

            if(e.message==="Unauthorized")
                return error("Unauthorized",401);

            if(e.message==="Forbidden")
                return error("Forbidden",403);

            return error(e.message, 500);

        }

        return error("Internal Server Error");
    }
    
}