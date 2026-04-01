import { Conversation } from "@/types/chat";
import AvatarImg from "@/components/avatar/AvatarImg";
import { useChatStore } from "@/stores/useChatStore";
import { cn, formatOnlineTime } from "@/lib/utils";
import { Ellipsis } from "lucide-react";

const GroupChatCard = ({ conv }: { conv: Conversation }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const {
    activeConversationId,
    setActiveConversation,
    fetchMessages,
    messages,
  } = useChatStore();

  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================
  const timestamp =
    conv.lastMessage === null ? "" : new Date(conv.lastMessage.createdAt);

  // =========================================
  // 3. EVENT HANDLERS (Xử lý sự kiện)
  // =========================================
  const handleClick = async (id: string) => {
    setActiveConversation(id);

    if (!messages?.[id]) await fetchMessages(id);
  };

  // =========================================
  // 4. RENDER (JSX)
  // =========================================
  return (
    <div
      className={cn(
        "border-2 border-gray-300 shadow-sm bg-white cursor-pointer rounded-xl p-3 flex gap-2 justify-between",
        activeConversationId === conv._id
          ? "border-2 border-purple-500 bg-purple-50"
          : "",
      )}
      onClick={() => handleClick(conv._id)}
    >
      <div className="flex gap-3 items-center w-full">
        {/* Avatar */}
        <div className="flex -space-x-2">
          {conv.participants.map((p) => (
            <div key={p._id}>
              <AvatarImg avatarUrl={p?.avatarUrl} name={p.displayName} />
            </div>
          ))}
        </div>

        <div className="w-full">
          <div className="flex items-center justify-between">
            <p className="font-bold">{conv.group.name}</p>
            <p className="text-gray-400">
              {timestamp && formatOnlineTime(timestamp)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              {conv.participants.length} thành viên
            </p>
            <div className="hover:bg-gray-100 rounded-full p-2 -mr-2">
              <Ellipsis size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatCard;
