import { cn } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";
import AvatarImg from "../avatar/AvatarImg";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { Friend } from "@/types/user";

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

  if (!user) return;

  const handleConveration = async () => {
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
      className={cn(
        "border border-gray-100 bg-white shadow-sm cursor-pointer rounded-xl p-3 flex gap-2 justify-between hover:shadow-lg",
      )}
      onClick={handleConveration}
    >
      <div className="flex gap-3 items-center">
        <AvatarImg avatarUrl={avatarUrl} name={displayName} />

        <div>
          <p className="text-[18px] font-bold">{displayName}</p>

          <p className="text-[14px] text-gray-500">@{username}</p>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
