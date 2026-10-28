import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set(
    "Access-Control-Allow-Origin",
    "http://localhost:3001"
  );

  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  response.headers.set(
  "Access-Control-Allow-Credentials",
  "true"
  );

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: ["/api/:path*"],
};