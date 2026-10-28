import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class EpisodeRepository{
    async create(data: Prisma.EpisodeUncheckedCreateInput) {
        return prisma.episode.create({
            data: {
            animeId: data.animeId,
            episodeNumber: data.episodeNumber,
            slug: data.slug,
            title: data.title,
            releaseDate: data.releaseDate
                ? new Date(data.releaseDate)
                : null,
            },
        });
    }

    async getAll(){
        return prisma.episode.findMany({
    include: {
      anime: true,
      videos: true,
    },
    orderBy: [
      {
        animeId: "asc",
      },
      {
        episodeNumber: "asc",
      },
    ],
  });
    }
    
    async update(id: number, data: any) {
        return prisma.episode.update({
            where: {
            id,
            },
            data: {
            episodeNumber: data.episodeNumber,
            slug: data.slug,
            title: data.title,
            releaseDate: data.releaseDate
                ? new Date(data.releaseDate)
                : null,
            },
        });
    }

    async getByAnimeId(animeId: number) {
        return prisma.episode.findMany({
            where: {
                animeId,
            },
            include: {
                anime: true,
                videos: true,
            },
            orderBy: {
                episodeNumber: "asc",
            },
        });
    }

    async getById(id: number) {
        return prisma.episode.findUnique({
            where: {
                id,
            },
            include: {
                anime: true,
            },
        });
    }

    async videoBySlug(slug: string) {
        const episode = await prisma.episode.findUnique({
            where: {
            slug,
            },
            include: {
            anime: {
                include: {
                genres: {
                    include: {
                    genre: true,
                    },
                },
                studio: {
                    include: {
                    studio: true,
                    },
                },
                },
            },
            videos: {
                orderBy: {
                createdAt: "asc",
                },
            },
            },
        });

        if (!episode) return null;

        const [prevEpisode, nextEpisode] = await Promise.all([
            prisma.episode.findFirst({
            where: {
                animeId: episode.animeId,
                episodeNumber: {
                lt: episode.episodeNumber,
                },
            },
            orderBy: {
                episodeNumber: "desc",
            },
            select: {
                slug: true,
            },
            }),

            prisma.episode.findFirst({
            where: {
                animeId: episode.animeId,
                episodeNumber: {
                gt: episode.episodeNumber,
                },
            },
            orderBy: {
                episodeNumber: "asc",
            },
            select: {
                slug: true,
            },
            }),
        ]);

        return {
            ...episode,
            prevEpisodeSlug: prevEpisode?.slug ?? null,
            nextEpisodeSlug: nextEpisode?.slug ?? null,
        };
    }

    async episodeBySlug(slug: string) {
        return prisma.anime.findUnique({
            where: {
                slug,
            },
            include: {
                studio: {
                    include: {
                        studio: true,
                    },
            },
            genres: {
                include: {
                    genre: true,
                },
            },
            episodes: {
                include: {
                    videos: true,
                },
                orderBy: {
                    episodeNumber: "asc",
                },
            },
            },
        });
    }

    async episodeById(id: number){
        return prisma.episode.findUnique({where: {id}});
    }

    async delete(id: number){
      return prisma.episode.delete({where: {id}});
    }
}
