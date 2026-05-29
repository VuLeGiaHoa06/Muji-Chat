"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface IAvatarImgProps {
  avatarUrl?: string | null;
  name?: string;
  /** "sm" = 28px, "md" = 40px (default), "lg" = 48px */
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-7 h-7 text-[11px]",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

const AvatarImg = ({ avatarUrl, name, size = "md" }: IAvatarImgProps) => {
  const sizeClass = sizeMap[size];

  return (
    <Avatar className={cn(sizeClass, "rounded-xl flex-shrink-0")}>
      {avatarUrl ? (
        <AvatarImage
          src={avatarUrl}
          alt={name}
          className="rounded-xl object-cover"
        />
      ) : (
        <AvatarFallback
          className={cn("rounded-xl font-bold text-white", sizeClass)}
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          }}
        >
          {name?.charAt(0).toUpperCase() ?? "?"}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default AvatarImg;
