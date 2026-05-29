"use client";

import { Bell, ChevronsUpDown, UserRound } from "lucide-react";
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
                className="group rounded-2xl h-auto py-2.5 px-3 cursor-pointer transition-all duration-200 hover:bg-accent data-[state=open]:bg-accent"
              >
                {/* Avatar with gradient ring */}
                <div className="relative flex-shrink-0">
                  <Avatar className="h-9 w-9 rounded-xl">
                    <AvatarImage src={user?.avatarUrl!} alt={user?.username} />
                    <AvatarFallback
                      className="rounded-xl text-white font-bold text-sm"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online dot */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                  <span className="truncate font-semibold text-sidebar-foreground">
                    {user?.displayName}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-hover:text-sidebar-foreground transition-colors" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-64 rounded-2xl p-1.5 shadow-xl border border-border"
              style={{ background: "var(--popover)" }}
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={8}
            >
              {/* User info header */}
              <DropdownMenuLabel className="p-0 font-normal">
                <div
                  className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1"
                  style={{ background: "var(--accent)" }}
                >
                  <Avatar className="h-10 w-10 rounded-xl">
                    <AvatarImage src={user?.avatarUrl!} alt={user?.username} />
                    <AvatarFallback
                      className="rounded-xl text-white font-bold"
                      style={{
                        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      }}
                    >
                      {user?.displayName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.displayName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => setOpenProfile((prev) => !prev)}
                  className="cursor-pointer rounded-xl flex gap-3 px-3 py-2.5 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.15)" }}
                  >
                    <UserRound size={16} className="text-violet-500" />
                  </div>
                  <span className="font-medium text-sm">Tài khoản</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenFriendRequest((prev) => !prev)}
                  className="cursor-pointer rounded-xl flex gap-3 px-3 py-2.5 transition-colors"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(236,72,153,0.15)" }}
                  >
                    <Bell size={16} className="text-pink-500" />
                  </div>
                  <span className="font-medium text-sm">Thông báo</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1.5" />

              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-xl px-3 py-2.5">
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
