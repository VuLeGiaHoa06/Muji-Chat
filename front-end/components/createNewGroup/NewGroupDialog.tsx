import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2, UserPlus } from "lucide-react";

import { MemberBadge, InviteSuggestionList } from "@/components/createNewGroup";
import { useFriendStore } from "@/stores/useFriendStore";
import { Friend } from "@/types/user";
import { useChatStore } from "@/stores/useChatStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const NewGroupDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  // GLOBAL STATE
  const { user } = useAuthStore();
  const { friends } = useFriendStore();
  const { createConversation } = useChatStore();

  // LOCAL STATE
  const [search, setSearch] = useState<string>("");
  const [nameGroup, setNameGroup] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchedUsername, setSearchedUsername] = useState<Friend[]>([]);
  const [selectedUserList, setSelectedUserList] = useState<Friend[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // HANDLES
  const handleSearchByUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value === "") {
      setSearchedUsername([]);
      return;
    }

    const sortUsername = friends.filter((f) => {
      const formatted = e.target.value.toLowerCase().trim();

      return (
        f.displayName.toLowerCase().includes(formatted) &&
        !selectedUserList.some((u) => u._id === f._id)
      );
    });

    setSearchedUsername(sortUsername);
  };

  const handleSelectedUser = (friendSelected: Friend) => {
    if (searchedUsername.length === 0) return;
    if (!inputRef.current) return;

    setSelectedUserList((prev) => [...prev, friendSelected]);
    setSearch("");
    inputRef.current.focus();

    const updatedFriends = searchedUsername.filter((f) => f !== friendSelected);
    setSearchedUsername(updatedFriends);
  };

  const handleDeleteMember = (id: string) => {
    const updatedSelected = selectedUserList.filter((u) => u._id !== id);

    setSelectedUserList(updatedSelected);
  };

  const handleClearState = () => {
    setSearch("");
    setNameGroup("");
    setIsLoading(false);
    setSearchedUsername([]);
    setSelectedUserList([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (selectedUserList.length === 0) return;

    const memberIds = selectedUserList.map((u) => u._id);

    if (!user || memberIds.length < 2) {
      setIsLoading(false)
      toast.error('Phải có ít nhất 3 thành viên mới được tạo nhóm')
      return;
    }

    try {
      await createConversation("group", nameGroup, [...memberIds]);

      setOpen(false);
      handleClearState();
    } catch (error) {
      console.log("newGroupDialog_handleSubmit", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          {/* HEADER */}
          <DialogHeader>
            <DialogTitle>Tạo nhóm chat mới</DialogTitle>
          </DialogHeader>

          {/* INPUT */}
          <FieldGroup className="mt-3">
            <Field>
              <Label htmlFor="name-group">Tên nhóm</Label>
              <Input
                value={nameGroup}
                onChange={(e) => setNameGroup(e.target.value)}
                id="name-group"
                placeholder="Gõ tên nhóm vào đây"
                className="focus:outline-purple-500"
              />
            </Field>
            <Field>
              <Label htmlFor="invite-members">Mời thành viên</Label>
              <Input
                ref={inputRef}
                value={search}
                onChange={handleSearchByUsername}
                id="invite-members"
                placeholder="Gõ tên thành viên"
              />
            </Field>
          </FieldGroup>

          {/* FRIEND CARD */}
          <InviteSuggestionList
            searchedUsername={searchedUsername}
            handleSelectedUser={handleSelectedUser}
          />

          {/* MEMBER BADGE */}
          <MemberBadge
            selectedUserList={selectedUserList}
            onDelete={handleDeleteMember}
          />

          {/* FOOTER */}
          <DialogFooter className="w-full">
            <Button
              disabled={selectedUserList.length === 0}
              type="submit"
              className="w-full flex gap-2 justify-center items-center cursor-pointer bg-linear-to-r from-pink-500/50 to-purple-500/50"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus />
                  Tạo nhóm chat
                </div>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupDialog;
