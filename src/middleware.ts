import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // проверяем токен
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  

  if (pathname === "/register" || pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  
  if (!token) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
