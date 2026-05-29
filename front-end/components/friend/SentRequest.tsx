"use client";

import { useFriendStore } from "@/stores/useFriendStore";
import React from "react";
import FriendRequestItem from "./FriendRequestItem";
import { Send, Clock } from "lucide-react";

const SentRequest = () => {
  const { sentList } = useFriendStore();

  if (!sentList || sentList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center select-none animate-fade-in">
        <div className="w-14 h-14 mb-4.5 rounded-full bg-violet-500/5 dark:bg-violet-500/10 flex items-center justify-center relative">
          <Send
            size={20}
            className="text-violet-500/60 dark:text-violet-400/60 -rotate-12"
          />
          <div className="absolute inset-0 -z-10 bg-violet-500/10 blur-xl rounded-full opacity-60" />
        </div>
        <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
          Chưa gửi lời mời nào
        </span>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-[240px] leading-relaxed">
          Bạn chưa gửi lời mời kết bạn nào đi trong thời gian gần đây.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 max-h-[360px] overflow-y-auto pr-1 -mr-2 custom-scrollbar">
      {sentList.map((r) => (
        <FriendRequestItem
          key={r._id}
          avatarUrl={r.to.avatarUrl}
          displayName={r.to.displayName}
          username={r.to.username}
          action={
            <div className="flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/15 text-amber-600 dark:text-amber-400 pl-2 pr-2.5 py-1 rounded-xl text-[10px] font-bold tracking-wider uppercase select-none">
              <Clock size={11} className="animate-spin-slow" />
              <span>Chờ phản hồi</span>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default SentRequest;
