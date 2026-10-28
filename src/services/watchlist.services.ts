import { WatchlistRepository } from "@/repositories/watchlist.repository";
import { WatchStatus } from "@prisma/client";

export class WatchlistService{
    private repo = new WatchlistRepository();

    async save(
        userId: number,
        animeId: number,
        status: WatchStatus,
        progressEpisode: number){
            return this.repo.upsert(userId, animeId, status, progressEpisode);

    }

    async getAll(userId: number){
        return this.repo.getAll(userId);
    }

    async getById(id: number){
        return this.repo.getById(id);
    }

    async delete(id: number){
        return this.repo.delete(id);
    }
}