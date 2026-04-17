import api from "@/lib/axios";

const limitPage = 50;

const chatService = {
  getConversation: async () => {
    const res = await api.get("/conversations");
    return res.data;
  },

  getMessages: async (conversationId: string, nextCursor: string) => {
    const res = await api.get(
      `/conversations/${conversationId}/messages?limit=${limitPage}&cursor=${nextCursor}`,
    );
    return {
      messages: res.data.messages,
      cursor: res.data.nextCursor,
    };
  },

  sendDirectMessage: async (
    // recipientId: string,
    // content: string,
    formData: FormData,
    // conversationId?: string,
  ) => {
    const res = await api.post("/messages/direct", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },

  sendGroupMessage: async (
    content: string,
    conversationId?: string,
    imgUrl?: string,
  ) => {
    const res = await api.post("/messages/group", {
      conversationId,
      content,
      imgUrl,
    });
    return res.data;
  },

  markAsSeen: async (conversationId: string) => {
    const res = await api.patch(`/conversations/${conversationId}/seen`);
    return res.data;
  },

  createConversation: async (
    type: "direct" | "group",
    name: string,
    memberIds: string[],
  ) => {
    const res = await api.post("/conversations", { type, name, memberIds });

    return res.data;
  },
};

export default chatService;
