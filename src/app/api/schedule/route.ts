import { NextRequest, NextResponse } from "next/server";
import { ScheduleService } from "@/services/schedule.service";
import { success,error } from "@/lib/api";

const service = new ScheduleService();

export async function GET() {
    try{
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