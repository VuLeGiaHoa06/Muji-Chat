import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { AuthState } from "@/types/store";
import { useChatStore } from "./useChatStore";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false, // theo dõi trạng thái khi gọi api

      clearState: () => {
        set({ user: null, accessToken: null, loading: false });
        useChatStore.getState().clearState();
        localStorage.clear();
        sessionStorage.clear();
      },

      signUp: async (username, password, email, firstName, lastName) => {
        try {
          set({ loading: true });

          // goi api
          await authService.signUp(
            username,
            password,
            email,
            firstName,
            lastName,
          );

          toast.success("sign up thanh cong");
        } catch (error) {
          console.log("useAuthStore_sigg-up_POST", error);
          toast.error("sign up khong thanh cong. hay thu lai");
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (username, password) => {
        try {
          // update trang thai
          set({ loading: true });

          localStorage.clear();

          // goi api
          const token = await authService.signIn(username, password);
          set({ accessToken: token });

          // goi get user
          await get().getCurrentUser();

          // lấy các cuộc trò chuyện
          useChatStore.getState().fetchConversation();

          // thong bao thanh cong
          toast.success("Dang nhap thanh cong");
        } catch (error) {
          console.log("useAuthStore_signIn", error);
          toast.error("Loi dang nhap, hay thu lai");
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          set({ loading: true });

          // goi api
          await authService.signOut();

          // clear state
          get().clearState();

          // thong bao
          toast.success("Sign out thanh cong");
        } catch (error) {
          console.log("useAuthStore_signOut", error);
          toast.error("Loi sign out");
        } finally {
          // set({ loading: false });
        }
      },

      setUser: (user) => {
        set({ user });
      },

      getCurrentUser: async () => {
        try {
          // set trang thai
          set({ loading: true });

          // goi api
          const user = await authService.getCurrentUser();

          // update user
          set({ user });

          // thong bao ui
          toast.success("Lay thong tin user thanh cong");
        } catch (error) {
          console.log("useAuthStore_getCurrentUser", error);
          toast.error("Lay thong tin user that bai");
        } finally {
          set({ loading: false });
        }
      },

      refresh: async () => {
        try {
          set({ loading: true });

          const { user, getCurrentUser } = get();

          // goi api
          const token = await authService.refresh();
          set({ accessToken: token });

          // goi lai de lay data user - neu token het han
          if (!user) {
            getCurrentUser();
          }

          toast.success("refresh token thanh cong");
        } catch (error) {
          console.log("useAuthStore_refresh", error);
          toast.error("Phien dang nhap da het han, vui long dang nhap lai");
          get().clearState();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-store", // tên trong localStorage
      partialize: (state) => ({ user: state.user }), // chỉ lưu user
    },
  ),
);
