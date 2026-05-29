"use client";

import React, { Dispatch, SetStateAction } from "react";
import AvatarImg from "../avatar/AvatarImg";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Friend } from "@/types/user";
import { MessageSquare, ChevronRight } from "lucide-react";

interface FriendCardProps {
  avatarUrl: null | string;
  displayName: string;
  username: string;
  friendId: string;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const FriendCard = ({
  avatarUrl,
  displayName,
  username,
  friendId,
  onClose,
}: FriendCardProps) => {
  const { createConversation } = useChatStore();
  const { user } = useAuthStore();

  if (!user) return null;

  const handleConversation = async () => {
    const memberIds = [user?._id, friendId];

    try {
      onClose(false);
      await createConversation("direct", "", memberIds);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={handleConversation}
      className="group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all duration-200 bg-zinc-500/5 dark:bg-zinc-900/40 border border-transparent dark:border-zinc-900/60 hover:border-violet-500/20 hover:bg-violet-500/5 dark:hover:bg-violet-500/10 hover:scale-[1.01] hover:shadow-lg hover:shadow-violet-500/5"
    >
      <div className="flex gap-3.5 items-center">
        <div className="relative">
          <AvatarImg avatarUrl={avatarUrl} name={displayName} size="md" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-zinc-950 rounded-full" />
        </div>

        <div className="flex flex-col text-left">
          <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
            {displayName}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            @{username || "username"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-violet-500/10 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-500 text-violet-500 dark:text-violet-400 group-hover:text-white transition-all duration-300">
          <MessageSquare
            size={14}
            className="group-hover:scale-110 transition-transform"
          />
        </div>
        <ChevronRight
          size={16}
          className="text-zinc-300 dark:text-zinc-700 group-hover:text-violet-400 dark:group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </div>
  );
};

export default FriendCard;
