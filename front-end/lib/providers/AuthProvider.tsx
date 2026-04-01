"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import React, { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { accessToken, user, loading, refresh } = useAuthStore();

  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================
  const [starting, setStarting] = useState(true);

  // =========================================
  // 3. SIDE EFFECTS (API calls, Subscriptions)
  // =========================================
  useEffect(() => {
    init();
  }, []);

  // =========================================
  // 4. EVENT HANDLERS (Xử lý sự kiện)
  // =========================================
  const init = () => {
    if (!accessToken) {
      // kh co token
      refresh();
    }

    if (accessToken && !user) {
      refresh();
    }

    setStarting(false); // de toggle lai compo - de cho du lieu trong store duoc update
  };

  // =========================================
  // 6. RENDER (JSX)
  // =========================================
  return (
    <>
      {loading || starting ? <p>Dang tai trang. vui long cho...</p> : children}
    </>
  );
};

export default AuthProvider;
