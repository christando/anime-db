import { NextRequest, NextResponse } from "next/server";
import { ScheduleService } from "@/services/schedule.service";
import { requireAdmin } from "@/lib/auth";
import { success,error } from "@/lib/api";

const service = new ScheduleService();

export async function POST(req: NextRequest) {
    try{
        await requireAdmin(req)
        const body = await req.json();
        const schedule = await service.createSchedule(body);

        return success(schedule, 200);
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

        const schedule = await service.getSchedules();
        
        return success(schedule, 200);
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

