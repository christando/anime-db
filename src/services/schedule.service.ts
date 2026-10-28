import { prisma } from "@/lib/prisma";
import { ScheduleRepository } from "@/repositories/schedule.repository";
import { Prisma } from "@prisma/client";
import { Hari } from "@prisma/client";

export class ScheduleService{
    private repo = new ScheduleRepository();

    async createSchedule(data: Prisma.ScheduleCreateInput){
        return this.repo.create(data);
    }

    async getSchedules(){
        return this.repo.getSchedule();
    }

    async updateSchedule(id: number, data: Prisma.ScheduleUpdateInput){
        return this.repo.update(id, data);
    }

    async deleteSchedule(id: number){
        return this.repo.delete(id);
    }

    async getByDay(day: Hari){
        return this.repo.getAllByDay(day);
    }
}