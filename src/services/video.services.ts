import { VideoRepository } from "@/repositories/video.repository";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { VideoQuality } from "@prisma/client";

export interface CreateVideoInput {
  server: string;
  quality: VideoQuality;
  url: string;
  isDefault?: boolean;
}

export class VideoService{
    private repo = new VideoRepository();

    async createVideo( episodeId: number, data: CreateVideoInput[] ){ 
        return this.repo.create(episodeId, data); 
    }

    async getAll(){
        return this.repo.getAll();
    }

    async updateVideo(id: number, data: Prisma.VideoUpdateInput){ 
        return this.repo.update(id, data); 
    }

    async getById(id: number){
        return this.repo.getById(id);
    }

    async getVideoById(id: number){
        return this.repo.videoById(id);
    }

    async deleteVideo(id: number){
        return this.repo.delete(id);
    }
}