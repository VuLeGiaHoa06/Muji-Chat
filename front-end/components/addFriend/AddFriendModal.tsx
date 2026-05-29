"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus, Sparkles } from "lucide-react";
import { useState } from "react";
import SearchForm from "./SearchForm";
import SendFriendRequestForm from "./SendFriendRequestForm";
import { useForm } from "react-hook-form";
import { useFriendStore } from "@/stores/useFriendStore";
import { User } from "@/types/user";

export interface IFormValues {
  username: string;
  message: string;
}

const AddFriendModal = () => {
  // global state
  const { searchByUsername, addFriend, loading, getAllFriend } =
    useFriendStore();

  // local state
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [searchedUsername, setSearchedUsername] = useState<string>("");
  const [searchUser, setSearchUser] = useState<User>();
  const [open, setOpen] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      username: "",
      message: "",
    },
  });

  const usernameValue = watch("username");

  // handles
  const handleSearch = handleSubmit(async (data) => {
    try {
      const username = data.username;
      setSearchedUsername(username);

      if (!username || username.trim() === "") {
        return;
      } else {
        const user = await searchByUsername(username);
        await getAllFriend();

        if (!user) throw new Error("Lỗi tìm kiếm user");

        setSearchUser(user);
        setIsFound(true); // đã tìm thấy
        reset();
      }
    } catch (error) {
      console.log("addFriendModal_handleSearch", error);
      setIsFound(false);
    }
  });

  const handleAddFriend = handleSubmit(async (data) => {
    if (!searchUser) return;

    const message = data.message;

    try {
      await addFriend(searchUser._id, message);
      setOpen(false);
      reset();
      setIsFound(null);
      setSearchedUsername("");
    } catch (error) {
      console.log("addFriendModal_handleAddFriend", error);
    }
  });

  const handleCancel = () => {
    setOpen(false);
    reset();
    setIsFound(null);
    setSearchedUsername("");
  };

  // render
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="w-full h-full flex items-center justify-center cursor-pointer text-zinc-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          title="Kết bạn mới"
        >
          <UserPlus
            size={15}
            className="hover:scale-110 transition-transform"
          />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-none bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300 animate-fade-in">
        <div className="flex flex-col h-full space-y-4">
          {/* HEADER */}
          <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/10"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <UserPlus size={20} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                Kết bạn mới
                <Sparkles
                  size={14}
                  className="text-violet-500 dark:text-violet-400 animate-pulse"
                />
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 dark:text-zinc-500">
                Tìm kiếm và kết nối thêm bạn bè vào Muji Chat
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* CONTENT FORM */}
          <div className="flex-1 pt-2">
            {!isFound && (
              <SearchForm
                isFound={isFound}
                usernameValue={usernameValue}
                register={register}
                onSubmit={handleSearch}
                onCancel={handleCancel}
                searchedUsername={searchedUsername}
                loading={loading}
              />
            )}

            {isFound && (
              <SendFriendRequestForm
                register={register}
                loading={loading}
                searchedUsername={searchedUsername}
                onBack={() => setIsFound(null)}
                onAddFriend={handleAddFriend}
                searchUser={searchUser}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
