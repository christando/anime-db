import { NextRequest, NextResponse } from "next/server";
import { SettingServices } from "@/services/setting.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new SettingServices();

export async function PUT(req: NextRequest ){
    try{
        await requireAdmin(req)
        const body = await req.json();
        const maintenance = await service.updateSetting(body.maintenance);

        return success(maintenance,200);
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

export async function GET(req: NextRequest) {
    try{
        await requireAdmin(req)
        const user = await service.getSetting();
        return success(user, 201)
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