import React from "react";

const UnreadCountBadge = ({ unreadCount }: { unreadCount: number }) => {
  return (
    <div className="h-4 w-4 absolute top-0 -right-1 border-[1.5] rounded-full text-white bg-purple-400 z-10 flex items-center justify-center text-[11px]">
      {unreadCount}
    </div>
  );
};

export default UnreadCountBadge;
