import { Image, SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { KeyboardEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import EmojiPicker from "./EmojiPicker";
import { useChatStore } from "@/stores/useChatStore";
import { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const MessageInput = ({ selectedConv }: { selectedConv: Conversation }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const { user } = useAuthStore();

  // =========================================
  // 2. GUARD CLAUSE (Mệnh đề bảo vệ)
  // =========================================
  if (!user) return;

  // =========================================
  // 3. LOCAL STATE (Biến nội bộ)
  // =========================================
  const [value, setValue] = useState("");

  // =========================================
  // 3. REFS (Tham chiếu DOM hoặc biến mutable)
  // =========================================
  const inputRef = useRef<HTMLInputElement>(null);

  // =========================================
  // 4. EVENT HANDLERS (Xử lý sự kiện)
  // =========================================
  const handlSendMessage = async () => {
    try {
      if (selectedConv.type === "direct") {
        const participant = selectedConv.participants.find(
          (p) => p._id !== user._id,
        );

        await sendDirectMessage(participant?._id ?? "", value);
      } else {
        await sendGroupMessage(selectedConv._id, value);
      }

      if (!inputRef.current) return;
      inputRef.current.focus();
    } catch (err) {
      console.log("MessageInput_handleSenMessage", err);
    } finally {
      setValue("");
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handlSendMessage();
    }
  };

  return (
    <form className="flex items-center min-h-[58px] bg-gray-100 px-4 py-2 sticky bottom-0 w-full">
      {/* Upload Image */}
      <div className="cursor-pointer mr-3 group relative">
        <Image size={18} />

        <p className="absolute text-nowrap cursor-default -top-10 max-[100px] -left-1/2 text-sm group-hover:block hidden bg-gray-200 rounded-lg p-2">
          Upload Image
        </p>
      </div>

      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />

      <div className="flex flex-1 items-center -mr-8">
        {/* Input */}
        <Input
          onKeyDown={handleKeyPress}
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-gray-200 rounded-xl mx-3 "
          placeholder="Soạn tin nhắn..."
        />

        {/* Emoji */}
        <EmojiPicker onChange={(emoji) => setValue(`${value}${emoji}`)} />
      </div>

      {/* Send button */}
      <Button
        disabled={value === ""}
        type="button"
        className="cursor-pointer"
        onClick={() => value !== "" && handlSendMessage()}
      >
        <SendHorizontal size={18} />
      </Button>
    </form>
  );
};

export default MessageInput;
