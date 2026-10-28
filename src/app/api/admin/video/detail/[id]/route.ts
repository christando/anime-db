import { NextRequest, NextResponse } from "next/server";
import { VideoService } from "@/services/video.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new VideoService();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }){
    try{
        await requireAdmin(req)

        const { id } = await params;

        const video = await service.getById(Number(id));

        return success(video, 200);
    }catch (e) {
        console.error(e);

        return error("Internal Server Error");
    }

}