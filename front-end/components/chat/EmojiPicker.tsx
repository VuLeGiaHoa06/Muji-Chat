import { Smile } from "lucide-react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface IEmojiPicker {
  onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: IEmojiPicker) => {
  return (
    <Popover>
      {/* Open popover */}
      <PopoverTrigger
        asChild
        className="transition -translate-x-13  cursor-pointer"
      >
        <div className="p-1.5 hover:bg-gray-200 rounded-full">
          <Smile size={18} />
        </div>
      </PopoverTrigger>

      {/* Content */}
      <PopoverContent
        side="right"
        sideOffset={40}
        className="bg-tranparent border-none shadow-none drop-shadow-none mb-12"
      >
        <Picker
          theme={"light"}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          emojiSize={24}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
