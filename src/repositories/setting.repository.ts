import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class SettingRepository {

  async get() {
    return prisma.setting.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
      },
    });
  }

  async update(maintenance: boolean) {
    return prisma.setting.update({
      where: {
        id: 1,
      },
      data: {
        maintenance,
      },
    });
  }

}