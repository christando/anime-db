import { prisma } from "@/lib/prisma";

export class DashboardRepository {
  async getStats() {
    const [
      totalAnime,
      totalEpisode,
      totalGenre,
      totalStudio,
      totalUser,
      totalVideo,
      maintenance,
      recentAnime,
      animeStatus,
      animeType,
    ] = await Promise.all([
      prisma.anime.count(),

      prisma.episode.count(),

      prisma.genre.count(),

      prisma.studio.count(),

      prisma.user.count(),

      prisma.video.count(),

      prisma.setting.findUnique({
        where: {
          id: 1,
        },
      }),

      prisma.anime.findMany({
        take: 5,
        orderBy: {
          id: "desc",
        },
        include: {
          studio: {
            include: {
              studio: true,
            },
          },
        },
      }),

      prisma.anime.groupBy({
        by: ["status"],
        _count: {
          status: true,
        },
      }),

      prisma.anime.groupBy({
        by: ["type"],
        _count: {
          type: true,
        },
      }),
    ]);

    return {
      totalAnime,
      totalEpisode,
      totalGenre,
      totalStudio,
      totalUser,
      totalVideo,

      maintenance: maintenance?.maintenance ?? false,

      recentAnime,

      animeStatus,

      animeType,
    };
  }
}