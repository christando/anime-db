import { NextResponse } from "next/server";
import { checkMaintenance } from "./maintenance";

export async function maintenanceGuard() {
  const maintenance = await checkMaintenance();

  if (!maintenance) {
    return null;
  }

  return NextResponse.json(
    {
      message: "Website sedang maintenance",
      maintenance: true,
    },
    {
      status: 503,
    }
  );
}