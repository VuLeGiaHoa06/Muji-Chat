"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
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
import { Switch } from "../ui/switch";
import CreateNewChat from "../createNewChat/CreateNewChat";
import NewGroupChatModal from "../createNewGroup/NewGroupChatModal";
import { useAuthStore } from "@/stores/useAuthStore";
import GroupChatList from "../chat/group/GroupChatList";
import FriendChatList from "../chat/direct/FriendChatList";
import AddFriendModal from "../addFriend/AddFriendModal";
import { Separator } from "../ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // States
  const { user } = useAuthStore();

  return (
    <Sidebar {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex p-2 rounded-xl justify-between bg-linear-65 from-pink-500 to-purple-500">
              <h1 className="font-bold text-xl text-white">Muji</h1>
              <div className="flex items-center gap-2">
                <Sun size={18} color="white" />
                {/* gắn sự kiện switch */}
                <Switch />
                <Moon size={18} color="white" />
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="max-w-[346px] ml-3" />
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="uppercase">
              Nhóm chat
            </SidebarGroupLabel>
            <SidebarGroupAction
              title="Tạo nhóm chat"
              className="cursor-pointer"
            >
              {/* Add Group Chat */}
              <NewGroupChatModal />
            </SidebarGroupAction>
          </div>

          <SidebarGroupContent>
            {/* Group */}
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">Bạn bè</SidebarGroupLabel>
          <SidebarGroupAction title="Kết Bạn" className="cursor-pointer">
            {/* Add Friend */}
            <AddFriendModal />
          </SidebarGroupAction>
          <SidebarGroupContent>
            {/* Direct */}
            <FriendChatList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
