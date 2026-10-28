import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export class UserRepository {
  async getAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateRole(id: number, role: Role) {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
  }
}