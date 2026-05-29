import { useChatStore } from "@/stores/useChatStore";
import FriendChatCard from "./FriendChatCard";
import { useAuthStore } from "@/stores/useAuthStore";

const FriendChatList = () => {
  const { user } = useAuthStore();
  const { conversations } = useChatStore();

  if (!user) return null;

  const friendChats = conversations.filter((conv) => conv.type === "direct");

  if (friendChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center select-none animate-fade-in">
        <div className="w-14 h-14 mb-2.5 rounded-2xl bg-linear-to-br from-violet-500/10 to-pink-500/10 flex items-center justify-center relative">
          <svg
            className="w-7 h-7 text-pink-500/80 dark:text-pink-400/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a.75.75 0 01-1.074-.85l.384-1.975C3.401 16.75 3 14.466 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
            />
          </svg>
          {/* Blur glow behind */}
          <div className="absolute inset-0 -z-10 bg-pink-500/10 blur-xl rounded-full opacity-60" />
        </div>
        <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider">
          Chưa có bạn bè nào
        </span>
        <p className="text-[9px] text-zinc-400/80 dark:text-zinc-500/80 mt-0.5 max-w-40">
          Hãy kết bạn và gửi tin nhắn để bắt đầu cuộc trò chuyện!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {friendChats.map((conv) => (
        <FriendChatCard key={conv._id} conv={conv} user={user} />
      ))}
    </div>
  );
};

export default FriendChatList;
