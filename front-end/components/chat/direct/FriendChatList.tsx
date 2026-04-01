import { useChatStore } from "@/stores/useChatStore";
import FriendChatCard from "./FriendChatCard";
import { useAuthStore } from "@/stores/useAuthStore";

const FriendChatList = () => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { user } = useAuthStore();
  const { conversations } = useChatStore();

  // =========================================
  // 2. GUARD CLAUSE (Mệnh đề bảo vệ)
  // =========================================
  if (!user) return;
  if (conversations.length === 0) return;

  // =========================================
  // 3. LOCAL STATE (Biến nội bộ)
  // =========================================
  const friendChats = conversations.filter((conv) => conv.type === "direct");


  // =========================================
  // 4. RENDER (JSX)
  // =========================================
  return (
    <div className="space-y-2">
      {friendChats.map((conv) => (
        <FriendChatCard key={conv._id} conv={conv} user={user} />
      ))}
    </div>
  );
};

export default FriendChatList;
