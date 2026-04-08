import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // 1. Nếu đã có token mà cố tình vào lại trang Login -> Đẩy về trang chủ
  if (pathname.startsWith("/sign-in") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2. Nếu CHƯA có token mà cố vào trang chủ (hoặc các trang cần bảo vệ) -> Đẩy về Login
  // Ở đây mình check pathname === "/" để chính xác là trang chủ
  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

// 3. Cấu hình Matcher rộng hơn để middleware có thể kiểm soát cả trang Login và Home
export const config = {
  matcher: [
    "/", // Trang chủ
    "/sign-in", // Trang đăng nhập
    "/sign-up", // Trang đăng ký (nếu có)
    /*
     * Loại trừ các file tĩnh để tránh middleware chạy lãng phí:
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|placeholder.png).*)",
  ],
};
