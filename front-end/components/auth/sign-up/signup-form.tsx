"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { MessageCircleHeart, Sparkles } from "lucide-react";
import InputPassword from "../../custom/InputPassword";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { username, password, email, firstName, lastName } = values;
      await signUp(username, password, email, firstName, lastName);
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-4 py-8 animate-fade-up",
        className,
      )}
      {...props}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden relative"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(124,58,237,0.15)",
          boxShadow:
            "0 32px 64px rgba(124,58,237,0.12), 0 8px 24px rgba(0,0,0,0.08)",
        }}
      >
        {/* Top gradient strip */}
        <div
          className="h-1 w-full"
          style={{
            background: "linear-gradient(90deg, #7c3aed, #ec4899, #7c3aed)",
            backgroundSize: "200% auto",
            animation: "gradient-shift 3s linear infinite",
          }}
        />

        <div className="p-8">
          {/* Logo area */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                boxShadow: "0 8px 24px rgba(124,58,237,0.4)",
              }}
            >
              <MessageCircleHeart className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-bold muji-gradient-text mb-1">
              Tạo tài khoản
            </h1>
            <p className="text-sm text-gray-500">
              Tham gia Muji – Kết nối không giới hạn
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* First + Last name */}
              <div className="flex gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Họ
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nguyễn"
                            {...field}
                            className="rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-violet-500 h-11 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium text-sm">
                          Tên
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Văn A"
                            {...field}
                            className="rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-violet-500 h-11 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium text-sm">
                      Tên đăng nhập
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username123"
                        {...field}
                        className="rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-violet-500 h-11 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@example.com"
                        {...field}
                        className="rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-violet-500 h-11 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium text-sm">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <InputPassword
                        placeholder="Ít nhất 6 ký tự"
                        {...field}
                        className="rounded-xl border-gray-200 bg-gray-50 focus-visible:ring-violet-500 focus-visible:border-violet-400 h-11 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full h-11 rounded-xl font-semibold text-white cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] mt-2"
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                  boxShadow: "0 4px 16px rgba(124,58,237,0.35)",
                }}
              >
                <Sparkles size={16} className="mr-2" />
                Tạo tài khoản
              </Button>
            </form>

            <p className="text-center mt-5 text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <Link
                href="/sign-in"
                className="font-semibold muji-gradient-text hover:opacity-80 transition-opacity"
              >
                Đăng nhập
              </Link>
            </p>
          </Form>
        </div>
      </div>

      {/* Legal note */}
      <p className="mt-4 text-xs text-center text-gray-400 max-w-sm">
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <a
          href="#"
          className="underline hover:text-violet-500 transition-colors"
        >
          Điều khoản dịch vụ
        </a>{" "}
        và{" "}
        <a
          href="#"
          className="underline hover:text-violet-500 transition-colors"
        >
          Chính sách bảo mật
        </a>{" "}
        của Muji.
      </p>
    </div>
  );
}
