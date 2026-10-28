import { NextRequest, NextResponse } from "next/server";
import { StudioService } from "@/services/studio.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new StudioService();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id} = await params;
        const body = await req.json();
        const studio = await service.updateStudio(Number(id), body);

        return success(studio, 200);
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
        const studio = await service.getStudioById(Number(id));

        return success(studio, 200);
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
        
        const studio = await service.deleteStudio(Number(id));
        
        return success(studio, 200);
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