import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log("middleware run");
  // lấy cookie từ req
  const token = req.cookies.get("refreshToken")?.value;

  // routes sẽ được bảo vệ - khi người dùng chưa đnăg nhập
  const protectedRoutes = ["/chat", "/"];

  // lấy curentPath để so sánh - nếu kh có token - thì redirect sang signIn
  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // đã đăng nhập rồi - và có token rồi - thì kh cho đnăg nhập nữa
  if (pathname.startsWith("/sign-in") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/chat/:path*", "/"], // middleware này sẽ được gọi - khi url = matcher
};
