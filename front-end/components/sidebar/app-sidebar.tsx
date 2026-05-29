"use client";

import * as React from "react";
import { Moon, Sun, MessageCircleHeart } from "lucide-react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import CreateNewChat from "../createNewChat/CreateNewChat";
import NewGroupChatModal from "../createNewGroup/NewGroupChatModal";
import { useAuthStore } from "@/stores/useAuthStore";
import GroupChatList from "../chat/group/GroupChatList";
import FriendChatList from "../chat/direct/FriendChatList";
import AddFriendModal from "../addFriend/AddFriendModal";
import { useTheme } from "@/lib/providers/ThemeProvider";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Sidebar
      {...props}
      className="border-r border-sidebar-border"
      style={{ background: "var(--sidebar)" }}
    >
      {/* ─── Header ─── */}
      <SidebarHeader className="px-3 pt-4 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Logo + Theme Toggle */}
            <div className="flex items-center justify-between px-2 py-2 mb-1">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                    boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
                  }}
                >
                  <MessageCircleHeart size={18} className="text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg leading-none muji-gradient-text">
                    Muji
                  </h1>
                  <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                    Chat App
                  </p>
                </div>
              </div>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  background:
                    mounted && theme === "dark"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(124,58,237,0.08)",
                  border:
                    mounted && theme === "dark"
                      ? "1px solid rgba(255,255,255,0.1)"
                      : "1px solid rgba(124,58,237,0.15)",
                }}
                title={
                  mounted && theme === "dark"
                    ? "Chuyển sang Light"
                    : "Chuyển sang Dark"
                }
              >
                {!mounted ? (
                  <Moon size={16} className="text-violet-600 animate-pulse" />
                ) : theme === "dark" ? (
                  <Sun size={16} className="text-yellow-400" />
                ) : (
                  <Moon size={16} className="text-violet-600" />
                )}
              </button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* New Chat Button */}
        <SidebarGroup className="px-0 pt-2 pb-0">
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      {/* ─── Content ─── */}
      <SidebarContent className="px-3 py-2 gap-0">
        {/* Group Chats */}
        <SidebarGroup className="px-0 mb-1">
          <div className="flex items-center justify-between mb-2 px-1">
            <SidebarGroupLabel className="uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-0">
              Nhóm chat
            </SidebarGroupLabel>
            <SidebarGroupAction
              title="Tạo nhóm chat"
              className="cursor-pointer relative top-0 right-0 w-6 h-6 rounded-lg hover:bg-accent transition-colors"
            >
              <NewGroupChatModal />
            </SidebarGroupAction>
          </div>
          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Divider */}
        <div className="h-px bg-sidebar-border mx-1 mb-3" />

        {/* Friends */}
        <SidebarGroup className="px-0">
          <div className="flex items-center justify-between mb-2 px-1">
            <SidebarGroupLabel className="uppercase text-[10px] font-bold tracking-widest text-muted-foreground px-0">
              Bạn bè
            </SidebarGroupLabel>
            <SidebarGroupAction
              title="Kết bạn"
              className="cursor-pointer relative top-0 right-0 w-6 h-6 rounded-lg hover:bg-accent transition-colors"
            >
              <AddFriendModal />
            </SidebarGroupAction>
          </div>
          <SidebarGroupContent>
            <FriendChatList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ─── Footer ─── */}
      <SidebarFooter className="px-3 py-3 border-t border-sidebar-border">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
