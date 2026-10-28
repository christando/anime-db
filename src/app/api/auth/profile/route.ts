import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Profile endpoint belum diimplementasikan" },
    { status: 501 }
  );
}