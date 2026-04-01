import { User } from "@/types/user";
import Image from "next/image";
import React from "react";
import Avatar from "./Avatar";
import { useSocketStore } from "@/stores/useSocketStore";
import { Badge } from "lucide-react";
import StatusBadge from "../chat/StatusBadge";

const CardInfo = ({ user }: { user: User }) => {
  const { onlineUsers } = useSocketStore();
  const isOnline = onlineUsers.find((u) => u === user._id);

  if (!user.bio) {
    user.bio = "Will code for food";
  }

  return (
    <div className="bg-linear-to-r from-purple-500 to-pink-500 px-5 pb-5 pt-12 rounded-lg flex gap-3 items-end">
      {/* IMAGE */}
      <Avatar avatarUrl={user.avatarUrl}></Avatar>

      {/* DISPLAY & BIO */}
      <div className="space-y-2">
        <p className="text-2xl text-white font-bold">{user.displayName}</p>
        <p className="text-gray-300 text-sm">{user.bio}</p>
      </div>

      {/* STATUS */}
      <div className="relative flex gap-2 pl-2 pr-3 py-1 rounded-full bg-green-200">
        <StatusBadge status={isOnline ? "online" : "offline"} />
        <p className="text-[12px] text-green-500">
          {isOnline ? "online" : "offline"}
        </p>
      </div>
    </div>
  );
};

export default CardInfo;
