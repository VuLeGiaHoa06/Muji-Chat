import { Conversation, Message } from "./chat";
import { Friend, FriendRequest, User } from "./user";
import type { Socket } from "socket.io-client";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  clearState: () => void;

  signUp: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;

  signIn: (username: string, password: string) => Promise<void>;

  signOut: () => Promise<void>;

  setUser: (user: User) => void;

  getCurrentUser: () => Promise<void>;

  refresh: () => Promise<void>;
}

export interface ChatState {
  conversations: Conversation[];
  messages: Record<
    string, // id của conversation
    {
      items: Message[];
      hasMore: boolean; // infinite-scroll để xem còn tin nhắn cũ không
      nextCursor?: string | null; // phân trang
    }
  >;
  activeConversationId: string | null;
  convLoading: boolean;
  messageLoading: boolean;
  loading: boolean;

  setActiveConversation: (id: string | null) => void;
  clearState: () => void;
  fetchConversation: () => Promise<void>;
  fetchMessages: (convId?: string) => Promise<void>;
  sendDirectMessage: (
    recipientId: string,
    content: string,
    imgUrl?: string,
    conversationId?: string,
  ) => Promise<void>;
  sendGroupMessage: (
    conversationId: string,
    content: string,
    imgUrl?: string,
  ) => Promise<void>;
  addMessage: (message: Message) => Promise<void>;
  updateConversation: (conversation: Conversation) => Promise<void>;
  markAsSeen: () => Promise<void>;
  createConversation: (
    type: "direct" | "group",
    name: string,
    memberIds: string[],
  ) => Promise<void>;
  addConv: (conversation: Conversation) => Promise<void>;
}

export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface FriendState {
  loading: boolean;
  friends: Friend[];
  receivedList: FriendRequest[];
  sentList: FriendRequest[];

  searchByUsername: (username: string) => Promise<User>;
  addFriend: (to: string, message?: string) => Promise<void>;
  getAllFriendRequest: () => Promise<void>;
  acceptRequest: (idRequest: string) => Promise<void>;
  declineRequest: (idRequest: string) => Promise<void>;
  getAllFriend: () => Promise<void>;
}

export interface UserState {
  uploadAvatar: (formData: FormData) => Promise<void>;
}
