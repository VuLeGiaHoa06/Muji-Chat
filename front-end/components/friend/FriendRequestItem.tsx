"use client";

import { cn } from "@/lib/utils";
import React from "react";
import AvatarImg from "../avatar/AvatarImg";

interface FriendRequestItemProps {
  avatarUrl: string | null;
  displayName: string;
  username: string;
  action: React.ReactNode;
}

const FriendRequestItem = ({
  avatarUrl,
  displayName,
  username,
  action,
}: FriendRequestItemProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 bg-zinc-500/5 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/40 hover:border-violet-500/30 dark:hover:border-violet-500/30 hover:bg-violet-500/5 dark:hover:bg-violet-500/10 hover:scale-[1.01] hover:shadow-lg hover:shadow-violet-500/5 animate-fade-in",
      )}
    >
      <div className="flex gap-3.5 items-center justify-between w-full">
        {/* Avatar & Info */}
        <div className="flex gap-3 items-center">
          <AvatarImg avatarUrl={avatarUrl} name={displayName} size="md" />

          <div className="flex flex-col text-left">
            <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
              {displayName}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
              @{username || "username"}
            </span>
          </div>
        </div>

        {/* Action button container */}
        <div className="flex items-center gap-2 flex-shrink-0">{action}</div>
      </div>
    </div>
  );
};

export default FriendRequestItem;
