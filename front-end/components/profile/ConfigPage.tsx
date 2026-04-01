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
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <Sun color="purple" />
          <p className="text-black">Tuỳ chỉnh ứng dụng</p>
        </CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          Cá nhân hoá trò chuyện của bạn.
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="text-sm text-muted-foreground space-y-3">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-black font-semibold text-[16px]">Diện mạo</h3>
            <p>Chuyển đổi chế độ sáng và tối</p>
          </div>

          <div className="flex items-center gap-2">
            <Sun size={18} color="gray" />
            {/* gắn sự kiện switch */}
            <Switch />
            <Moon size={18} color="gray" />
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h3 className="text-black font-semibold text-[16px]">
              Hiển thị trạng thái online
            </h3>
            <p>Cho phép người khác thấy trạng thái online của bạn</p>
          </div>

          <div className="flex items-center gap-2">
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigPage;
