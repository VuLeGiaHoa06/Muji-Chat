import React from "react";

const StatusBadge = ({ status }: { status: "online" | "offline" }) => {
  return (
    <span
      className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-sidebar transition-colors duration-300 ${
        status === "online" ? "bg-green-500 online-glow" : "bg-gray-400"
      }`}
    />
  );
};

export default StatusBadge;
