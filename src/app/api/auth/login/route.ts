import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/bcrypt";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Email not found",
        },
        { status: 401 }
      );
    }

    const valid = await comparePassword(
      password,
      user.password
    );

    if (!valid) {
      return NextResponse.json(
        {
          message: "Wrong password",
        },
        { status: 401 }
      );
    }

    const token = generateToken({
    id: user.id,
    role: user.role,
    email: user.email,
  });
    
    const response = NextResponse.json({
    message: "Login berhasil",
    user,
});

response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
});

    return response;
  } catch (err) {
    return NextResponse.json(err, {
      status: 500,
    });
  }
}