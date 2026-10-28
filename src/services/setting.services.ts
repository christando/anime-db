import { SettingRepository } from "@/repositories/setting.repository";
import { Prisma } from "@prisma/client";

export class SettingServices{
    private repo = new SettingRepository();

    async getSetting(){
        return this.repo.get();
    }

    async getSettingPub(){
        const setting = await this.repo.get();

        return {
            maintenance: setting.maintenance,
        };
    }

    async updateSetting(maintenance: boolean){
        return this.repo.update(maintenance);
    }
}