interface Participant {
  _id: string;
  displayName: string;
  avatarUrl: string;
  joinedAt: string;
}

interface Group {
  name: string;
  createdBy: string;
}

interface LastMessage {
  isOwn: boolean;
  _id: string;
  content: string;
  senderId: {
    _id: string;
    displayname: string;
    avatarUrl: string;
  };
  createdAt: string;
}

export interface Conversation {
  _id: string;
  type: "direct" | "group";
  participants: Participant[];
  group: Group;
  lastMessageAt: string;
  seenBy: [];
  lastMessage: LastMessage | null;
  unreadCounts: Record<string, number>;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  images: string[];
  isOwn: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Groups {
  type: string;
  participants: {
    userId: string;
    joinedAt: string;
  }[];
  group: {
    name: string;
    createdBy: string;
  };
  lastMessageAt: string;
  seenBy: { id: string }[];
  lastMessage: {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  };
}
