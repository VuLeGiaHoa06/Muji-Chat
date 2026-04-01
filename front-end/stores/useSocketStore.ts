import { SocketState } from "@/types/store";
import { io, type Socket } from "socket.io-client";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

const baseUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: () => {
    const existingSocket = get().socket;
    const { accessToken } = useAuthStore.getState();

    if (existingSocket) return; // Tránh tạo nhiều scoket

    const socket: Socket = io(baseUrl, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });

    console.log("Đã kết nối với socket");

    set({ socket });

    ///////// Listen socket /////////
    socket.on("online-users", (userIds) => {
      set({ onlineUsers: userIds });
    });

    socket.on("new-message", ({ message, conversation, unreadCounts }) => {
      useChatStore.getState().addMessage(message);

      const updatedLastMessage = {
        _id: message._id,
        content: message.content,
        isOwn:
          message.senderId.toString() === useAuthStore.getState().user?._id,
        senderId: {
          _id: message.senderId,
          displayName: "",
          avatarUrl: null,
        },
      };

      const updatedConversation = {
        ...conversation,
        lastMessage: updatedLastMessage,
        unreadCounts,
      };

      if (
        useChatStore.getState().activeConversationId ===
          message.conversationId &&
        conversation.lastMessage.senderId !== useAuthStore.getState().user?._id
      ) {
        useChatStore.getState().markAsSeen();
      }

      useChatStore.getState().updateConversation(updatedConversation);
    });

    socket.on(
      "read-message",
      ({ conversation, formatedParticipant, lastMessage }) => {
        const updatedConversaion = {
          ...conversation,
          participants: formatedParticipant,
          lastMessage,
        };

        useChatStore.getState().updateConversation(updatedConversaion);
      },
    );

    socket.on("new-conversation", (conversation) => {
      useChatStore.getState().addConv(conversation);
      socket.emit("join-conversation", conversation._id);
    });
  },
  disconnectSocket: () => {
    const { socket } = get();

    if (socket) {
      socket.disconnect();
      console.log("socket disconnected");
      set({ socket: null });
    }
  },
}));
