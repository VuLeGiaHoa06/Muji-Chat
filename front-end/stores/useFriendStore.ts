import { friendService } from "@/services/friendService";
import { FriendState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  // =========================================
  // 1. STATE
  // =========================================
  loading: false,
  friends: [],
  receivedList: [],
  sentList: [],

  // =========================================
  // 2. ACTIONS
  // =========================================
  searchByUsername: async (username) => {
    try {
      set({ loading: true });

      const user = await friendService.searchByUsername(username);

      return user;
    } catch (error: any) {
      if (error.response.status === 404) {
        return;
      }
      console.log("useFirnedStore", error);
      toast.error("Lỗi tìm kiếm tin nhắn");
    } finally {
      set({ loading: false });
    }
  },

  addFriend: async (to, message) => {
    try {
      set({ loading: true });

      await friendService.sendFriendRequest(to, message);
    } catch (error) {
      console.log("useFriendStore_addFirned", error);
    } finally {
      set({ loading: false });
    }
  },

  getAllFriendRequest: async () => {
    try {
      set({ loading: true });

      const { received, sent } = await friendService.getAllFriendRequest();

      set({ receivedList: received, sentList: sent });
    } catch (error) {
      console.log("useFriendStore_getAllFriendRequest", error);
    } finally {
      set({ loading: false });
    }
  },

  acceptRequest: async (idRequest) => {
    try {
      set({ loading: true });

      await friendService.accepFriendRequest(idRequest);

      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== idRequest),
      }));
      toast.success("Thêm bạn thành công");
    } catch (error) {
      console.log("useFriendStore_acceptRequest", error);
    } finally {
      set({ loading: false });
    }
  },

  declineRequest: async (idRequest) => {
    try {
      if (!idRequest) return;

      set({ loading: true });

      await friendService.declineFriendRequest(idRequest);

      set((state) => ({
        sentList: state.sentList.filter((r) => r._id !== idRequest),
      }));
    } catch (error) {
      console.log("useFriendStore_declineRequest", error);
    } finally {
      set({ loading: false });
    }
  },

  getAllFriend: async () => {
    try {
      set({ loading: true });

      const { friends } = await friendService.getAllFriends();

      set({ friends });
    } catch (error) {
      console.log("useFriendStore_getAllFriend", error);
    } finally {
      set({ loading: false });
    }
  },
}));
