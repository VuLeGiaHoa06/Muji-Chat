import { Loader2 } from "lucide-react";
import React from "react";

const ChatWindowSekeleton = () => {
  return (
    <div className="h-full flex items-center justify-center animate-spin">
      <Loader2 />
    </div>
  );
};

export default ChatWindowSekeleton;
