import { prisma } from "@/lib/prisma";
import { WatchStatus } from "@prisma/client";

export class WatchlistRepository {
  async upsert(
    userId: number,
    animeId: number,
    status: WatchStatus,
    progressEpisode: number
    ) {
    return prisma.watchlist.upsert({
        where: {
        userId_animeId: {
            userId,
            animeId,
        },
        },
        update: {
        status,
        progressEpisode,
        },
        create: {
        user: {
            connect: {
            id: userId,
            },
        },
        anime: {
            connect: {
            id: animeId,
            },
        },
        status,
        progressEpisode,
        },
    });
    }

  async getAll(userId: number) {
    return prisma.watchlist.findMany({
      where: {
        userId,
      },
      include: {
        anime: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async getById(id: number) {
    return prisma.watchlist.findUnique({
      where: {
        id,
      },
      include: {
        anime: true,
      },
    });
  }

  async getByAnime(userId: number, animeId: number) {
    return prisma.watchlist.findUnique({
      where: {
        userId_animeId: {
          userId,
          animeId,
        },
      },
    });
  }

  async delete(id: number) {
    return prisma.watchlist.delete({
      where: {
        id,
      },
    });
  }
}