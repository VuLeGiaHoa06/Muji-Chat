import React from "react";

const StatusBadge = ({ status }: { status: "online" | "offline" }) => {
  return (
    <div
      className={`h-3 w-3 rounded-full border-2 border-gray-100 absolute right-0 bottom-0 ${
        status === "online" ? "bg-green-500" : "bg-gray-500"
      }`}
    ></div>
  );
};

export default StatusBadge;
