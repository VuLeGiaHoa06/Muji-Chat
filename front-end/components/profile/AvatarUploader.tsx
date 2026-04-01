import { useUserStore } from "@/stores/useUserStore";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";

const AvatarUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadAvatar } = useUserStore();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    await uploadAvatar(formData);
  };

  return (
    <>
      <Button
        type="button"
        variant={"secondary"}
        onClick={handleClick}
        className="absolute bottom-0 right-0 translate-y-2 p-1 rounded-full bg-gray-200 cursor-pointer"
      >
        <Camera className="w-3 h-3 text-white" />
      </Button>

      <input type="file" hidden ref={fileInputRef} onChange={handleUpload} />
    </>
  );
};

export default AvatarUploader;
