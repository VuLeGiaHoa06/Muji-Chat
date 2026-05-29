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
  displayName: z.string().min(1, "Họ và tên bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  bio: z.string().min(1, "Giới thiệu bắt buộc"),
  phone: z.string().min(10, "Số điện thoại phải có ít nhất 10 chữ số"),
});

const CardAccount = () => {
  const { user } = useAuthStore();
  const { uploadProfile, loading } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      email: user?.email || "",
      bio: user?.bio || "",
      phone: user?.phone || "",
    },
  });

  if (!user) return null;

  const onSubmit = async (data: z.infer<typeof infoSchema>) => {
    const { displayName, email, phone, bio } = data;

    await uploadProfile(displayName, +phone, email, bio);
  };

  return (
    <Card className="border-none bg-transparent shadow-none p-0">
      <CardHeader className="px-0 pt-0 pb-4">
        <CardTitle className="flex gap-2 items-center text-zinc-900 dark:text-zinc-100 text-base font-bold">
          <FileUser
            size={18}
            className="text-violet-500 dark:text-violet-400"
          />
          <span>Thông tin cá nhân</span>
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 text-xs mt-1">
          Cập nhật chi tiết cá nhân và thông tin hồ sơ của bạn
        </CardDescription>
      </CardHeader>

      <Separator className="bg-zinc-100 dark:bg-zinc-900 mb-4" />

      <CardContent className="px-0 pb-0 text-sm text-zinc-600 dark:text-zinc-400">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <Label
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                htmlFor="name"
              >
                Họ và tên
              </Label>
              <Input
                id="name"
                {...register("displayName")}
                className="h-10 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all text-zinc-800 dark:text-zinc-200"
              />
              {errors.displayName && (
                <p className="text-[11px] text-red-500">
                  {errors.displayName.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5 text-left">
              <Label
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                htmlFor="username"
              >
                Tên người dùng
              </Label>
              <Input
                disabled
                id="username"
                value={user.username}
                className="h-10 bg-zinc-500/10 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-850 rounded-2xl text-sm opacity-60 text-zinc-500 dark:text-zinc-400 cursor-not-allowed select-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <Label
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                htmlFor="email"
              >
                Email
              </Label>
              <Input
                id="email"
                {...register("email")}
                className="h-10 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all text-zinc-800 dark:text-zinc-200"
              />
              {errors.email && (
                <p className="text-[11px] text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5 text-left">
              <Label
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
                htmlFor="phone"
              >
                Số điện thoại
              </Label>
              <Input
                id="phone"
                placeholder="Nhập số điện thoại"
                {...register("phone")}
                className="h-10 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all text-zinc-800 dark:text-zinc-200"
              />
              {errors.phone && (
                <p className="text-[11px] text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <Label
              className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              htmlFor="bio"
            >
              Giới thiệu
            </Label>
            <Input
              id="bio"
              placeholder="Thêm thông tin giới thiệu"
              {...register("bio")}
              className="h-10 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all text-zinc-800 dark:text-zinc-200"
            />
            {errors.bio && (
              <p className="text-[11px] text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="h-10 px-5 flex items-center justify-center gap-2 cursor-pointer font-bold text-sm text-white rounded-2xl transition-all duration-300 shadow-md bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 disabled:opacity-50"
              style={{
                boxShadow: "0 4px 12px rgba(124, 58, 237, 0.2)",
              }}
              onMouseEnter={(e) => {
                if (!loading && !isSubmitting) {
                  e.currentTarget.style.transform = "scale(1.02)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading && !isSubmitting) {
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
            >
              {isSubmitting || loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Lưu thay đổi"
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardAccount;
