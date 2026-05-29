"use client";

import { Conversation } from "@/types/chat";
import AvatarImg from "@/components/avatar/AvatarImg";
import { useChatStore } from "@/stores/useChatStore";
import { cn, formatOnlineTime } from "@/lib/utils";
import { Users } from "lucide-react";

const GroupChatCard = ({ conv }: { conv: Conversation }) => {
  const {
    activeConversationId,
    setActiveConversation,
    fetchMessages,
    messages,
  } = useChatStore();

  const isActive = activeConversationId === conv._id;
  const timestamp =
    conv.lastMessage === null ? "" : new Date(conv.lastMessage.createdAt);

  const lastMsg = conv.lastMessage
    ? conv.lastMessage.content || "📷 Ảnh"
    : "Chưa có tin nhắn";

  const handleClick = async (id: string) => {
    setActiveConversation(id);
    if (!messages?.[id]) await fetchMessages(id);
  };

  return (
    <div
      id={`group-card-${conv._id}`}
      className={cn(
        "group relative flex gap-3 items-center px-3 py-2.5 rounded-2xl cursor-pointer transition-all duration-200",
        isActive ? "shadow-sm" : "hover:bg-accent",
      )}
      style={
        isActive
          ? {
              background:
                "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))",
              border: "1px solid rgba(124,58,237,0.2)",
            }
          : { border: "1px solid transparent" }
      }
      onClick={() => handleClick(conv._id)}
    >
      {/* Active left accent */}
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
          style={{ background: "linear-gradient(180deg, #7c3aed, #ec4899)" }}
        />
      )}

      {/* Stacked Avatars */}
      <div className="relative flex-shrink-0 w-10 h-10">
        {conv.participants.slice(0, 2).map((p, i) => (
          <div
            key={`${p._id || p?.displayName || "part"}-${i}`}
            className="absolute"
            style={{
              width: 28,
              height: 28,
              top: i === 0 ? 0 : "auto",
              bottom: i === 1 ? 0 : "auto",
              left: i === 0 ? 0 : "auto",
              right: i === 1 ? 0 : "auto",
              zIndex: i === 0 ? 1 : 2,
            }}
          >
            <AvatarImg
              avatarUrl={p?.avatarUrl}
              name={p.displayName}
              size="sm"
            />
          </div>
        ))}
        {/* Group icon for 0-participant edge case */}
        {conv.participants.length === 0 && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
          >
            <Users size={18} className="text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <p
            className={cn(
              "font-semibold text-sm truncate",
              isActive ? "muji-gradient-text" : "text-foreground",
            )}
          >
            {conv.group.name}
          </p>
          <p className="text-[11px] text-muted-foreground flex-shrink-0">
            {timestamp && formatOnlineTime(timestamp)}
          </p>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {conv.participants.length} thành viên · {lastMsg}
        </p>
      </div>
    </div>
  );
};

export default GroupChatCard;
