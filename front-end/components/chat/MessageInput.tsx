"use client";

import { ImageIcon, SendHorizonal, X } from "lucide-react";
import { KeyboardEvent, useRef, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import { useChatStore } from "@/stores/useChatStore";
import { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const MessageInput = ({ selectedConv }: { selectedConv: Conversation }) => {
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const { user } = useAuthStore();

  if (!user) return null;

  const [value, setValue] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const uploadImageRef = useRef<HTMLInputElement>(null);

  const hasContent = value.trim().length > 0 || selectedImages.length > 0;

  const handleSendMessage = async () => {
    if (!hasContent) return;
    try {
      const formData = new FormData();
      selectedImages.forEach((f) => formData.append("images", f));

      if (selectedConv.type === "direct") {
        const participant = selectedConv.participants.find(
          (p) => p._id !== user._id,
        );
        if (!participant) return;
        formData.append("recipientId", participant._id);
        formData.append("content", value);
        formData.append("conversationId", selectedConv._id);
        await sendDirectMessage(formData);
        setSelectedImages([]);
        setPreviewImages([]);
      } else {
        await sendGroupMessage(selectedConv._id, value);
      }

      inputRef.current?.focus();
    } catch (err) {
      console.log("MessageInput_handleSendMessage", err);
    } finally {
      setValue("");
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  const handleClick = () => uploadImageRef.current?.click();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (!imageFile) return;
    setSelectedImages((prev) => [...prev, imageFile]);
    setPreviewImages((prev) => [...prev, URL.createObjectURL(imageFile)]);
  };

  const handleDeleteImage = (id: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== id));
    setPreviewImages((prev) => prev.filter((_, i) => i !== id));
  };

  return (
    <div
      className="px-4 py-3 border-t border-border"
      style={{ background: "var(--message-input-bg)" }}
    >
      {/* Image preview strip */}
      {previewImages.length > 0 && (
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {previewImages.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt="preview"
                className="w-16 h-16 object-cover rounded-xl border border-border"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gray-900 border border-border text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-2xl transition-all duration-200",
          isFocused ? "ring-1 ring-violet-500/50" : "ring-1 ring-transparent",
        )}
        style={{ background: "var(--input)" }}
      >
        {/* Image upload */}
        <button
          type="button"
          onClick={handleClick}
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          style={{ color: "var(--muted-foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#7c3aed")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
          title="Gửi ảnh"
        >
          <ImageIcon size={18} />
        </button>

        <input
          type="file"
          ref={uploadImageRef}
          className="hidden"
          accept="image/*"
          onChange={handleUploadImage}
        />

        {/* Text input */}
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Nhắn tin..."
          className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground text-foreground min-w-0"
        />

        {/* Emoji picker */}
        <EmojiPicker onChange={(emoji) => setValue(`${value}${emoji}`)} />

        {/* Send button */}
        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!hasContent}
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200",
            hasContent
              ? "cursor-pointer hover:scale-110"
              : "cursor-not-allowed opacity-40",
          )}
          style={
            hasContent
              ? {
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  boxShadow: "0 4px 12px rgba(124,58,237,0.4)",
                  color: "white",
                }
              : {
                  background: "var(--muted)",
                  color: "var(--muted-foreground)",
                }
          }
          title="Gửi"
        >
          <SendHorizonal size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
