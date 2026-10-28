import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export interface CreateVideoInput {
  server: string;
  quality: VideoQuality;
  url: string;
  isDefault?: boolean;
}

export class VideoRepository{
    async create(
    episodeId: number,
    videos: CreateVideoInput[]
) {
    return prisma.$transaction(
        videos.map((video) =>
            prisma.video.create({
                data: {
                    server: video.server,
                    quality: video.quality,
                    url: video.url,
                    isDefault: video.isDefault ?? false,
                    episode: {
                        connect: {
                            id: episodeId,
                        },
                    },
                },
            })
        )
    );
}

    async getAll(){
        return prisma.video.findMany({

            include:{
                episode:{
                    select:{
                        id:true,
                        episodeNumber:true,
                        anime:{
                            select:{
                                titleEn:true
                            }
                        }
                    }
                }
            },

            orderBy:{
                id:"desc"
            }

        });
    }

    async getById(id: number) {
        return prisma.video.findUnique({
            where: {
                id,
            },
        });
    }

    async videoById(episodeId: number){
        return prisma.video.findMany({where: {episodeId},
            include: {episode: true},
             orderBy: {
            id: "asc"
        }});
    }

    async update(id: number, data: Prisma.VideoUpdateInput){
        return prisma.video.update({where: {id}, data});
    }

    async delete(id: number){
        return prisma.video.delete({where: {id}});
    }
}