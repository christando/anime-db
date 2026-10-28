import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/services/user.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new UserService();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> } ){
    try{
        await requireAdmin(req)
        const {id}= await params;
        const body = await req.json();
        const user = await service.updateRole(Number(id), body.role)

        return success(user,200);
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