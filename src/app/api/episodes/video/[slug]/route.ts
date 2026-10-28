import { NextRequest, NextResponse } from "next/server";
import { EpisodeService } from "@/services/episode.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";
import { maintenanceGuard } from "@/lib/maintenanceGuard";

const service = new EpisodeService();

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }){
    try{
        const {slug} = await params;
        
        const episode = await service.getvideoBySlug(slug);
        
        const guard = await maintenanceGuard();
                
            if (guard) return guard;
        return success(episode, 200)
    }catch(e){
        if(e instanceof Error){

            if(e.message==="Unauthorized")
                return error("Unauthorized",401);

            if(e.message==="Forbidden")
                return error("Forbidden",403);
            return error(e.message, 500)
        }

        return error("Internal Server Error");
    }
}