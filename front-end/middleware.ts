import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
  console.log("middleware running on:", req.nextUrl.pathname);

  const token = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;
  console.log({ token });

  // 1. Chỉ định chính xác các route cần bảo vệ (phải đăng nhập mới vào được)
  // Dùng so sánh bằng tuyệt đối để tránh "/sign-in" cũng bị tính là "/"
  const protectedRoutes = ["/"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route);

  // 2. Logic: Nếu vào trang bảo vệ mà không có token -> đá về sign-in
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 3. Logic: Nếu đã có token mà cố tình vào lại trang sign-in -> đá về trang chủ
  if (pathname.startsWith("/sign-in") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
};

export const config = {
  // Matcher này giúp loại bỏ các file hệ thống để tránh lỗi "Unsafe attempt"
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
