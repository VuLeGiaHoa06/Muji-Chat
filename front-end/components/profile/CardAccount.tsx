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
import { FileUser, Loader2 } from "lucide-react";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/stores/useUserStore";

const infoSchema = z.object({
  displayName: z.string().min(1, "Lỗi displayName"),
  email: z.email(),
  bio: z.string().min(1, "Lỗi bio"),
  phone: z.string().min(10, "Số điện thoại phải có 10 chữ số"),
});

const CardAccount = () => {
  const { user } = useAuthStore();
  const { uploadProfile, loading } = useUserStore();

  if (!user) return;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user.email || "",
      bio: user.bio || "",
      phone: user.phone || "",
    },
  });

  // global state

  const onSubmit = async (data: z.infer<typeof infoSchema>) => {
    const { displayName, email, phone, bio } = data;

    await uploadProfile(displayName, +phone, email, bio);
  };

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="name">
                Họ và tên
              </Label>
              <Input id="name" {...register("displayName")}></Input>

              {errors.displayName && (
                <p className="text-red-500">{errors.displayName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="username">
                Tên người dùng
              </Label>
              <Input disabled id="username" value={user.username}></Input>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Label className="text-black" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                value={user.email}
                {...register("email")}
              ></Input>

              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-black" htmlFor="phone">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
              ></Input>

              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-black" htmlFor="bio">
              Giới thiệu
            </Label>
            <Input
              id="bio"
              placeholder="Thêm thông tin giới thiệu"
              {...register("bio")}
            ></Input>

            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-linear-to-r w- from-purple-500 to-pink-500 px-4 py-2 cursor-pointer font-semibold mt-3 text-white rounded-2xl"
            disabled={isSubmitting || loading}
          >
            {isSubmitting || loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Lưu thay đổi"
            )}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardAccount;
