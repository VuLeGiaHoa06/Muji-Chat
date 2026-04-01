import { useFriendStore } from "@/stores/useFriendStore";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import NewChatDialog from "./NewChatDialog";

const CreateNewChat = () => {
  const { getAllFriend, friends } = useFriendStore();

  const [openDiaglog, setOpenDialog] = useState(false);

  const handleNewMessage = async () => {
    setOpenDialog(true);
    try {
      await getAllFriend();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={handleNewMessage}
        className="flex items-center hover:shadow-md gap-3 bg-white cursor-pointer w-full p-4 border border-gray-300 rounded-xl"
      >
        <div className="p-2 bg-linear-65 from-pink-500 to-purple-500 rounded-full">
          <MessageCircle color="white" size={20} />
        </div>
        <p>Gửi Tin Nhắn Mới</p>
      </div>

      {openDiaglog && (
        <NewChatDialog open={openDiaglog} setOpen={setOpenDialog} />
      )}
    </>
  );
};

export default CreateNewChat;
