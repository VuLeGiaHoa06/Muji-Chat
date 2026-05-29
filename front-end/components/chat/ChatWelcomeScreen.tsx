"use client";

import React from "react";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import { MessageCircleHeart, Sparkles } from "lucide-react";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset
      className="h-full flex flex-col"
      style={{ background: "var(--background)" }}
    >
      <ChatWindowHeader />

      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8 chat-bg-pattern">
        {/* Animated logo */}
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-3xl opacity-40 blur-xl"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              animation: "pulse-ring 2.5s ease-in-out infinite",
            }}
          />
          <div
            className="relative w-24 h-24 rounded-3xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              boxShadow: "0 16px 48px rgba(124,58,237,0.4)",
            }}
          >
            <MessageCircleHeart size={44} className="text-white" />
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-2 animate-fade-up text-center max-w-sm">
          <h2 className="text-2xl font-bold muji-gradient-text">
            Chào mừng đến với Muji! 👋
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Chọn một cuộc trò chuyện từ danh sách bên trái
            <br />
            để bắt đầu nhắn tin ngay nhé.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex gap-2 flex-wrap justify-center animate-fade-up">
          {[
            "💬 Nhắn tin realtime",
            "👥 Chat nhóm",
            "📷 Gửi ảnh",
            "😊 Emoji",
          ].map((feat) => (
            <span
              key={feat}
              className="px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.08))",
                border: "1px solid rgba(124,58,237,0.2)",
                color: "var(--foreground)",
              }}
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Decorative sparkle */}
        <Sparkles
          size={20}
          className="text-violet-400 opacity-50 animate-pulse"
        />
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;
