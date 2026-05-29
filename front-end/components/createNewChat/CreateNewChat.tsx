"use client";

import { useFriendStore } from "@/stores/useFriendStore";
import { PenSquare } from "lucide-react";
import { useState } from "react";
import NewChatDialog from "./NewChatDialog";

const CreateNewChat = () => {
  const { getAllFriend } = useFriendStore();
  const [openDialog, setOpenDialog] = useState(false);

  const handleNewMessage = async () => {
    setOpenDialog(true);
    try {
      await getAllFriend();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        id="btn-new-chat"
        onClick={handleNewMessage}
        className="group flex items-center gap-3 w-full px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-200 hover:scale-[1.01]"
        style={{
          background:
            "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))",
          border: "1px solid rgba(124,58,237,0.2)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.15))";
          e.currentTarget.style.boxShadow = "0 4px 16px rgba(124,58,237,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background =
            "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            boxShadow: "0 4px 10px rgba(124,58,237,0.4)",
          }}
        >
          <PenSquare size={15} className="text-white" />
        </div>
        <span className="font-semibold text-sm muji-gradient-text">
          Gửi tin nhắn mới
        </span>
      </button>

      {openDialog && (
        <NewChatDialog open={openDialog} setOpen={setOpenDialog} />
      )}
    </>
  );
};

export default CreateNewChat;
