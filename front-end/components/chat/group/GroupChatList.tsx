"use client";

import { useChatStore } from "@/stores/useChatStore";
import React, { useEffect } from "react";
import GroupChatCard from "./GroupChatCard";

const GroupChatList = () => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { conversations } = useChatStore();

  const groupChats = conversations.filter((conv) => conv.type === "group");

  if (groupChats.length === 0) {
    return (
      <p className="text-gray-400 font-semibold ml-2">Chưa có nhóm chat nào!</p>
    );
  }

  return (
    <div className="space-y-2">
      {groupChats.map((conv) => (
        <GroupChatCard key={conv._id} conv={conv} />
      ))}
    </div>
  );
};

export default GroupChatList;
