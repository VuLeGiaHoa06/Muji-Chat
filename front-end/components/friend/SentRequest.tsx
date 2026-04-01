import { useFriendStore } from "@/stores/useFriendStore";
import React, { useState } from "react";
import FriendRequestItem from "./FriendRequestItem";

const SentRequest = () => {
  const { sentList } = useFriendStore();

  if (!sentList || sentList.length === 0) {
    return <p className="text-gray-500 ">Bạn chưa gửi lời mời kết bạn nào.</p>;
  }

  return (
    <div className="w-full space-y-2">
      {sentList.map((r) => (
        <FriendRequestItem
          key={r._id}
          avatarUrl={r.to.avatarUrl}
          displayName={r.to.displayName}
          username={r.to.username}
          action={<p className="text-gray-500 ">Đang chờ đồng ý...</p>}
        />
      ))}
    </div>
  );
};

export default SentRequest;
