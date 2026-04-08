import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  const proctedRoutes = ["/"];

  if (proctedRoutes.some((route) => route === pathname) && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (pathname.startsWith("/sign-in") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// 3. Cấu hình Matcher rộng hơn để middleware có thể kiểm soát cả trang Login và Home
export const config = {
  matcher: ["/"],
};
