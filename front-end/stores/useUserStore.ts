import { UserState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { userService } from "@/services/userService";

export const useUserStore = create<UserState>((set, get) => ({
  uploadAvatar: async (formData) => {
    try {
      const { user, setUser } = useAuthStore.getState();

      if (!user) return;

      const { avatarUrl } = await userService.uploadAvatar(formData);

      setUser({
        ...user,
        avatarUrl,
      });
    } catch (error) {
      console.log("uploadAvatar_useUserStore", error);
      toast.error("Lỗi upload avatar");
    }
  },
}));
