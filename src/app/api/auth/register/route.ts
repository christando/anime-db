import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = body;

    const existing = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existing) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashed,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (err) {
    return NextResponse.json(err, {
      status: 500,
    });
  }
}