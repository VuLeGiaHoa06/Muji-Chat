import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./AddFriendModal";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { UserRoundPlus } from "lucide-react";
import { User } from "@/types/user";
import { useFriendStore } from "@/stores/useFriendStore";

interface ISendFriendRequestFormProps {
  register: UseFormRegister<IFormValues>;
  searchedUsername: string;
  message?: string;
  loading: boolean;
  onBack: () => void;
  onAddFriend: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SendFriendRequestForm = ({
  register,
  searchedUsername,
  loading,
  onBack,
  onAddFriend,
}: ISendFriendRequestFormProps) => {
  // global state
  const { friends } = useFriendStore();

  const [isFriend, setisFriend] = useState(false);

  useEffect(() => {
    if (!searchedUsername) return;

    setisFriend(friends.some((f) => f.username === searchedUsername));
  }, [searchedUsername]);

  return (
    <>
      <form onSubmit={onAddFriend}>
        {/* Found user */}
        <p className="text-[14px] text-green-400 mb-2">{`Tìm thấy ${searchedUsername} rồi`}</p>

        <div className="space-y-2 mb-5">
          <Label htmlFor="add-friend">Giới thiệu</Label>
          <Input
            id="add-friend"
            placeholder="Gửi lời mời kết bạn"
            {...register("message")}
          ></Input>
        </div>

        {/* DialogFooter */}
        <DialogFooter className="flex items-center">
          {isFriend && (
            <Button
              type="button"
              variant={"outline"}
              className="flex-1 cursor-pointer"
            >
              Huỷ kết bạn
            </Button>
          )}

          {!isFriend && (
            <>
              <Button
                variant="outline"
                type="button"
                onClick={onBack}
                className="flex-1 cursor-pointer"
              >
                Quay lại
              </Button>
              <Button
                disabled={loading}
                type="submit"
                className="flex-1 bg-linear-to-r from-purple-400 to-pink-400 hover:opacity-90 cursor-pointer "
              >
                {loading ? (
                  <p>Đang tìm...</p>
                ) : (
                  <>
                    <UserRoundPlus size={18} />
                    <span>Kết bạn</span>
                  </>
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </form>
    </>
  );
};

export default SendFriendRequestForm;
