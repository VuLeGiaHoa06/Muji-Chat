import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // browser cho phep req dinh kem cookie cho server
});

// gan accessToken vao request header
api.interceptors.request.use(
  (req) => {
    // lay token tu store
    const { accessToken } = useAuthStore.getState();

    // neu ton tai thi luu vao config
    if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    return req;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// goi ham refresh token - neu het han accessToken
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequeset = err.config;

    if (
      originalRequeset.url.includes("/auth/sign-in") ||
      originalRequeset.url.includes("/auth/sign-up") ||
      originalRequeset.url.includes("/auth/refresh-token")
    ) {
      return Promise.reject(err);
    }

    originalRequeset._retryCount = originalRequeset._retryCount ?? 0;

    if (originalRequeset.status === 403 || originalRequeset._retryCount > 4) {
      originalRequeset._rertyCount += 1; // cong len 1

      try {
        await useAuthStore.getState().refresh();
      } catch (error) {
        Promise.reject(error);
      }
    }
  },
);

export default api;
