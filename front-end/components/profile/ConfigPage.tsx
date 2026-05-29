import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";

const ConfigPage = () => {
  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="flex gap-2 items-center text-zinc-900 dark:text-zinc-100 text-base font-bold">
          <Sun size={18} className="text-violet-500 dark:text-violet-400" />
          <span>Tùy chỉnh ứng dụng</span>
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
          Cá nhân hóa trải nghiệm trò chuyện của bạn.
        </CardDescription>
      </CardHeader>

      <Separator className="bg-zinc-100 dark:bg-zinc-900 mb-4" />

      <CardContent className="px-0 pb-0 text-sm text-zinc-600 dark:text-zinc-400 space-y-4">
        <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-500/5 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60">
          <div className="space-y-0.5 text-left">
            <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold text-sm">
              Diện mạo
            </h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Chuyển đổi chế độ sáng và tối
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Sun size={15} className="text-zinc-400 dark:text-zinc-600" />
            {/* gắn sự kiện switch */}
            <Switch />
            <Moon size={15} className="text-zinc-400 dark:text-zinc-650" />
          </div>
        </div>

        <div className="flex justify-between items-center p-3 rounded-2xl bg-zinc-500/5 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900/60">
          <div className="space-y-0.5 text-left">
            <h3 className="text-zinc-800 dark:text-zinc-200 font-semibold text-sm">
              Hiển thị trạng thái online
            </h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Cho phép người khác thấy trạng thái online của bạn
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigPage;
