"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceivedRequest from "./ReceivedRequest";
import SentRequest from "./SentRequest";
import { useFriendStore } from "@/stores/useFriendStore";
import { memo } from "react";
import { Users, Sparkles } from "lucide-react";

const FriendRequestDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { getAllFriendRequest } = useFriendStore();

  const [tab, setTab] = useState("received");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllFriendRequest();
      } catch (error) {
        console.log("FriendRequestDialog_fetchData", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, getAllFriendRequest]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-none bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300">
        <div className="flex flex-col h-full space-y-4">
          {/* HEADER */}
          <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/10"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <Users size={20} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                Lời mời kết bạn
                <Sparkles
                  size={14}
                  className="text-violet-500 dark:text-violet-400 animate-pulse"
                />
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 dark:text-zinc-500">
                Xem và quản lý các yêu cầu kết bạn của bạn
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* TABS CONTAINER */}
          <Tabs
            value={tab}
            onValueChange={setTab}
            className="w-full flex-1 flex flex-col space-y-4"
          >
            <TabsList className="w-full grid grid-cols-2 bg-zinc-500/5 dark:bg-zinc-900/30 p-1.5 rounded-2xl border border-zinc-100/80 dark:border-zinc-900/60 h-12">
              <TabsTrigger
                value="received"
                className="cursor-pointer rounded-xl font-semibold text-xs transition-all h-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800/80 dark:data-[state=active]:text-violet-400 data-[state=active]:text-violet-600 data-[state=active]:shadow-md data-[state=active]:shadow-violet-500/5"
              >
                Đã nhận
              </TabsTrigger>
              <TabsTrigger
                value="sent"
                className="cursor-pointer rounded-xl font-semibold text-xs transition-all h-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800/80 dark:data-[state=active]:text-violet-400 data-[state=active]:text-violet-600 data-[state=active]:shadow-md data-[state=active]:shadow-violet-500/5"
              >
                Đã gửi
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="received"
              className="flex-1 mt-0 outline-hidden"
            >
              <ReceivedRequest onClose={setOpen} />
            </TabsContent>
            <TabsContent value="sent" className="flex-1 mt-0 outline-hidden">
              <SentRequest />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(FriendRequestDialog);
