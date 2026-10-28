import { NextRequest, NextResponse } from "next/server";
import { GenreService } from "@/services/genre.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new GenreService();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id} = await params;
        const body = await req.json();
        const genre = await service.updateGenre(Number(id), body);

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
        
        const genre = await service.genreById(Number(id));
        
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

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id} = await params;
        
        const genre = await service.deleteGenre(Number(id));
        
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