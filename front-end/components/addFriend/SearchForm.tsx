import React from "react";
import { DialogClose, DialogContent, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { User } from "@/types/user";
import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./AddFriendModal";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

interface ISearchFormProps {
  loading: boolean;
  isFound: boolean | null;
  searchedUsername: string;
  usernameValue: string;
  register: UseFormRegister<IFormValues>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const SearchForm = ({
  loading,
  isFound,
  searchedUsername,
  usernameValue,
  register,
  onSubmit,
  onCancel,
}: ISearchFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-2 mb-5">
        <Label htmlFor="username" className="text-[12px] text-gray-400">
          Tìm kiếm bằng username
        </Label>
        <Input
          id="username"
          placeholder="Gõ tên username vào đây..."
          {...register("username", {
            required: "Username bắt buộc phải điền vào",
          })}
        ></Input>

        {/* Error */}
        {isFound === false && (
          <p>
            Không tìm thấy user:{" "}
            <span className="text-red-700">{searchedUsername}</span>
          </p>
        )}
      </div>

      {/* DialogFooter */}
      <DialogFooter className="flex">
        <DialogClose asChild>
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            className="flex-1 cursor-pointer"
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          disabled={loading || !usernameValue}
          type="submit"
          className="flex-1 bg-linear-to-r from-purple-400 to-pink-400 hover:opacity-90 cursor-pointer "
        >
          {loading ? (
            <p>Đang tìm...</p>
          ) : (
            <>
              <Search size={18}></Search>
              <span>Tìm</span>
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SearchForm;
