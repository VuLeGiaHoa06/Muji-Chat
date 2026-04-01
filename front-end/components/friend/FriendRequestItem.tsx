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
        "w-full border-2 border-gray-300 shadow-sm bg-white rounded-xl p-3 flex gap-2 justify-between",
      )}
    >
      <div className="flex gap-3 items-center justify-between w-full">
        {/* Avatar */}
        <div className="flex gap-2 items-center">
          <AvatarImg avatarUrl={avatarUrl} name={displayName} />

          <div>
            <p className="text-[18px] font-bold">{displayName}</p>
            <p className="text-[12px] text-gray-500">@{username}</p>
          </div>
        </div>

        <div className="flex gap-2">{action}</div>
      </div>
    </div>
  );
};

export default FriendRequestItem;
