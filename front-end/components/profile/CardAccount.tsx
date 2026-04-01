import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileUser } from "lucide-react";
import { Separator } from "../ui/separator";

const CardAccount = () => {
  const { user } = useAuthStore();

  if (!user) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 items-center">
          <FileUser color="purple" />
          <p className="text-black">Thông tin cá nhân</p>
        </CardTitle>
        <CardDescription className="text-gray-500 text-sm">
          Cập nhật chi tiết cá nhân và thông tin hồ sơ của bạn
        </CardDescription>
      </CardHeader>

      <Separator />

      <CardContent className="text-sm text-muted-foreground">
        <form action="" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="name">
                Họ và tên
              </Label>
              <Input
                id="name"
                value={user.displayName}
                onChange={() => {}}
              ></Input>
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="username">
                Tên người dùng
              </Label>
              <Input
                id="username"
                value={user.username}
                onChange={() => {}}
              ></Input>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="email">
                Email
              </Label>
              <Input id="email" value={user.email} onChange={() => {}}></Input>
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="phone">
                Số điện thoại
              </Label>
              <Input id="phone" value={""} onChange={() => {}}></Input>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-black" htmlFor="bio">
              Giới thiệu
            </Label>
            <Input
              id="bio"
              value={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
              onChange={() => {}}
            ></Input>
          </div>

          <button
            type="submit"
            className="bg-linear-to-r from-purple-500 to-pink-500 px-4 py-2 cursor-pointer font-semibold mt-3 text-white rounded-2xl"
          >
            Lưu thay đổi
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardAccount;
