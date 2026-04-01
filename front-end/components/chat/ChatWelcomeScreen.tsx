import React from "react";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import Image from "next/image";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset>
      <ChatWindowHeader />
      <div className="h-full w-full flex items-center justify-center flex-col gap-3">
        <p className="font-bold text-2xl bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
          Chào mừng bạn đến với App Muji
        </p>
        <p className="font-semibold text-gray-400">
          Hãy chọn cuộc trò chuyện để bắt đầu chat
        </p>
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;
