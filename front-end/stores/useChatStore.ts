import chatService from "@/services/chatService";
import type { ChatState } from "@/types/store";
import type { Conversation, Message } from "@/types/chat";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";
import { useSocketStore } from "./useSocketStore";

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      convLoading: false,
      messageLoading: false,
      loading: false,

      setActiveConversation: (id) => {
        set({ activeConversationId: id });
      },

      clearState: () => {
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          convLoading: false,
          messageLoading: false,
          loading: false,
        });
      },

      fetchConversation: async () => {
        try {
          set({ convLoading: true });
          const user = useAuthStore.getState().user;

          const { conversations } = await chatService.getConversation();

          // Looix o day
          const updatedConversation = conversations.map((c: Conversation) => {
            if (c.lastMessage === null) return c;

            return {
              ...c,
              lastMessage: {
                ...c.lastMessage,
                isOwn: c.lastMessage.senderId._id === user?._id,
              },
            };
          });

          set({ conversations: updatedConversation });
        } catch (error) {
        } finally {
          set({ convLoading: false });
        }
      },

      fetchMessages: async (conversationId) => {
        const { activeConversationId, messages } = get();
        const { user } = useAuthStore.getState();

        const convId = conversationId ?? activeConversationId;

        if (!convId) return;

        const current = messages?.[convId];

        // tức là chưa fetch tin nhắn lần nào hoặc còn tin nhắn kế tiếp
        const nextCursor =
          current?.nextCursor === undefined ? "" : current?.nextCursor;

        // đúng -> nếu nextCursor = null -> return
        // tức là không còn tin nhắn nào nữa - thì mới không fetch thêm dữ liệu
        if (nextCursor === null) return;

        try {
          set({ messageLoading: true });

          // goi api
          const { messages: fetched, cursor } = await chatService.getMessages(
            convId,
            nextCursor,
          );

          // để biết đâu là mình gửi tin nhắn - nếu là mình thì nằm bên phải
          const processed = fetched.map((m: Message) => ({
            ...m,
            isOwn: m.senderId === user?._id,
          }));

          // gộp tin nhắn cũ với tin nhắn mới
          set((state) => {
            const prev = state.messages[convId]?.items ?? [];

            const merged =
              prev.length > 0 ? [...processed, ...prev] : processed;

            return {
              messages: {
                ...state.messages,
                [convId]: {
                  items: merged,
                  hasMore: Boolean(cursor),
                  nextCursor: cursor ?? null,
                },
              },
            };
          });

          toast.success("Lấy messages thành công");
        } catch (error) {
          console.log("useChatStore_fetchMessages", error);
          toast.error("Lỗi fetch tin nhắn");
        } finally {
          set({ messageLoading: false });
        }
      },

      sendDirectMessage: async (formData) => {
        const { activeConversationId } = get();

        if (!activeConversationId) return;

        try {
          // Gọi api
          await chatService.sendDirectMessage(formData);

          // Update lại field seenBy
          set((state) => {
            return {
              conversations: state.conversations.map((c) =>
                c._id === activeConversationId ? { ...c, seenBy: [] } : c,
              ),
            };
          });
        } catch (error) {
          console.log("useChatStore_sendDirectMessage", error);
          toast.error("Lỗi khi gửi tin nhắn đi");
        }
      },

      sendGroupMessage: async (conversationId, content, imgUrl) => {
        try {
          await chatService.sendGroupMessage(content, conversationId, imgUrl);

          set((state) => {
            return {
              conversations: state.conversations.map((c) =>
                c._id === conversationId ? { ...c, seenBy: [] } : c,
              ),
            };
          });
        } catch (error) {
          console.log("useChatStore_sendGroupMessage", error);
          toast.error("Lỗi gửi tin nhắn nhóm");
        }
      },

      addMessage: async (message) => {
        const { activeConversationId, fetchMessages } = get();
        const { user } = useAuthStore.getState();
        const copyMessage = message;

        copyMessage.isOwn = message.senderId === user?._id;

        const convId = message.conversationId ?? activeConversationId;

        if (!convId) return;

        let prevMessages = get().messages[convId]?.items ?? [];

        if (prevMessages.length === 0) {
          await fetchMessages(convId);

          prevMessages = get().messages[convId]?.items ?? [];
        }

        set((state) => {
          // nếu tin nhắn đã có trong state rồi - thì return
          if (prevMessages.some((m) => m._id === message._id)) {
            return state;
          }

          return {
            messages: {
              ...state.messages,
              [convId]: {
                items: [...prevMessages, copyMessage], // cũ -> mới
                hasMore: state.messages[convId].hasMore,
                nextCursor: state.messages[convId].nextCursor ?? undefined,
              },
            },
          };
        });

        try {
        } catch (error) {
          console.log("useChatStore_addMessage", error);
        }
      },

      updateConversation: async (conversation) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c._id === conversation._id ? { ...c, ...conversation } : c,
          ),
        }));
      },

      markAsSeen: async () => {
        try {
          const { activeConversationId } = get();

          if (!activeConversationId) return;

          await chatService.markAsSeen(activeConversationId);
        } catch (error) {
          console.log("useChatStore_markAsSeen", error);
          toast.error("Lỗi đánh dấu tin nhắn đã đọc");
        }
      },

      createConversation: async (type, name, memberIds) => {
        try {
          set({ convLoading: true });
          const { conversation } = await chatService.createConversation(
            type,
            name,
            memberIds,
          );

          get().setActiveConversation(conversation._id);

          set((state) => {
            const prevConvs = get().conversations ?? [];

            const existingConv = state.conversations.some(
              (c) => c._id === conversation._id,
            );

            return {
              conversations: existingConv
                ? state.conversations
                : [conversation, ...prevConvs],
            };
          });

          useSocketStore
            .getState()
            .socket?.emit("join-conversation", conversation._id);
        } catch (error) {
          console.log("useChatStore_createConverastion", error);
        } finally {
          set({ convLoading: false });
        }
      },
      addConv: async (conversation) => {
        const existingConv = get().conversations.some(
          (c) => c._id === conversation._id,
        );

        if (existingConv) return;

        set((state) => ({
          conversations: [conversation, ...state.conversations],
          activeConversationId:
            useAuthStore.getState().user?._id === conversation.group?.createdBy
              ? conversation._id
              : state.activeConversationId,
        }));

        console.log(get().conversations);
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        conversations: state.conversations,
        activeConversationId: state.activeConversationId,
      }),
    },
  ),
);
