import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class StudioRepository {
    async create(data: Prisma.StudioCreateInput){
        return prisma.studio.create({data,});
    }

    async getAll(){
        return prisma.studio.findMany();
    }

    async update(id: number, data: Prisma.StudioUpdateInput){
        return prisma.studio.update({
            where: {id}, data,
        });
    }

    async delete(id: number){
        return prisma.studio.delete({where: {id},});
    }

    async studioById(id: number){
        return prisma.studio.findUnique({where: {id}});
    }
}