"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import avatarPlaceholder from "@/public/avatar_placeholder.jpg";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";
import Image from "next/image";
import { useState } from "react";
import ProfileDialog from "../profile/ProfileDialog";
import FriendRequestDialog from "../friend/FriendRequestDialog";
import Logout from "../auth/Logout";

export function NavUser({ user }: { user: User | null }) {
  const { isMobile } = useSidebar();

  const [openProfile, setOpenProfile] = useState(false);
  const [openFriendRequest, setOpenFriendRequest] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.avatarUrl!} alt={user?.username} />
                  <AvatarFallback className="rounded-lg">
                    <Image src={avatarPlaceholder} alt="avatar-placeholder" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatarUrl!} alt={user?.username} />
                    <AvatarFallback className="rounded-lg">
                      <Image src={avatarPlaceholder} alt="avatar-placeholder" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.displayName}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setOpenProfile((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <UserRound />
                  <p>Tài khoản</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpenFriendRequest((prev) => !prev)}
                  className="
                  cursor-pointer"
                >
                  <Bell />
                  <p>Thông báo</p>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  {/* logout */}
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {openProfile && (
        <ProfileDialog open={openProfile} setOpen={setOpenProfile} />
      )}

      {openFriendRequest && (
        <FriendRequestDialog
          open={openFriendRequest}
          setOpen={setOpenFriendRequest}
        />
      )}
    </>
  );
}
