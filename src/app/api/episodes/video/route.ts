import { NextRequest, NextResponse } from "next/server";
import { VideoService } from "@/services/video.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";
import { maintenanceGuard } from "@/lib/maintenanceGuard";

const service = new VideoService();

export async function GET(){
    try{
        const video = await service.getAll();
        
        const guard = await maintenanceGuard();
        
            if (guard) return guard;

        return success(video, 200)
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