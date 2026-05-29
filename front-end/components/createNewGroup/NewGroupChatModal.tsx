"use client";

import { Plus } from "lucide-react";
import { NewGroupDialog } from "@/components/createNewGroup";
import { useState } from "react";
import { useFriendStore } from "@/stores/useFriendStore";

const NewGroupChatModal = () => {
  // GLOBAL STATE
  const { getAllFriend } = useFriendStore();

  // LOCAL STATE
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setOpen((prev) => !prev);

    try {
      await getAllFriend();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-full h-full flex items-center justify-center cursor-pointer text-zinc-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
        title="Tạo nhóm chat mới"
      >
        <Plus size={15} className="hover:scale-110 transition-transform" />
      </div>

      {open && <NewGroupDialog open={open} setOpen={setOpen} />}
    </>
  );
};

export default NewGroupChatModal;
