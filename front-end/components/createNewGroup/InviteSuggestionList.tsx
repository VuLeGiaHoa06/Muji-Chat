"use client";

import { Friend } from "@/types/user";
import React from "react";
import AvatarImg from "../avatar/AvatarImg";
import { Search, UserPlus } from "lucide-react";

const InviteSuggestionList = ({
  searchedUsername,
  handleSelectedUser,
}: {
  searchedUsername: Friend[];
  handleSelectedUser: (f: Friend) => void;
}) => {
  if (searchedUsername.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-zinc-400 dark:text-zinc-500">
        <div className="w-12 h-12 rounded-full bg-violet-500/5 dark:bg-violet-500/10 flex items-center justify-center mb-3">
          <Search
            size={20}
            className="text-violet-500/60 dark:text-violet-400/60"
          />
        </div>
        <p className="text-xs font-medium">
          Tìm kiếm để thêm bạn bè vào nhóm chat!
        </p>
        <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-0.5">
          Nhập tên bạn bè ở ô tìm kiếm phía trên
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 my-4 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
      <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
        Kết quả tìm kiếm ({searchedUsername.length})
      </p>
      {searchedUsername.map((f: Friend) => (
        <div
          key={f._id}
          onClick={() => handleSelectedUser(f)}
          className="group flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 bg-zinc-500/5 dark:bg-zinc-800/20 border border-transparent hover:border-violet-500/20 hover:bg-violet-500/10 dark:hover:bg-violet-500/10 hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3">
            <AvatarImg avatarUrl={f.avatarUrl} name={f.displayName} size="md" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                {f.displayName}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500">
                @{f.username || "username"}
              </span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-violet-500/10 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-pink-500 group-hover:text-white text-violet-500 dark:text-violet-400 transition-all duration-200">
            <UserPlus
              size={14}
              className="group-hover:scale-110 transition-transform"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InviteSuggestionList;
