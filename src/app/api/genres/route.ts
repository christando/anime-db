import { NextRequest, NextResponse } from "next/server";
import { GenreService } from "@/services/genre.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new GenreService();

export async function GET(req: NextRequest) {
    try{
        

        const genre = await service.getAll();

        return success(genre, 200)
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