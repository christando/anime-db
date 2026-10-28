import { NextRequest } from "next/server";
import { verifyToken } from "./jwt";

export interface AuthUser {
  id: number;
  email: string;
  role: string;
}

export async function requireAuth(
  req: NextRequest
): Promise<AuthUser> {

  const token = req.cookies.get("token")?.value;

  console.log("token = ", token);

  if (!token) {
    throw new Error("Unauthorized");
  }

  try {
    const payload = verifyToken(token) as AuthUser;

    return payload;

  } catch {

    throw new Error("Unauthorized");

  }
}

export async function requireAdmin(
  req: NextRequest
): Promise<AuthUser> {

  const user = await requireAuth(req);

  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return user;
}

export async function requireLogin(req: NextRequest): Promise<AuthUser> {
  const user = await requireAuth(req);

  if (!["ADMIN", "USER"].includes(user.role)) {
    throw new Error("Need Login");
  }

  return user;
}