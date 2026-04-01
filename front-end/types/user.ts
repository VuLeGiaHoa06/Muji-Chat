export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  bio?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Friend {
  _id: string;
  displayName: string;
  avatarUrl: string | null;
  username: string;
}

export interface FriendRequest {
  _id: string;
  from: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  to: {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}
