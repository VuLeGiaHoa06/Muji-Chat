"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Loader2,
  Users,
  Search,
  MessageSquareText,
  UserPlus,
  Info,
} from "lucide-react";

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
      setIsLoading(false);
      toast.error(
        "Phải có ít nhất 3 thành viên mới được tạo nhóm (bao gồm cả bạn)",
      );
      return;
    }

    try {
      await createConversation("group", nameGroup, [...memberIds]);

      setOpen(false);
      handleClearState();
      toast.success("Tạo nhóm chat thành công!");
    } catch (error) {
      console.log("newGroupDialog_handleSubmit", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-none bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-2xl rounded-3xl p-6 overflow-hidden max-h-[90vh] flex flex-col transition-all duration-300">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-full space-y-5"
        >
          {/* HEADER */}
          <DialogHeader className="flex flex-row items-center gap-3 space-y-0 border-b border-zinc-100 dark:border-zinc-900 pb-4">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-500/10"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              }}
            >
              <Users size={20} className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <DialogTitle className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Tạo nhóm chat mới
              </DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 dark:text-zinc-500">
                Kết nối mọi người lại với nhau dễ dàng
              </DialogDescription>
            </div>
          </DialogHeader>

          {/* INPUT FORM FIELDS */}
          <FieldGroup className="space-y-4">
            <Field className="flex flex-col gap-1.5">
              <Label
                htmlFor="name-group"
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                Tên nhóm
              </Label>
              <div className="relative flex items-center">
                <MessageSquareText
                  size={16}
                  className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                />
                <Input
                  value={nameGroup}
                  onChange={(e) => setNameGroup(e.target.value)}
                  id="name-group"
                  placeholder="Đặt một cái tên thật ngầu..."
                  required
                  className="pl-10 h-11 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all"
                />
              </div>
            </Field>

            <Field className="flex flex-col gap-1.5">
              <Label
                htmlFor="invite-members"
                className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
              >
                Mời thành viên
              </Label>
              <div className="relative flex items-center">
                <Search
                  size={16}
                  className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none"
                />
                <Input
                  ref={inputRef}
                  value={search}
                  onChange={handleSearchByUsername}
                  id="invite-members"
                  placeholder="Nhập tên của bạn bè..."
                  className="pl-10 h-11 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all"
                />
              </div>
            </Field>
          </FieldGroup>

          {/* SCROLLABLE CONTENT FOR LISTS */}
          <div className="flex-1 overflow-y-auto max-h-[280px] pr-1 -mr-2 space-y-3 custom-scrollbar">
            {/* MEMBER BADGE (SELECTED MEMBERS) */}
            <MemberBadge
              selectedUserList={selectedUserList}
              onDelete={handleDeleteMember}
            />

            {/* SUGGESTION LIST */}
            {(selectedUserList.length < 2 || searchedUsername.length > 0) && (
              <InviteSuggestionList
                searchedUsername={searchedUsername}
                handleSelectedUser={handleSelectedUser}
              />
            )}
          </div>

          {/* EXPLANATION INFO */}
          {selectedUserList.length > 0 && selectedUserList.length < 2 && (
            <div className="flex items-start gap-2 p-3 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 rounded-2xl text-amber-600 dark:text-amber-400 text-xs">
              <Info size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                Cần thêm ít nhất <strong>{2 - selectedUserList.length}</strong>{" "}
                thành viên nữa để có thể tạo nhóm chat (tổng cộng tối thiểu 3
                người bao gồm bạn).
              </span>
            </div>
          )}

          {/* FOOTER */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex flex-col gap-2">
            <Button
              disabled={selectedUserList.length === 0 || isLoading}
              type="submit"
              className="w-full h-11 flex gap-2 justify-center items-center cursor-pointer rounded-2xl font-semibold text-white transition-all duration-300 shadow-lg"
              style={{
                background:
                  selectedUserList.length === 0
                    ? "var(--color-muted, #71717a)"
                    : "linear-gradient(135deg, #7c3aed, #ec4899)",
                opacity: selectedUserList.length === 0 ? 0.4 : 1,
                boxShadow:
                  selectedUserList.length === 0
                    ? "none"
                    : "0 4px 15px rgba(124, 58, 237, 0.3)",
              }}
              onMouseEnter={(e) => {
                if (selectedUserList.length > 0) {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(124, 58, 237, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (selectedUserList.length > 0) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(124, 58, 237, 0.3)";
                }
              }}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus size={18} />
                  <span>Tạo nhóm chat</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupDialog;
