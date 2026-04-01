import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface IAvatarImgProps {
  avatarUrl?: string | null;
  name?: string;
}

const AvatarImg = ({ avatarUrl, name }: IAvatarImgProps) => {
  return (
    <Avatar className="w-10 h-10">
      {avatarUrl === null ? (
        <AvatarFallback
          className={cn(
            "border-2 border-white rounded-full bg-blue-500/90 text-white",
          )}
        >
          {name?.charAt(0).toUpperCase()}
        </AvatarFallback>
      ) : (
        <AvatarImage
          src={avatarUrl}
          className={cn("border-2 border-white rounded-full")}
        />
      )}
    </Avatar>
  );
};

export default AvatarImg;
