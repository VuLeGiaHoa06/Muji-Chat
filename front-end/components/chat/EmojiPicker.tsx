"use client";

import { Smile } from "lucide-react";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "@/lib/providers/ThemeProvider";

interface IEmojiPicker {
  onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: IEmojiPicker) => {
  const { theme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
          style={{ color: "var(--muted-foreground)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ec4899")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--muted-foreground)")
          }
          title="Chọn emoji"
        >
          <Smile size={18} />
        </button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        sideOffset={12}
        align="end"
        className="bg-transparent border-none shadow-none drop-shadow-none p-0 w-auto"
      >
        <Picker
          theme={theme === "dark" ? "dark" : "light"}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          emojiSize={22}
          perLine={8}
          previewPosition="none"
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
