import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class GenreRepository {
    async create(data: Prisma.GenreCreateInput){
        return prisma.genre.create({
            data,
        });
    }

    async getAll(){
        return prisma.genre.findMany();
    }

    async getGenreById(id:number){
        return prisma.genre.findUnique({where:{id}})
    }

    async update(id: number, data: Prisma.GenreUpdateInput){
        return prisma.genre.update({
            where: {id}, data,
        });
    }

    async delete(id: number){
        return prisma.genre.delete({where: {id},});
    }
}