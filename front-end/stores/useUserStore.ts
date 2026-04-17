import { UserState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { userService } from "@/services/userService";

export const useUserStore = create<UserState>((set, get) => ({
  loading: false,

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

  uploadProfile: async (displayName, phone, email, bio) => {
    set({ loading: true });
    try {
      const { user, setUser } = useAuthStore.getState();

      const { updatedUser } = await userService.uploadProfile(
        displayName,
        email,
        phone,
        bio,
      );

      setUser(updatedUser);

      toast.success("Update profile thành công");
    } catch (error) {
      console.log("useUserStore_uploadProfile", error);
      toast.error("Lõi update profile");
    } finally {
      set({ loading: false });
    }
  },
}));
