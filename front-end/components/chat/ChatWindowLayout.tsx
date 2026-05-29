"use client";

import React from "react";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowBody from "./ChatWindowBody";
import MessageInput from "./MessageInput";
import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";

const ChatWindowLayout = () => {
  const { conversations, activeConversationId } = useChatStore();

  const selectedConv =
    conversations.find((conv) => conv._id === activeConversationId) ?? null;

  if (!selectedConv) {
    return <ChatWelcomeScreen />;
  }

  return (
    <SidebarInset
      className="flex flex-col h-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* Header – fixed at top */}
      <ChatWindowHeader selectedConv={selectedConv} />

      {/* Body – scrollable, fills remaining space */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ChatWindowBody selectedConv={selectedConv} />
      </div>

      {/* Input – fixed at bottom */}
      <MessageInput selectedConv={selectedConv} />
    </SidebarInset>
  );
};

export default ChatWindowLayout;
