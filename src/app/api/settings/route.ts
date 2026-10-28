import { NextRequest, NextResponse } from "next/server";
import { SettingServices } from "@/services/setting.services";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new SettingServices();

export async function GET() {
    try{
        const setting = await service.getSettingPub();
        return success(setting, 200)
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