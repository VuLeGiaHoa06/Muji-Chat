"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { MessageCircleMore, Search, UserPlus, Sparkles } from "lucide-react";
import { useFriendStore } from "@/stores/useFriendStore";
import FriendCard from "./FriendCard";
import { Input } from "../ui/input";

const NewChatDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { friends } = useFriendStore();
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc bạn bè real-time dựa trên tên hoặc username
  const filteredFriends = friends.filter(
    (f) =>
      f.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-none bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 overflow-hidden max-h-[85vh] flex flex-col transition-all duration-300">
        <div className="flex flex-col h-full space-y-4">
          {/* HEADER */}
          <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/10"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <MessageCircleMore size={20} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                Bắt đầu trò chuyện
                <Sparkles size={14} className="text-pink-500 animate-pulse" />
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 dark:text-zinc-500">
                Tìm bạn bè để bắt đầu cuộc trò chuyện mới
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* SEARCH INPUT BAR */}
          {friends.length > 0 && (
            <div className="relative flex items-center">
              <Search
                size={16}
                className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none"
              />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm bạn bè theo tên hoặc username..."
                className="pl-10 h-11 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all"
              />
            </div>
          )}

          {/* FRIEND LIST WITH SCROLLBAR */}
          <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 -mr-2 space-y-2 custom-scrollbar">
            {friends.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 dark:text-zinc-500">
                <div className="w-14 h-14 rounded-full bg-violet-500/5 dark:bg-violet-500/10 flex items-center justify-center mb-4">
                  <UserPlus
                    size={24}
                    className="text-violet-500/60 dark:text-violet-400/60"
                  />
                </div>
                <p className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
                  Chưa có bạn bè nào
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-[240px]">
                  Hãy kết bạn với những người khác để bắt đầu cuộc hội thoại thú
                  vị của bạn!
                </p>
              </div>
            ) : filteredFriends.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400 dark:text-zinc-500">
                <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Không tìm thấy kết quả
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                  Thử tìm kiếm với một từ khóa khác xem sao nhé!
                </p>
              </div>
            ) : (
              filteredFriends.map((f) => (
                <FriendCard
                  key={f._id}
                  avatarUrl={f.avatarUrl}
                  displayName={f.displayName}
                  username={f.username}
                  friendId={f._id}
                  onClose={setOpen}
                />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatDialog;
