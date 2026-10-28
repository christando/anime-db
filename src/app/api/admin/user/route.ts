import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/user.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new UserService();

export async function GET(req: NextRequest) {
    try{
        await requireAdmin(req)
        const user = await service.getAll();
        return success(user, 201)
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