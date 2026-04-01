"use client";

import ChatWindowLayout from "@/components/chat/ChatWindowLayout";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const ChatAppPage = () => {
  return (
    <SidebarProvider className="flex h-full">
      <AppSidebar />

      <div className="h-full flex flex-col flex-1">
        <ChatWindowLayout />
      </div>
    </SidebarProvider>
  );
};

export default ChatAppPage;
