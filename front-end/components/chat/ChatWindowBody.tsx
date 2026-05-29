"use client";

import { useChatStore } from "@/stores/useChatStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import ChatWindowSekeleton from "./ChatWindowSekeleton";
import { Conversation } from "@/types/chat";
import { MessageCircle } from "lucide-react";

const ChatWindowBody = ({ selectedConv }: { selectedConv: Conversation }) => {
  const {
    activeConversationId,
    messages: allMessage,
    fetchMessages,
    messageLoading: loading,
  } = useChatStore();

  const [lastMessageStatus, setLastMessageStatus] = useState<
    "seen" | "delivered"
  >("delivered");
  const messages = allMessage[activeConversationId!]?.items ?? [];
  const reversedMessages = [...messages].reverse();
  const hasMore = allMessage[activeConversationId!]?.hasMore ?? false;
  const scrollKey = `chat-scroll-${activeConversationId}`;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage = selectedConv?.lastMessage ?? null;
    if (!lastMessage) return;
    const seenBy = selectedConv?.seenBy ?? [];
    setLastMessageStatus(seenBy.length > 0 ? "seen" : "delivered");
  }, [selectedConv]);

  useLayoutEffect(() => {
    if (!container.current) return;
    const value = sessionStorage.getItem(scrollKey);
    if (!value) return;
    const { scrollTop } = JSON.parse(value);
    container.current.scrollTop = scrollTop;
  }, [allMessage]);

  useLayoutEffect(() => {
    if (!messagesEndRef?.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeConversationId, allMessage]);

  const fetchMoreMessages = async () => {
    if (!activeConversationId) return;
    try {
      await fetchMessages();
    } catch (error) {
      console.log("Lỗi fetch thêm tin nhắn", error);
    }
  };

  const handleScroll = () => {
    if (!container.current || !activeConversationId) return;
    const position = container.current.scrollTop;
    sessionStorage.setItem(scrollKey, JSON.stringify({ scrollTop: position }));
  };

  if (!selectedConv) return <ChatWelcomeScreen />;

  if (loading) return <ChatWindowSekeleton />;

  // Empty conversation
  if (selectedConv.lastMessage === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 chat-bg-pattern">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.1))",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          <MessageCircle size={28} className="text-violet-500" />
        </div>
        <p className="font-bold text-xl muji-gradient-text text-center">
          Hãy bắt đầu cuộc trò chuyện nào! 🎉
        </p>
        <p className="text-muted-foreground text-sm text-center">
          Gửi tin nhắn đầu tiên để phá băng nhé
        </p>
      </div>
    );
  }

  return (
    <div
      ref={container}
      onScroll={handleScroll}
      id="scrollableDiv"
      className="flex flex-col-reverse justify-start h-full gap-0 overflow-x-hidden overflow-y-auto chat-bg-pattern"
    >
      <div ref={messagesEndRef} />
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreMessages}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: "2px",
          padding: "16px 16px 8px 16px",
        }}
        inverse={true}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-3">
            <div className="w-6 h-6 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {reversedMessages.map((m, index) => (
          <MessageItem
            key={m._id}
            message={m}
            index={index}
            messages={reversedMessages}
            selectedConv={selectedConv}
            status={index === 0 ? lastMessageStatus : ""}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ChatWindowBody;
