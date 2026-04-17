import { Image, SendHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { KeyboardEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import EmojiPicker from "./EmojiPicker";
import { useChatStore } from "@/stores/useChatStore";
import { Conversation } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { set } from "zod";

const MessageInput = ({ selectedConv }: { selectedConv: Conversation }) => {
  // =========================================
  // 1. STORE & HOOKS (Dữ liệu toàn cục)
  // =========================================
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const { user } = useAuthStore();

  // =========================================
  // 2. GUARD CLAUSE (Mệnh đề bảo vệ)
  // =========================================
  if (!user) return;

  // =========================================
  // 3. LOCAL STATE (Biến nội bộ)
  // =========================================
  const [value, setValue] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // =========================================
  // 3. REFS (Tham chiếu DOM hoặc biến mutable)
  // =========================================
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadImageRef = useRef<HTMLInputElement>(null);

  // =========================================
  // 4. EVENT HANDLERS (Xử lý sự kiện)
  // =========================================
  const handlSendMessage = async () => {
    try {
      const formData = new FormData();

      selectedImages.forEach((f) => {
        formData.append("images", f);
      });

      if (selectedConv.type === "direct") {
        const participant = selectedConv.participants.find(
          (p) => p._id !== user._id,
        );

        if (!participant) return;

        formData.append("recipientId", participant?._id);
        formData.append("content", value);
        formData.append("conversationId", selectedConv._id);

        await sendDirectMessage(formData);

        setSelectedImages([]);
        setPreviewImages([]);
      } else {
        await sendGroupMessage(selectedConv._id, value);
      }

      if (!inputRef.current) return;
      inputRef.current.focus();
    } catch (err) {
      console.log("MessageInput_handleSenMessage", err);
    } finally {
      setValue("");
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handlSendMessage();
    }
  };

  const handleClick = () => {
    if (!uploadImageRef.current) return;

    uploadImageRef.current.click();
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];

    if (imageFile) {
      setSelectedImages((prev) =>
        prev === null ? [imageFile] : [...prev, imageFile],
      );

      const url = URL.createObjectURL(imageFile);
      setPreviewImages((prev) => [...prev, url]);
    } else {
      return;
    }

    const formData = new FormData();

    // formData.append("imageFile", imageFile);

    console.log({ formData });
  };

  const handleDeleteIamge = (id: number) => {
    const updatedSelected = selectedImages?.filter((_, index) => id !== index);
    const updatedPreview = previewImages?.filter((_, index) => id !== index);

    if (!updatedSelected) return;

    setSelectedImages(updatedSelected);
    setPreviewImages(updatedPreview);
  };

  return (
    <div className="relative min-h-[58px] bg-gray-100 px-4 py-3">
      {previewImages && (
        <div className="flex items-center gap-2 mb-5">
          {previewImages.map((img, index) => (
            <div key={index} className="h-15 w-15 mb-10 relative group">
              <img
                src={img}
                alt="preview"
                className="object-cover w-full h-full rounded-lg"
              />

              <button
                type="button"
                onClick={() => handleDeleteIamge(index)}
                className="absolute right-2 text-sm top-0 text-white px-1 py-0.5  rounded-full bg-black hover:bg-black/90 hidden group-hover:block"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
      <form className="flex items-center sticky bottom-3 w-full">
        {/* Upload Image */}
        <button
          onClick={handleClick}
          type="button"
          className="cursor-pointer mr-3 group relative"
        >
          <Image size={18} />

          <p className="absolute  text-nowrap cursor-default -top-10 max-[100px] -left-1/2 text-sm group-hover:block hidden bg-gray-200 rounded-lg p-2">
            Upload Image
          </p>
        </button>

        <input
          type="file"
          ref={uploadImageRef}
          className="hidden"
          onChange={handleUploadImage}
        />

        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <div className="flex flex-1 items-center -mr-8">
          {/* Input */}
          <Input
            onKeyDown={handleKeyPress}
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border border-gray-200 rounded-xl mx-3 "
            placeholder="Soạn tin nhắn..."
          />

          {/* Emoji */}
          <EmojiPicker onChange={(emoji) => setValue(`${value}${emoji}`)} />
        </div>

        {/* Send button */}
        <Button
          disabled={!value && selectedImages.length === 0}
          type="button"
          className="cursor-pointer"
          onClick={handlSendMessage}
        >
          <SendHorizontal size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
