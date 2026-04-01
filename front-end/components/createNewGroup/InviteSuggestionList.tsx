import { Friend } from "@/types/user";
import React from "react";
import AvatarImg from "../avatar/AvatarImg";

const InviteSuggestionList = ({
  searchedUsername,
  handleSelectedUser,
}: {
  searchedUsername: Friend[];
  handleSelectedUser: (f: Friend) => void;
}) => {
  if (searchedUsername.length === 0) {
    return (
      <p className="text-gray-500 my-4">
        Tìm kiếm để thêm bạn bè vào nhóm chat!
      </p>
    );
  }
  return (
    <div className="space-y-2 my-4">
      {searchedUsername.map((f: Friend) => (
        <div
          key={f._id}
          onClick={() => handleSelectedUser(f)}
          className="flex items-center p-2 gap-2 border border-gray-300 rounded-lg cursor-pointer hover:border-black"
        >
          <AvatarImg avatarUrl={f.avatarUrl} name={f.displayName}></AvatarImg>
          <p className="font-semibold">{f.displayName}</p>
        </div>
      ))}
    </div>
  );
};

export default InviteSuggestionList;
