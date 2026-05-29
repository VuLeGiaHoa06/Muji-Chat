import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Bell,
  ChevronRight,
  Shield,
  ShieldOff,
  ShieldUser,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SecurityPage = () => {
  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="flex gap-2 items-center text-zinc-900 dark:text-zinc-100 text-base font-bold">
          <ShieldUser
            size={18}
            className="text-violet-500 dark:text-violet-400"
          />
          <span>Quyền riêng tư & bảo mật</span>
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
          Quản lý cài đặt quyền riêng tư và bảo mật của bạn
        </CardDescription>
      </CardHeader>

      <Separator className="bg-zinc-100 dark:bg-zinc-900 mb-4" />

      <CardContent className="px-0 pb-0 text-sm text-zinc-700 dark:text-zinc-300 space-y-2">
        <div className="group w-full p-3 flex gap-2 items-center justify-between rounded-2xl cursor-pointer transition-all duration-200 bg-zinc-500/5 dark:bg-zinc-900/40 border border-transparent dark:border-zinc-900/60 hover:border-violet-500/20 hover:bg-violet-500/5 dark:hover:bg-violet-500/10">
          <div className="flex gap-3 items-center">
            <Shield
              size={16}
              className="text-zinc-500 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
            />
            <span className="font-medium text-sm group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
              Thay đổi mật khẩu
            </span>
          </div>
          <ChevronRight
            size={15}
            className="text-zinc-300 dark:text-zinc-700 group-hover:text-violet-400 dark:group-hover:text-violet-500 transition-colors"
          />
        </div>

        <div className="group w-full p-3 flex gap-2 items-center justify-between rounded-2xl cursor-pointer transition-all duration-200 bg-zinc-500/5 dark:bg-zinc-900/40 border border-transparent dark:border-zinc-900/60 hover:border-violet-500/20 hover:bg-violet-500/5 dark:hover:bg-violet-500/10">
          <div className="flex gap-3 items-center">
            <Bell
              size={16}
              className="text-zinc-500 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
            />
            <span className="font-medium text-sm group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
              Cài đặt thông báo
            </span>
          </div>
          <ChevronRight
            size={15}
            className="text-zinc-300 dark:text-zinc-700 group-hover:text-violet-400 dark:group-hover:text-violet-500 transition-colors"
          />
        </div>

        <div className="group w-full p-3 flex gap-2 items-center justify-between rounded-2xl cursor-pointer transition-all duration-200 bg-zinc-500/5 dark:bg-zinc-900/40 border border-transparent dark:border-zinc-900/60 hover:border-violet-500/20 hover:bg-violet-500/5 dark:hover:bg-violet-500/10">
          <div className="flex gap-3 items-center">
            <ShieldOff
              size={16}
              className="text-zinc-500 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors"
            />
            <span className="font-medium text-sm group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
              Chặn & Báo cáo
            </span>
          </div>
          <ChevronRight
            size={15}
            className="text-zinc-300 dark:text-zinc-700 group-hover:text-violet-400 dark:group-hover:text-violet-500 transition-colors"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPage;
