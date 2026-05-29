"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import AvatarImg from "../avatar/AvatarImg";
import { useChatStore } from "@/stores/useChatStore";
import StatusBadge from "./StatusBadge";
import { useSocketStore } from "@/stores/useSocketStore";
import { Phone, Video, Info } from "lucide-react";

const ChatWindowHeader = ({
  selectedConv,
}: {
  selectedConv?: Conversation;
}) => {
  const { activeConversationId, conversations } = useChatStore();
  const { user } = useAuthStore();
  const { onlineUsers } = useSocketStore();

  const selectedConversation =
    selectedConv ?? conversations.find((c) => c._id === activeConversationId);

  let otherUser;
  if (selectedConversation?.type === "direct") {
    otherUser = selectedConversation?.participants.find(
      (p) => p._id !== user?._id,
    );
  }

  const isOnline = otherUser ? onlineUsers.includes(otherUser._id) : false;

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 sticky top-0 z-10 border-b border-border"
      style={{
        background: "var(--background)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        minHeight: "60px",
      }}
    >
      {/* Sidebar trigger */}
      <SidebarTrigger className="-ml-1 cursor-pointer w-8 h-8 rounded-xl hover:bg-accent transition-colors flex-shrink-0" />

      {/* Divider */}
      <div className="w-px h-5 bg-border flex-shrink-0" />

      {/* Conversation info */}
      {!selectedConversation ? (
        <div className="flex-1" />
      ) : selectedConversation.type === "direct" ? (
        // Direct chat
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex-shrink-0">
            <AvatarImg
              avatarUrl={otherUser?.avatarUrl}
              name={otherUser?.displayName}
            />
            <StatusBadge status={isOnline ? "online" : "offline"} />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate text-foreground">
              {otherUser?.displayName}
            </p>
            <p
              className={`text-[11px] font-medium ${
                isOnline ? "text-green-500" : "text-muted-foreground"
              }`}
            >
              {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
            </p>
          </div>
        </div>
      ) : (
        // Group chat
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex -space-x-2 flex-shrink-0">
            {selectedConversation.participants.slice(0, 3).map((p) => (
              <AvatarImg
                key={p._id}
                avatarUrl={p.avatarUrl}
                name={p.displayName}
                size="sm"
              />
            ))}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate text-foreground">
              {selectedConversation.group.name}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {selectedConversation.participants.length} thành viên
            </p>
          </div>
        </div>
      )}

      {/* Action buttons (decorative for now) */}
      {selectedConversation && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
            <Phone
              size={16}
              className="text-muted-foreground hover:text-violet-500 transition-colors"
            />
          </button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
            <Video
              size={16}
              className="text-muted-foreground hover:text-violet-500 transition-colors"
            />
          </button>
          <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
            <Info
              size={16}
              className="text-muted-foreground hover:text-violet-500 transition-colors"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatWindowHeader;
