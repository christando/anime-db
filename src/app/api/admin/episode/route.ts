import { NextRequest, NextResponse } from "next/server";
import { EpisodeService } from "@/services/episode.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new EpisodeService();

export async function POST(req: NextRequest){
    try{
        await requireAdmin(req)
        const body = await req.json();
        const episode = await service.createEpisode(body);

        return success(episode, 200);
    }catch(e){
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

export async function GET(req: NextRequest){
    try{
        await requireAdmin(req)
        const episode = await service.getAll();

        return success(episode, 200);
    }catch(e){
        if(e instanceof Error){

            if(e.message==="Unauthorized")
                return error("Unauthorized",401);

            if(e.message==="Forbidden")
                return error("Forbidden",403);

        }

        return error("Internal Server Error");
    }
}