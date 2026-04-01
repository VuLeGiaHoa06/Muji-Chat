import { Friend } from "@/types/user";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import AvatarImg from "../avatar/AvatarImg";

const MemberBadge = ({
  selectedUserList,
  onDelete,
}: {
  selectedUserList: Friend[];
  onDelete: (id: string) => void;
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      {selectedUserList.map((u) => (
        <div
          key={u._id}
          className="flex items-center px-2 py-1 gap-2 bg-purple-200 rounded-full"
        >
          {/* AVATAR */}
          <AvatarImg avatarUrl={u.avatarUrl} name={u.displayName} />

          {/* NAME */}
          <p>{u.displayName}</p>

          {/* DELETE */}
          <button
            onClick={() => onDelete(u._id)}
            type="button"
            className="text-red-500"
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default MemberBadge;
