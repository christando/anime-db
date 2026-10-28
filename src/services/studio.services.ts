import { StudioRepository } from "@/repositories/studio.repository";
import { Prisma } from "@prisma/client";

export class StudioService{
    private repo = new StudioRepository();

    async createStudio(data: Prisma.StudioCreateInput){
        return this.repo.create(data);
    }

    async getAll(){
        return this.repo.getAll();
    }

    async updateStudio(id:number, data: Prisma.StudioUpdateInput){
        return this.repo.update(id, data);
    }

    async deleteStudio(id:number){
        return this.repo.delete(id);
    }

    async getStudioById(id:number){
        return this.repo.studioById(id);
    }
}