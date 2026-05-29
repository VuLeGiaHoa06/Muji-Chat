"use client";

import { Conversation, Message } from "@/types/chat";
import { cn, formatMessageTime } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import AvatarImg from "../avatar/AvatarImg";
import { CheckCheck, Check } from "lucide-react";

interface IMessageItemProps {
  selectedConv: Conversation;
  messages: Message[];
  message: Message;
  index: number;
  status: "" | "seen" | "delivered";
}

const MessageItem = ({
  selectedConv,
  message,
  messages,
  index,
  status,
}: IMessageItemProps) => {
  const prev = index + 1 < messages.length ? messages[index + 1] : undefined;

  // Show time if gap > 5 minutes
  const isShowTime =
    new Date(message.createdAt).getTime() -
      new Date(prev?.createdAt || 0).getTime() >
    300000;

  // Group break: different sender or time gap
  const isGroupBreak = isShowTime || message.senderId !== prev?.senderId;

  // The other participant for this message
  const otherUser = selectedConv.participants.find(
    (p) => p._id === message.senderId,
  );

  const isOwn = message.isOwn;

  return (
    <div className="flex flex-col">
      {/* Timestamp separator */}
      {isShowTime && (
        <div className="flex items-center justify-center my-4">
          <span className="text-[11px] text-muted-foreground bg-muted/60 px-3 py-1 rounded-full backdrop-blur-sm">
            {formatMessageTime(new Date(message.createdAt))}
          </span>
        </div>
      )}

      {/* Message row */}
      <div
        className={cn(
          "flex items-end gap-2 mb-0.5",
          isOwn ? "justify-end" : "justify-start",
          isGroupBreak ? "mt-3" : "mt-0.5",
        )}
      >
        {/* Other user avatar (left side) */}
        {!isOwn && (
          <div className="w-8 flex-shrink-0 self-end">
            {isGroupBreak ? (
              <AvatarImg
                avatarUrl={otherUser?.avatarUrl}
                name={otherUser?.displayName}
                size="sm"
              />
            ) : (
              <div className="w-7 h-7" /> /* Placeholder to maintain alignment */
            )}
          </div>
        )}

        {/* Bubble column */}
        <div
          className={cn(
            "flex flex-col gap-1 max-w-[70%]",
            isOwn ? "items-end" : "items-start",
          )}
        >
          {/* Sender name in group chat */}
          {!isOwn && isGroupBreak && selectedConv.type === "group" && (
            <p className="text-[11px] font-semibold text-muted-foreground ml-1 mb-0.5">
              {otherUser?.displayName}
            </p>
          )}

          {/* Text content */}
          {message.content && (
            <div
              className={cn(
                "px-4 py-2.5 text-sm leading-relaxed break-words",
                isOwn
                  ? "rounded-2xl rounded-br-md text-white animate-message-right"
                  : "rounded-2xl rounded-bl-md animate-message-left",
              )}
              style={
                isOwn
                  ? {
                      background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                      boxShadow: "0 2px 12px rgba(124,58,237,0.3)",
                    }
                  : {
                      background: "var(--chat-bubble-other)",
                      color: "var(--chat-bubble-other-fg)",
                      border: "1px solid var(--border)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    }
              }
            >
              {message.content}
            </div>
          )}

          {/* Images */}
          {message.images.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {message.images.map((imgUrl) => (
                <div
                  key={imgUrl}
                  className={cn(
                    "overflow-hidden rounded-2xl",
                    isOwn ? "rounded-br-md" : "rounded-bl-md",
                    isOwn ? "animate-message-right" : "animate-message-left",
                  )}
                  style={{ maxWidth: "200px" }}
                >
                  <img
                    src={imgUrl}
                    alt="Sent image"
                    className="w-full h-auto object-cover"
                    style={{ maxHeight: "240px" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Own avatar placeholder (for alignment on right) */}
        {isOwn && <div className="w-2 flex-shrink-0" />}
      </div>

      {/* Seen / delivered status (only for the last own message) */}
      {isOwn && message._id === selectedConv.lastMessage?._id && status && (
        <div className="flex justify-end items-center gap-1 pr-3 mt-0.5 mb-1">
          {status === "seen" ? (
            <>
              <CheckCheck size={14} className="text-violet-400" />
              <span className="text-[11px] text-violet-400 font-medium">
                Đã xem
              </span>
            </>
          ) : (
            <>
              <Check size={14} className="text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Đã gửi</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageItem;
