import { Plus } from "lucide-react";
import { NewGroupDialog } from "@/components/createNewGroup";
import { useState } from "react";
import { useFriendStore } from "@/stores/useFriendStore";

const NewGroupChatModal = () => {
  // GLOBAL STATE
  const { getAllFriend } = useFriendStore();

  // LOCAL STATE
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = async () => {
    setOpen((prev) => !prev);

    await getAllFriend();
  };

  return (
    <>
      <button onClick={handleClick} type="button" className="cursor-pointer">
        <Plus size={16} className="text-gray-500" />
      </button>

      {open && <NewGroupDialog open={open} setOpen={setOpen} />}
    </>
  );
};

export default NewGroupChatModal;
