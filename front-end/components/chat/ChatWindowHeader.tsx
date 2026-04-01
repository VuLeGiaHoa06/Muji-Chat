import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import AvatarImg from "../avatar/AvatarImg";
import { useChatStore } from "@/stores/useChatStore";
import StatusBadge from "./StatusBadge";
import { useSocketStore } from "@/stores/useSocketStore";

// nhận thông tin conversation
// để hiển thị header
// bao gồm: sidebarTrigger, avatar, displayname
const ChatWindowHeader = ({
  selectedConv,
}: {
  selectedConv?: Conversation;
}) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { activeConversationId, conversations } = useChatStore();
  const { user } = useAuthStore();
  const { onlineUsers } = useSocketStore();

  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================

  // Nếu conv chưa được select từ sidebar
  // Thì header kiểm tra trong store - có conversation nào đang được active không
  const selectedConversation =
    selectedConv ?? conversations.find((c) => c._id === activeConversationId);

  let otherUser;
  // Lấy thông tin của người còn lại - nếu là direct
  if (selectedConversation?.type === "direct") {
    otherUser = selectedConversation?.participants.find(
      (p) => p._id !== user?._id,
    );
  }

  // =========================================
  // 6. RENDER (JSX)
  // =========================================

  if (!selectedConversation) {
    // nếu không có conversation nào được chọn
    // thì return
    return (
      <div className="min-h-[60px] px-4 py-2 w-full bg-gray-100 flex items-center gap-3 sticky top-0">
        <SidebarTrigger className="-ml-1 cursor-pointer" />
      </div>
    );
  }

  return (
    <div className="min-h-[60px] px-4 py-2 w-full bg-gray-100 flex items-center gap-3 sticky top-0">
      <SidebarTrigger className="-ml-1 cursor-pointer" />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />

      {selectedConversation?.type === "direct" ? (
        // chat trực tiếp
        <div className="flex gap-2 items-center">
          <div className="relative">
            <AvatarImg
              avatarUrl={otherUser?.avatarUrl}
              name={otherUser?.displayName}
            />
            <StatusBadge
              status={
                onlineUsers.includes(otherUser?._id ?? "")
                  ? "online"
                  : "offline"
              }
            />
          </div>
          <p className="font-bold text-lg">{otherUser?.displayName}</p>
        </div>
      ) : (
        // chat nhóm
        <div className="flex gap-2 items-center">
          <div className="flex -space-x-2">
            {selectedConversation?.participants.map((p) => (
              <AvatarImg
                key={p._id}
                avatarUrl={p.avatarUrl}
                name={p.displayName}
              />
            ))}
          </div>
          <p className="font-bold text-lg">
            {selectedConversation?.group.name}
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatWindowHeader;
