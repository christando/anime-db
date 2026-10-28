import { NextRequest, NextResponse } from "next/server";
import { VideoService } from "@/services/video.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new VideoService();

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin(req);

        const { id } = await params;

        const body = await req.json();

        const video = await service.createVideo(
            Number(id),
            body.videos
        );

        return success(video);

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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id} = await params;
        const body = await req.json();
        const genre = await service.updateVideo(Number(id), body);

        return success(genre, 200);
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id} = await params;
        
        const video = await service.getVideoById(Number(id));
        
        return success(video, 200);
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id} = await params;
        
        const genre = await service.deleteVideo(Number(id));
        
        return success(genre, 200);
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