import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://muji-chat-1-front-end.onrender.com/api/:path*", // URL backend Render của bạn
      },
    ];
  },
};

export default nextConfig;
