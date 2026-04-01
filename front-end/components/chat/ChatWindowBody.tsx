"use client";

import { useChatStore } from "@/stores/useChatStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import InfiniteScroll from "react-infinite-scroll-component";
import MessageItem from "./MessageItem";
import ChatWindowSekeleton from "./ChatWindowSekeleton";
import { Conversation } from "@/types/chat";

const ChatWindowBody = ({ selectedConv }: { selectedConv: Conversation }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const {
    activeConversationId,
    messages: allMessage,
    fetchMessages,
    messageLoading: loading,
  } = useChatStore();

  // =========================================
  // 2. LOCAL STATE (Biến nội bộ)
  // =========================================
  const [lastMessageStatus, setLastMessageStatus] = useState<
    "seen" | "delivered"
  >("delivered");
  const messages = allMessage[activeConversationId!]?.items ?? [];
  const reversedMessages = [...messages].reverse();
  const hasMore = allMessage[activeConversationId!]?.hasMore ?? false;
  const scrollKey = `chat-scroll-${activeConversationId}`;

  // =========================================
  // 3. REFS (Tham chiếu DOM hoặc biến mutable)
  // =========================================
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);

  // =========================================
  // 4. SIDE EFFECTS (API calls, Subscriptions)
  // =========================================

  // xử lý trạng thái seen và delivered
  useEffect(() => {
    const lastMessage = selectedConv?.lastMessage ?? null;
    if (!lastMessage) return;

    const seenBy = selectedConv?.seenBy ?? [];

    // Seenby mà tăng lên 1 - thì tức là userB đã xem
    setLastMessageStatus(seenBy.length > 0 ? "seen" : "delivered");
  }, [selectedConv]);

  // Giữ nguyên vị trí scroll khi f5
  useLayoutEffect(() => {
    if (!container.current) return;

    const value = sessionStorage.getItem(scrollKey);
    if (!value) return;
    const { scrollTop } = JSON.parse(value);

    container.current.scrollTop = scrollTop;
  }, [allMessage]);

  // tự động scroll down
  useLayoutEffect(() => {
    if (!messagesEndRef?.current) return;

    messagesEndRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeConversationId, allMessage]);

  // =========================================
  // 5. EVENT HANDLERS (Xử lý sự kiện)
  // =========================================

  // lấy thêm message cũ
  const fetchMoreMessages = async () => {
    if (!activeConversationId) return;

    try {
      await fetchMessages();
    } catch (error) {
      console.log("Lỗi fetch thêm tin nhắn", error);
    }
  };

  // Handle scroll poistion
  const handleScroll = () => {
    if (!container.current || !activeConversationId) return;

    const position = container.current.scrollTop;

    sessionStorage.setItem(scrollKey, JSON.stringify({ scrollTop: position }));
  };

  // =========================================
  // 6. RENDER (JSX)
  // =========================================
  // Nếu chưa có cuộc trò chuyện nào được chọn
  if (!selectedConv) {
    return <ChatWelcomeScreen />;
  }

  // Đang trong trạng thái loading message
  if (loading) {
    return <ChatWindowSekeleton />;
  }

  // Nếu không có tin nhắn nào trong cuộc trò chuyện
  if (selectedConv.lastMessage === null) {
    return (
      <p className="font-bold text-2xl h-full flex items-center justify-center bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
        Hãy bắt đầu cuộc trò chuyện nào
      </p>
    );
  }

  return (
    <div
      ref={container}
      onScroll={handleScroll}
      id="scrollableDiv"
      className="flex flex-col-reverse justify-start h-full gap-3 overflow-x-hidden overflow-y-auto "
    >
      <div ref={messagesEndRef}></div>
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMoreMessages}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: "3px",
          padding: "15px",
        }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
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
