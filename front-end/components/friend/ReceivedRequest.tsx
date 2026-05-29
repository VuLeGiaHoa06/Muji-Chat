"use client";

import { useFriendStore } from "@/stores/useFriendStore";
import React, { Dispatch, SetStateAction } from "react";
import FriendRequestItem from "./FriendRequestItem";
import { Button } from "../ui/button";
import { UserCheck, UserX, Inbox } from "lucide-react";

const ReceivedRequest = ({
  onClose,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  // global state
  const { receivedList, acceptRequest, declineRequest, loading } =
    useFriendStore();

  // handles
  const handleAccept = async (idRequest: string) => {
    try {
      await acceptRequest(idRequest);
    } catch (error) {
      console.log("receivedRequest_handleAccept", error);
    }
  };

  const handleDecline = async (idRequest: string) => {
    try {
      await declineRequest(idRequest);
    } catch (error) {
      console.log("receivedRequest_handleDecline", error);
    }
  };

  // render
  if (receivedList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center select-none animate-fade-in">
        <div className="w-14 h-14 mb-4.5 rounded-full bg-violet-500/5 dark:bg-violet-500/10 flex items-center justify-center relative">
          <Inbox
            size={22}
            className="text-violet-500/60 dark:text-violet-400/60 animate-pulse"
          />
          <div className="absolute inset-0 -z-10 bg-violet-500/10 blur-xl rounded-full opacity-60" />
        </div>
        <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">
          Chưa nhận lời mời nào
        </span>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-[240px] leading-relaxed">
          Hiện tại bạn không có lời mời kết bạn nào đang chờ duyệt.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2 max-h-[360px] overflow-y-auto pr-1 -mr-2 custom-scrollbar">
      {receivedList.map((r) => (
        <FriendRequestItem
          key={r._id}
          avatarUrl={r.from.avatarUrl}
          displayName={r.from.displayName}
          username={r.from.username}
          action={
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                className="h-9 px-3 rounded-xl font-semibold border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-red-500 hover:bg-red-500/5 hover:border-red-500/20 cursor-pointer flex gap-1 items-center justify-center transition-all text-xs"
                onClick={() => handleDecline(r._id)}
              >
                <UserX size={13} />
                <span>Từ chối</span>
              </Button>
              <Button
                type="button"
                className="h-9 px-3 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 cursor-pointer flex gap-1 items-center justify-center transition-all shadow-md text-xs"
                style={{
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onClick={() => handleAccept(r._id)}
              >
                <UserCheck size={13} />
                <span>Đồng ý</span>
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ReceivedRequest;
