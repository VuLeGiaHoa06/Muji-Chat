import { Conversation, Message } from "@/types/chat";
import { cn, formatMessageTime } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { AvatarImage } from "../ui/avatar";
import AvatarImg from "../avatar/AvatarImg";
import { stat } from "fs";

interface IMessageItemProps {
  selectedConv: Conversation;
  messages: Message[];
  message: Message;
  index: number;
  status: "" | "seen" | "delivered";
}

// Hiển thị tin nhắn
// 1. nếu tin nhắn có cùng người gửi và thời gian không cách quá lâu
// => hiển thị 1 lần (avatar, name)

// 2. isShowTime = true - khi nào
// - tin nhắn đầu tiên được tạo trong conversation
// - thời gian tin nhắn vừa được tạo cách thời gian với tin nhắn cũ > 5'

// 3. isGroupBreak = false - không hiển thị lại (avatar, name)
// - isShowTime = true - tin nhắn gần nhau
// - cùng người gửi (prev.id === message.senderId)

// 4. Lấy thông tin của người kia để hiển thị thông tin
const MessageItem = ({
  selectedConv,
  message,
  messages,
  index,
  status,
}: IMessageItemProps) => {
  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================
  // Mục đích: lấy tin nhắn trước đó để so sánh thời gian
  // nếu lớn hơn 5' thì chia nhỏ nó ra
  // và thêm thời gian vào => isShowtime = true
  const prev = index + 1 < messages.length ? messages[index + 1] : undefined;

  // Khi nào time được lấy
  // TH1: khi thời gian vừa được tạo khoảng thời gian cách xa với thời gian trước đó lớn hơn 5'
  const isShowTime =
    new Date(message.createdAt).getTime() -
      new Date(prev?.createdAt || 0).getTime() >
    300000; // 5 phút

  // Khi nào thì phân chia group
  // TH1: khi thời gian tin nhắn lớn hơn 5'
  // TH2: cùng người gửi
  const isGroupBreak = isShowTime || message.senderId !== prev?.senderId;

  // Lấy thông tin của user còn lại
  const otherUser = selectedConv.participants.find(
    (p) => p._id === message.senderId,
  );

  // =========================================
  // 2. RENDER (JSX)
  // =========================================
  return (
    <>
      {/* seen / delivered */}
      {message.isOwn && message._id === selectedConv.lastMessage!._id && (
        <p className="flex justify-end text-gray-400 text-sm mr-2">{status}</p>
      )}

      {/* Content */}
      <div
        className={cn(
          "flex items-center gap-2",
          message.isOwn ? "justify-end" : "justify-start",
        )}
      >
        {!message.isOwn && (
          <div className="w-8">
            {isGroupBreak && (
              <AvatarImg
                avatarUrl={otherUser?.avatarUrl}
                name={otherUser?.displayName}
              />
            )}
          </div>
        )}
        <p
          className={cn(
            "rounded-full shadow-md px-4 py-2 ml-2",
            message.isOwn ? "bg-purple-500 text-white" : "bg-white",
          )}
        >
          {message.content}
        </p>
      </div>

      {/* Time */}
      <p className="mx-auto text-gray-400 text-xs">
        {isShowTime
          ? formatMessageTime(new Date(message.createdAt))
          : undefined}
      </p>
    </>
  );
};

export default MessageItem;
