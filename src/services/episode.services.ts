import { prisma } from "@/lib/prisma";
import { EpisodeRepository } from "@/repositories/episode.repository";
import { Prisma } from "@prisma/client";
import { generateEpisodeSlug } from "@/lib/slug";

export class EpisodeService{
    private repo = new EpisodeRepository();

    async createEpisode(data: Prisma.EpisodeUncheckedCreateInput) {
        const anime = await prisma.anime.findUnique({
            where: {
            id: data.animeId,
            },
        });

        if (!anime) {
            throw new Error("Anime not found");
        }

        const slug = await generateEpisodeSlug(
            anime.titleEn,
            data.episodeNumber
        );

        return this.repo.create({
            ...data,
            slug,
        });
        }

    async getAll(){
        return this.repo.getAll();
    }

    async getEpisodeByAnimeId(animeId: number) {
        return this.repo.getByAnimeId(animeId);
    }

    async updateEpisode(
        id: number,
        data: Prisma.EpisodeUpdateInput
        ) {
        const episode = await this.repo.getById(id);

        if (!episode) {
            throw new Error("Episode not found");
        }

        const anime = await prisma.anime.findUnique({
            where: {
            id: episode.animeId,
            },
        });

        if (!anime) {
            throw new Error("Anime not found");
        }

        const episodeNumber =
            typeof data.episodeNumber === "number"
            ? data.episodeNumber
            : episode.episodeNumber;

        const slug = await generateEpisodeSlug(
            anime.titleEn,
            episodeNumber,
            id
        );

        return this.repo.update(id, {
            ...data,
            slug,
        });
        }

    async getEpisodeById(id: number){
        return this.repo.getById(id);
    }

    async getById(id:number){
        return this.repo.episodeById(id)
    }

    async deleteEpisode(id: number){
        return this.repo.delete(id);
    }

    async getEpisodeBySlug(slug: string){
        return this.repo.episodeBySlug(slug);
    }

    async getvideoBySlug(slug: string){
        return this.repo.videoBySlug(slug);
    }
}