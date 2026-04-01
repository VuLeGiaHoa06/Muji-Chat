import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
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
    } catch (error) {
      console.log("addFriendModal_handleAddFirned", error);
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
        <UserPlus size={16} className="text-gray-500" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Kết bạn</DialogTitle>
        </DialogHeader>

        {/* Content */}
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
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
