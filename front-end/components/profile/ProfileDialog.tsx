"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { CardInfo, TabTrigger } from "@/components/profile/";
import { useAuthStore } from "@/stores/useAuthStore";
import { Settings, Sparkles } from "lucide-react";

const ProfileDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg border-none bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300">
        <div className="flex flex-col h-full space-y-5">
          {/* HEADER */}
          <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/10"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <Settings size={20} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                Cài đặt tài khoản
                <Sparkles size={14} className="text-pink-500 animate-pulse" />
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 dark:text-zinc-500">
                Quản lý thông tin hồ sơ và tùy chỉnh cấu hình tài khoản
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* SCROLLABLE DIALOG CONTENT CONTAINER */}
          <div className="flex-1 overflow-y-auto pr-1 -mr-2 space-y-5 custom-scrollbar">
            {/* CARD INFO */}
            <CardInfo user={user} />

            {/* TAB TRIGGER */}
            <TabTrigger />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
