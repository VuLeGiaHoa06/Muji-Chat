import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log("middleware running");

  const token = req.cookies.get("refreshToken")?.value;

  console.log({ token });

  const { pathname } = req.nextUrl;
  const protectedRoute = ["/"];

  if (protectedRoute.some((route) => pathname.includes(route) && !token)) {
    return NextResponse.redirect(new URL("/sign-in", req.url)); // http://localhost:3000/login
  }

  if (pathname.startsWith("/sign-in") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
