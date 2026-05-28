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

  // =========================================
  // 3. LOCAL STATE (Biến nội bộ)
  // =========================================
  const friendChats = conversations.filter((conv) => conv.type === "direct");

  if (friendChats.length === 0) {
    return (
      <p className="text-gray-400 font-semibold ml-2">Chưa có bạn bè nào!</p>
    );
  }

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
