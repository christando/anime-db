import { Role } from "@prisma/client";
import { UserRepository } from "@/repositories/user.repository";

export class UserService {
  private repo = new UserRepository();

  async getAll() {
    return this.repo.getAll();
  }

  async updateRole(id: number, role: Role) {
    return this.repo.updateRole(id, role);
  }
}