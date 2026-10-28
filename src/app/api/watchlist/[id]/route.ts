import { NextRequest } from "next/server";
import { WatchlistService } from "@/services/watchlist.services";
import { requireLogin } from "@/lib/auth";
import { success, error } from "@/lib/api";
import { WatchStatus } from "@prisma/client";

const service = new WatchlistService();

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try{
        await requireLogin(req);

        const {id} = await params;

        const watchlist = await service.getAll(Number(id));
        

        return success(watchlist, 200);
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