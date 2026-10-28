import { NextRequest, NextResponse } from "next/server";
import { EpisodeService } from "@/services/episode.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new EpisodeService();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try{
        await requireAdmin(req)
        const {id} = await params;
        const episode = await service.getEpisodeById(Number(id));
        return success(episode, 200)
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