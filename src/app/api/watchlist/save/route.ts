import { NextRequest } from "next/server";
import { WatchlistService } from "@/services/watchlist.services";
import { requireLogin } from "@/lib/auth";
import { success, error } from "@/lib/api";
import { WatchStatus } from "@prisma/client";

const service = new WatchlistService();

export async function POST(req: NextRequest) {
    try{
        const user = await requireLogin(req);

        const body = await req.json();

        const {
            animeId,
            status,
            progressEpisode = 0,
        } = body;

        if(!animeId){
            return error("animeId is Required", 400);
        }

        if(!status){
            return error("status is required", 400);
        }

        const watchlist = await service.save(
            user.id,
            Number(animeId),
            status as WatchStatus,
            Number(progressEpisode)
        );

        return success(watchlist, 200)
    }catch (e) {
    if (e instanceof Error) {
      if (e.message === "Unauthorized")
        return error("Unauthorized", 401);

      if (e.message === "Need Login")
        return error("Need Login", 401);

      if (e.message === "Forbidden")
        return error("Forbidden", 403);

      return error(e.message, 500);
    }

    return error("Internal Server Error", 500);
  }
}