import type { Metadata } from "next";
import AuthProvider from "@/lib/providers/AuthProvider";
import ThemeProvider from "@/lib/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Muji – Chat App",
  description: "Muji – Ứng dụng nhắn tin hiện đại, kết nối mọi người",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>;
    </ThemeProvider>
  );
}
