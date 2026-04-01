import { useFriendStore } from "@/stores/useFriendStore";
import React, { Dispatch, SetStateAction, useState } from "react";
import FriendRequestItem from "./FriendRequestItem";
import { Button } from "../ui/button";

const ReceivedRequest = ({
  onClose,
}: {
  onClose: Dispatch<SetStateAction<boolean>>;
}) => {
  // global state
  const { receivedList, acceptRequest, declineRequest, loading } =
    useFriendStore();

  //  handles
  const handleAccept = async (idRequest: string) => {
    try {
      await acceptRequest(idRequest);
    } catch (error) {
      console.log("receivedRequest_handleAccpet", error);
    }
  };

  const handleDecline = async (idRequest: string) => {
    try {
      await declineRequest(idRequest);
    } catch (error) {
      console.log("receivedReques_handleDelicne", error);
    }
  };

  // render
  if (receivedList.length === 0) {
    return <p className="text-gray-500 ">Bạn chưa có lời mời kết bạn nào.</p>;
  }

  return (
    <div className="w-full space-y-2">
      {receivedList.map((r) => (
        <FriendRequestItem
          key={r._id}
          avatarUrl={r.from.avatarUrl}
          displayName={r.from.displayName}
          username={r.from.username}
          action={
            <div className="flex gap-2">
              <Button
                type="button"
                className="cursor-pointer"
                onClick={() => handleAccept(r._id)}
              >
                Chấp nhận
              </Button>
              <Button
                variant="outline"
                type="button"
                className="cursor-pointer"
                onClick={() => handleDecline(r._id)}
              >
                Từ chối
              </Button>
            </div>
          }
        />
      ))}
    </div>
  );
};

export default ReceivedRequest;
