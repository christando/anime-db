import { NextRequest } from "next/server";
import { DashboardService } from "@/services/dashboard.services";
import { requireAdmin } from "@/lib/auth";
import { success, error } from "@/lib/api";

const service = new DashboardService();

export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const dashboard = await service.getDashboard();

    return success(dashboard, 200);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "Unauthorized")
        return error("Unauthorized", 401);

      if (e.message === "Forbidden")
        return error("Forbidden", 403);

      return error(e.message, 500);
    }

    return error("Internal Server Error");
  }
}