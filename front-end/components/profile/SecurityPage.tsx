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
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";

const SecurityPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <CardTitle className="flex gap-2 items-center">
            <ShieldUser color="purple" />
            <p className="text-black">Quyền riêng tư & bảo mật</p>
          </CardTitle>
        </CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          Quản lý cài đặt quyền riêng tư và bảo mật của bạn
        </CardDescription>
      </CardHeader>

      <Separator />
      <CardContent className="text-sm space-y-2">
        <div className="w-full p-2 flex gap-2 items-center justify-between rounded-lg hover:bg-gray-100">
          <div className="flex gap-2 items-center">
            <Shield />
            <p>Thay đổi mật khẩu</p>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="w-full p-2 flex gap-2 items-center justify-between rounded-lg hover:bg-gray-100">
          <div className="flex gap-2 items-center">
            <Bell />
            <p>Cài đặt thông báo</p>
          </div>
          <ChevronRight size={16} />
        </div>
        <div className="w-full p-2 flex gap-2 items-center justify-between rounded-lg hover:bg-gray-100">
          <div className="flex gap-2 items-center">
            <ShieldOff />
            <p>Chặn & Báo cáo</p>
          </div>
          <ChevronRight size={16} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPage;
