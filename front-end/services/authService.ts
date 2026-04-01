import api from "@/lib/axios";

export const authService = {
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => {
    const res = await api.post("/auth/sign-up", {
      username,
      password,
      email,
      firstName,
      lastName,
    });

    return res.data;
  },

  signIn: async (username: string, password: string) => {
    const res = await api.post("/auth/sign-in", { username, password });

    return res.data.accessToken;
  },

  signOut: async () => {
    return await api.post("/auth/sign-out");
  },

  getCurrentUser: async () => {
    const res = await api.get("/users/me");

    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh-token");

    return res.data.accessToken;
  },
};
