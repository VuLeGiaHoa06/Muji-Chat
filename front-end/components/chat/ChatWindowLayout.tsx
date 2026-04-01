"use client";

import React, { useEffect } from "react";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowBody from "./ChatWindowBody";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatWindowLayout = () => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { conversations, activeConversationId } = useChatStore();

  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================
  const selectedConv =
    conversations.find((conv) => conv._id === activeConversationId) ?? null;

  // =========================================
  // 3. RENDER (JSX)
  // =========================================
  if (!selectedConv) {
    return <ChatWelcomeScreen />;
  }

  return (
    <SidebarInset className="h-full">
      {/* Header */}
      <ChatWindowHeader selectedConv={selectedConv} />

      {/* Body */}
      <ChatWindowBody selectedConv={selectedConv} />

      {/* Message input */}
      <MessageInput selectedConv={selectedConv} />
    </SidebarInset>
  );
};

export default ChatWindowLayout;
