import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Hari } from "@prisma/client";

export class ScheduleRepository{
    async create(data: Prisma.ScheduleCreateInput) {
        return prisma.schedule.create({data});
    }

    async getSchedule(){
        return prisma.schedule.findMany({
            include: {
                anime: true
            },
            orderBy: {
                hari:"asc"
            }
        });
    }

    async update(id: number, data: Prisma.ScheduleUpdateInput){
        return prisma.schedule.update({
            where: {id}, data,
        });
    }

    async delete(id: number){
        return prisma.schedule.delete({where: {id}});
    }

    async getAllByDay(day: Hari){
        return prisma.schedule.findMany({
            where: {hari: day}, 
            include:{
                anime: true,
            },
        });
    }
}