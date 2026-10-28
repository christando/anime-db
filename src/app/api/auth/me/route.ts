import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { success, error } from "@/lib/api";

export async function GET(req: NextRequest) {
  try {
    const authUser = await requireAuth(req);

    const user = await prisma.user.findUnique({
      where: {
        id: authUser.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return error("User not found", 404);
    }

    return success(user, 200);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === "Unauthorized") {
        return error("Unauthorized", 401);
      }

      return error(e.message, 500);
    }

    return error("Internal Server Error", 500);
  }
}