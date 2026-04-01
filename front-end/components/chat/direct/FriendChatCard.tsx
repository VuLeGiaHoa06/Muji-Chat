import AvatarImg from "@/components/avatar/AvatarImg";
import { cn, formatOnlineTime } from "@/lib/utils";
import { useChatStore } from "@/stores/useChatStore";
import { Conversation } from "@/types/chat";
import { User } from "@/types/user";
import { Ellipsis } from "lucide-react";
import StatusBadge from "../StatusBadge";
import UnreadCountBadge from "../UnreadCountBadge";
import { useSocketStore } from "@/stores/useSocketStore";

const FriendChatCard = ({ conv, user }: { conv: Conversation; user: User }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const {
    activeConversationId,
    setActiveConversation,
    messages,
    fetchMessages,
    markAsSeen,
  } = useChatStore();
  const { onlineUsers } = useSocketStore();

  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================
  const friend = conv.participants.find((pId) => pId._id !== user._id);

  if (!friend) return null;

  const unreadCount =
    conv.unreadCounts[`${user._id}`] !== 0
      ? conv.unreadCounts[`${user._id}`]
      : undefined;

  // const lastMessage = conv.lastMessage
  //   ? conv.lastMessage.content
  //   : "Unavailable";
  const lastMessage =
    conv.lastMessage === null
      ? "Unavailable"
      : conv.lastMessage.isOwn === true
        ? `You: ${conv.lastMessage.content}`
        : conv.lastMessage.content;

  const timestamp =
    conv.lastMessage === null ? "" : new Date(conv.lastMessageAt);

  // =========================================
  // 3. EVENT HANDLERS (Xử lý sự kiện)
  // =========================================
  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id);

    if (!messages[id]) {
      // to-do fetch message
      await fetchMessages();
    }

    if (!unreadCount || conv.lastMessage === null) {
      return;
    } else {
      await markAsSeen();
    }
  };

  // =========================================
  // 4. RENDER (JSX)
  // =========================================
  return (
    <div
      className={cn(
        "border-2 border-gray-300 bg-white shadow-sm cursor-pointer rounded-xl p-3 flex gap-2 justify-between",
        conv._id === activeConversationId
          ? "border-2 border-purple-500 bg-purple-50"
          : "",
      )}
      onClick={() => handleSelectConversation(conv._id)}
    >
      <div className="flex justify-between w-full gap-3 items-center">
        {/* Avatar & status & readCount */}
        <div className="relative">
          {unreadCount && <UnreadCountBadge unreadCount={unreadCount} />}

          <AvatarImg avatarUrl={friend?.avatarUrl} name={friend.displayName} />

          <StatusBadge
            status={onlineUsers.includes(friend._id) ? "online" : "offline"}
          />
        </div>

        {/* Time & Message */}
        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="font-bold">{friend?.displayName}</p>
            <p className="text-gray-400">
              {timestamp && formatOnlineTime(timestamp)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">{lastMessage}</p>
            <div className="hover:bg-gray-100 rounded-full p-2 -mr-2">
              <Ellipsis size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendChatCard;
