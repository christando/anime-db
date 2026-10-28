import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class AnimeRepository {
  async findAll() {
  const animes = await prisma.anime.findMany({
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
        orderBy: {
          releaseDate: "desc",
        },
        take: 1,
      },
    },
  });

  return animes.sort((a, b) => {
    const dateA = a.episodes[0]?.releaseDate
      ? new Date(a.episodes[0].releaseDate).getTime()
      : 0;

    const dateB = b.episodes[0]?.releaseDate
      ? new Date(b.episodes[0].releaseDate).getTime()
      : 0;

    return dateB - dateA;
  });
}

  async getPopular(){
    return prisma.anime.findMany({
      include: {
        studio: {
          include: {
            studio: true,
    },
  },
  genres: {
    include: {
      genre: true
    },
  },
  episodes: true
  },
  orderBy: {ratingScore: "desc"}
})
  }

  async count() {
    return prisma.anime.count();
  }

  async getAll(){
    return prisma.anime.findMany({include:{

      studio:{
      include:{
      studio:true
      }
      },

      genres:{
      include:{
      genre:true
      }
      },

      episodes:true

      },

      orderBy:{
      id:"desc"
      }
});
  }

  async findByName(title: string){
    return prisma.anime.findMany({
      where: {titleEn: {contains: title, mode:"insensitive"}, OR: [{titleJa: {contains: title, mode:"insensitive"}}]}
    })
  }

  async findById(id: number) {
    return prisma.anime.findUnique({
      where: { id },
      include: {
        episodes: true,
        genres: {
          include: {
            genre: true,
          },
        },
        studio:{
          include:{
            studio: true,
          }
        }
      },
    });
  }

  async create(data: any) {

    return prisma.anime.create({

        data: {

            titleEn: data.titleEn,
            titleJa: data.titleJa,
            slug : data.slug,
            synopsis: data.synopsis,

            type: data.type,
            status: data.status,

            episodesCount: data.episodesCount,

            releaseDate: data.releaseDate
                ? new Date(data.releaseDate)
                : null,

            posterImage: data.posterImage,
            bannerImage: data.bannerImage,
            ratingScore: data.ratingScore,

            studio: {
                create: data.studioIds.map((id: number) => ({
                    studio: {
                        connect: {
                            id,
                        },
                    },
                })),
            },

            genres: {
                create: data.genreIds.map((id: number) => ({
                    genre: {
                        connect: {
                            id,
                        },
                    },
                })),
            },

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
        },

    });

}

  async update(id: number, data: any) {

    const {
        genreIds,
        studioIds,
        ...animeData
    } = data;

    return prisma.anime.update({
        where: { id },

        data: {

            ...animeData,

            genres: {
                deleteMany: {},
                create: genreIds.map((genreId: number) => ({
                    genre: {
                        connect: {
                            id: genreId,
                        },
                    },
                })),
            },

            studio: {
                deleteMany: {},
                create: studioIds.map((studioId: number) => ({
                    studio: {
                        connect: {
                            id: studioId,
                        },
                    },
                })),
            },

        },

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
    });
}

  async delete(id: number) {
    return prisma.anime.delete({
      where: { id },
    });
  }

  async search(keyword: string) {
    return prisma.anime.findMany({
      where: {
        OR: [
          {
            titleEn: {
              contains: keyword,
              mode: "insensitive",
            },
          },
          {
            titleJa: {
              contains: keyword,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        studio:{
      include:{
      studio:true
      }
      },

      genres:{
      include:{
      genre:true
      }
      },

      episodes:true
      
      },
      orderBy:{
      releaseDate:"desc"
      }
    });
  }
}