import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import SocketProvider from "@/lib/providers/SocketProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muji – Chat App",
  description: "Muji – Ứng dụng nhắn tin hiện đại, kết nối mọi người",
  keywords: ["chat", "messaging", "realtime", "muji"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased overflow-y-hidden overflow-x-hidden`}
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <SocketProvider>{children}</SocketProvider>
        <ToasterProvider />
      </body>
    </html>
  );
}
