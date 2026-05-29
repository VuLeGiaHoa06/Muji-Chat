"use client";

import { useChatStore } from "@/stores/useChatStore";
import React from "react";
import GroupChatCard from "./GroupChatCard";

const GroupChatList = () => {
  const { conversations } = useChatStore();

  const groupChats = conversations.filter((conv) => conv.type === "group");

  if (groupChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center select-none animate-fade-in">
        <div className="w-14 h-14 mb-2.5 rounded-2xl bg-linear-to-br from-violet-500/10 to-pink-500/10 flex items-center justify-center relative">
          <svg
            className="w-7 h-7 text-violet-500/80 dark:text-violet-400/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94-3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            />
          </svg>
          {/* Blur glow behind */}
          <div className="absolute inset-0 -z-10 bg-violet-500/10 blur-xl rounded-full opacity-60" />
        </div>
        <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
          Chưa có nhóm chat nào
        </span>
        <p className="text-[9px] text-zinc-400/80 dark:text-zinc-500/80 mt-0.5 max-w-40">
          Hãy tạo một nhóm chat mới để kết nối bạn bè nhé!
        </p>
      </div>
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
