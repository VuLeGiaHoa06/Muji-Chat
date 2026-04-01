"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FieldDescription } from "../ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import placeholder from "@/public/placeholder.png";
import InputPassword from "../custom/InputPassword";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const signIn = useAuthStore((s) => s.signIn);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "user2",
      password: "123",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { username, password } = values;

    // truyen du lieu vao store
    await signIn(username, password);

    router.push("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 z-10">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <div className="p-4">
            <div className="text-center sapce-y-4 mb-6">
              <Image
                src={logo}
                alt="image"
                width={100}
                height={100}
                className="mx-auto object-contain h-[100px] w-[100px]"
              />
              <h2 className="text-[24px] font-bold">
                Đăng nhập tài khoản Muji
              </h2>
              <p className="text-gray-400">
                Chào mừng bạn! Hãy đăng nhập để bắt đầu!
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên đăng nhập</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
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
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <InputPassword placeholder="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="w-full" type="submit">
                  Đăng nhập
                </Button>
              </form>
              <p className="text-center my-2">
                Bạn chưa có tài khoản?{" "}
                <Link href="/sign-up" className="underline">
                  Đăng ký
                </Link>
              </p>
            </Form>
          </div>
          <div className="bg-muted relative hidden md:block overflow-hidden">
            <Image
              src={placeholder}
              alt="image"
              width={500}
              height={500}
            ></Image>
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        Bằng cách tiếp tục, bạn có đồng ý với <a href="#">Điều khoản dịch vụ</a>{" "}
        và <a href="#">Chính sách bảo mật</a> của chúng tôi
      </FieldDescription>
    </div>
  );
}
