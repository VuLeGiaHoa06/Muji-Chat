import api from "@/lib/axios";

export const friendService = {
  searchByUsername: async (username: string) => {
    const res = await api.get(`users/search?username=${username}`);

    return res.data.user;
  },

  sendFriendRequest: async (to: string, message?: string) => {
    const res = await api.post("/friends/requests", { to, message });
    return res.data;
  },

  getAllFriendRequest: async () => {
    const res = await api.get("/friends/requests");

    const { received, sent } = res.data;
    return { received, sent };
  },

  accepFriendRequest: async (idRequest: string) => {
    const res = await api.post(`/friends/requests/${idRequest}/accept`);
    return res.data;
  },

  declineFriendRequest: async (idRequest: string) => {
    const res = await api.post(`/friends/requests/${idRequest}/decline`);
    return res.data;
  },

  getAllFriends: async () => {
    const res = await api.get("/friends");
    return res.data;
  },
};
