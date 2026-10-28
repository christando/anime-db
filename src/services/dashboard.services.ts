import { DashboardRepository } from "@/repositories/dashboard.repository";

export class DashboardService {
  private repo = new DashboardRepository();

  async getDashboard() {
    return this.repo.getStats();
  }
}