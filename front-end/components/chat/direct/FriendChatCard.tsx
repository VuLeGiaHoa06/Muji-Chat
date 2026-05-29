"use client";

import AvatarImg from "@/components/avatar/AvatarImg";
import { cn, formatOnlineTime } from "@/lib/utils";
import { useChatStore } from "@/stores/useChatStore";
import { Conversation } from "@/types/chat";
import { User } from "@/types/user";
import StatusBadge from "../StatusBadge";
import UnreadCountBadge from "../UnreadCountBadge";
import { useSocketStore } from "@/stores/useSocketStore";

const FriendChatCard = ({ conv, user }: { conv: Conversation; user: User }) => {
  const {
    activeConversationId,
    setActiveConversation,
    messages,
    fetchMessages,
    markAsSeen,
  } = useChatStore();
  const { onlineUsers } = useSocketStore();

  const friend = conv.participants.find((pId) => pId._id !== user._id);
  if (!friend) return null;

  const isActive = conv._id === activeConversationId;
  const isOnline = onlineUsers.includes(friend._id);

  const unreadCount =
    conv.unreadCounts[`${user._id}`] !== 0
      ? conv.unreadCounts[`${user._id}`]
      : undefined;

  const lastMessage =
    conv.lastMessage === null
      ? "Chưa có tin nhắn"
      : conv.lastMessage.isOwn === true
        ? `Bạn: ${conv.lastMessage.content || "📷 Ảnh"}`
        : conv.lastMessage.content || "📷 Ảnh";

  const timestamp =
    conv.lastMessage === null ? "" : new Date(conv.lastMessageAt);

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);
    if (!messages[id]) {
      await fetchMessages();
    }
    if (!unreadCount || conv.lastMessage === null) return;
    await markAsSeen();
  };

  return (
    <div
      id={`chat-card-${conv._id}`}
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
      onClick={() => handleSelectConversation(conv._id)}
    >
      {/* Active left accent bar */}
      {isActive && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
          style={{ background: "linear-gradient(180deg, #7c3aed, #ec4899)" }}
        />
      )}

      {/* Avatar + Status + Unread */}
      <div className="relative flex-shrink-0">
        {unreadCount && <UnreadCountBadge unreadCount={unreadCount} />}
        <AvatarImg avatarUrl={friend?.avatarUrl} name={friend.displayName} />
        <StatusBadge status={isOnline ? "online" : "offline"} />
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
            {friend?.displayName}
          </p>
          <p className="text-[11px] text-muted-foreground flex-shrink-0">
            {timestamp && formatOnlineTime(timestamp)}
          </p>
        </div>
        <p
          className={cn(
            "text-xs truncate",
            unreadCount
              ? "font-semibold text-foreground"
              : "text-muted-foreground",
          )}
        >
          {lastMessage}
        </p>
      </div>
    </div>
  );
};

export default FriendChatCard;
