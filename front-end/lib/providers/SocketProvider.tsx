"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useSocketStore } from "@/stores/useSocketStore";
import { ReactNode, useEffect } from "react";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { accessToken } = useAuthStore();
  const { connectSocket, disconnectSocket } = useSocketStore();

  // =========================================
  // 2. SIDE EFFECTS (API calls, Subscriptions)
  // =========================================
  useEffect(() => {
    if (accessToken === null) return;

    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [accessToken]);

  // =========================================
  // 3. RENDER (JSX)
  // =========================================
  return children;
};

export default SocketProvider;
