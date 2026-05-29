import React from "react";

const UnreadCountBadge = ({ unreadCount }: { unreadCount: number }) => {
  return (
    <div
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-white z-10 flex items-center justify-center text-[10px] font-bold shadow-sm"
      style={{
        background: "linear-gradient(135deg, #7c3aed, #ec4899)",
        boxShadow: "0 2px 8px rgba(124,58,237,0.5)",
      }}
    >
      {unreadCount > 99 ? "99+" : unreadCount}
    </div>
  );
};

export default UnreadCountBadge;
