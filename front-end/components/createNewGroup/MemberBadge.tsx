"use client";

import { Friend } from "@/types/user";
import React from "react";
import AvatarImg from "../avatar/AvatarImg";
import { X } from "lucide-react";

const MemberBadge = ({
  selectedUserList,
  onDelete,
}: {
  selectedUserList: Friend[];
  onDelete: (id: string) => void;
}) => {
  if (selectedUserList.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-5 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
      {selectedUserList.map((u) => (
        <div
          key={u._id}
          className="group flex items-center pl-1.5 pr-2.5 py-1 gap-2 bg-violet-500/10 dark:bg-violet-500/20 border border-violet-500/20 rounded-full whitespace-nowrap transition-all duration-200 hover:bg-violet-500/15 dark:hover:bg-violet-500/30 hover:scale-[1.02] shadow-xs"
        >
          {/* AVATAR */}
          <AvatarImg avatarUrl={u.avatarUrl} name={u.displayName} size="sm" />

          {/* NAME */}
          <span className="text-xs font-semibold text-violet-700 dark:text-violet-200 select-none">
            {u.displayName}
          </span>

          {/* DELETE */}
          <button
            onClick={() => onDelete(u._id)}
            type="button"
            className="w-4 h-4 rounded-full flex items-center justify-center text-violet-400 hover:text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/20 transition-all duration-200 cursor-pointer"
            title="Xóa thành viên"
          >
            <X size={11} strokeWidth={2.5} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberBadge;
