import { NextRequest, NextResponse } from "next/server";
import { StudioService } from "@/services/studio.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new StudioService();

export async function GET(req: NextRequest) {
    try{


        const genre = await service.getAll();

        return success(genre, 201)
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