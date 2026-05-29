import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./AddFriendModal";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  UserRoundPlus,
  MessageSquare,
  ArrowLeft,
  UserMinus,
  Loader2,
} from "lucide-react";
import { User } from "@/types/user";
import { useFriendStore } from "@/stores/useFriendStore";
import AvatarImg from "../avatar/AvatarImg";

interface ISendFriendRequestFormProps {
  register: UseFormRegister<IFormValues>;
  searchedUsername: string;
  message?: string;
  loading: boolean;
  onBack: () => void;
  onAddFriend: (e: React.FormEvent<HTMLFormElement>) => void;
  searchUser?: User;
}

const SendFriendRequestForm = ({
  register,
  searchedUsername,
  loading,
  onBack,
  onAddFriend,
  searchUser,
}: ISendFriendRequestFormProps) => {
  // global state
  const { friends } = useFriendStore();

  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    if (!searchedUsername) return;

    setIsFriend(friends.some((f) => f.username === searchedUsername));
  }, [searchedUsername, friends]);

  return (
    <form onSubmit={onAddFriend} className="space-y-4">
      {/* Found user Info Box */}
      <div className="text-left">
        <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2 block">
          Đã tìm thấy thành viên
        </span>
        <div className="flex items-center justify-between p-3.5 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 rounded-2xl animate-fade-in">
          <div className="flex items-center gap-3">
            <AvatarImg
              avatarUrl={searchUser?.avatarUrl}
              name={searchUser?.displayName || searchedUsername}
              size="md"
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">
                {searchUser?.displayName || searchedUsername}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                @{searchUser?.username || searchedUsername}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
            Sẵn sàng kết nối
          </span>
        </div>
      </div>

      {/* Message input */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="add-friend"
          className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-left"
        >
          Lời nhắn giới thiệu
        </Label>
        <div className="relative flex items-center">
          <MessageSquare
            size={16}
            className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none"
          />
          <Input
            id="add-friend"
            placeholder="Gửi lời chào kết bạn..."
            {...register("message")}
            className="pl-10 h-11 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all"
          />
        </div>
      </div>

      {/* DialogFooter */}
      <DialogFooter className="flex flex-row items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 w-full sm:justify-between">
        {isFriend ? (
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-2xl font-semibold border-red-500/20 text-red-500 hover:bg-red-500/5 dark:hover:bg-red-500/10 cursor-pointer flex gap-1.5 items-center justify-center transition-all"
          >
            <UserMinus size={16} />
            <span>Hủy kết bạn</span>
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              type="button"
              onClick={onBack}
              className="flex-1 h-11 rounded-2xl font-semibold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer flex gap-1.5 items-center justify-center transition-all"
            >
              <ArrowLeft size={16} />
              <span>Quay lại</span>
            </Button>
            <Button
              disabled={loading}
              type="submit"
              className="flex-1 h-11 flex gap-2 justify-center items-center cursor-pointer rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400"
              style={{
                boxShadow: "0 4px 15px rgba(124, 58, 237, 0.25)",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(124, 58, 237, 0.35)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(124, 58, 237, 0.25)";
                }
              }}
            >
              {loading ? (
                <div className="flex items-center gap-1.5">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Đang gửi...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <UserRoundPlus size={16} />
                  <span>Gửi lời mời</span>
                </div>
              )}
            </Button>
          </>
        )}
      </DialogFooter>
    </form>
  );
};

export default SendFriendRequestForm;
