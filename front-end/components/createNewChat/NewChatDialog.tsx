import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MessageCircleMore } from "lucide-react";
import { useFriendStore } from "@/stores/useFriendStore";
import FriendCard from "./FriendCard";

const NewChatDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { friends } = useFriendStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-lg">
        <DialogHeader>
          <div className="flex gap-2 items-center">
            <MessageCircleMore size={20} />
            <DialogTitle className="text-[20px]">
              Bắt đầu cuộc hội thoại mới
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription className="text-[18px] text-gray-400 font-semibold">
          Danh sách bạn bè
        </DialogDescription>

        {friends.length === 0 && (
          <p>Hãy kết bạn để bắt đầu cuộc trò chuyện nào</p>
        )}

        {/* frined list */}
        {friends.length > 0 &&
          friends.map((f) => (
            <FriendCard
              key={f._id}
              avatarUrl={f.avatarUrl}
              displayName={f.displayName}
              username={f.username}
              friendId={f._id}
              onClose={setOpen}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
