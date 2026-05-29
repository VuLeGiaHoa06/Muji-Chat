import React from "react";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./AddFriendModal";
import { Button } from "../ui/button";
import { Search, AlertCircle, Loader2 } from "lucide-react";

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
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="username"
          className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider"
        >
          Tìm kiếm bằng username
        </Label>
        <div className="relative flex items-center">
          <Search
            size={16}
            className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none"
          />
          <Input
            id="username"
            placeholder="Gõ tên username vào đây..."
            {...register("username", {
              required: "Username bắt buộc phải điền vào",
            })}
            className="pl-10 h-11 bg-zinc-500/5 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800/80 rounded-2xl text-sm focus-visible:border-violet-500 focus-visible:ring-violet-500/20 focus-visible:ring-[3px] transition-all"
          />
        </div>

        {/* Error Alert Box */}
        {isFound === false && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 rounded-2xl text-red-600 dark:text-red-400 text-xs animate-fade-in mt-1">
            <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-bold">Không tìm thấy người dùng!</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                Username "@<strong>{searchedUsername}</strong>" không khớp với
                bất kỳ tài khoản nào trên Muji. Vui lòng kiểm tra lại.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* DialogFooter */}
      <DialogFooter className="flex flex-row items-center gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-900 w-full sm:justify-between">
        <DialogClose asChild>
          <Button
            variant="outline"
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-2xl font-semibold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer transition-all"
          >
            Hủy bỏ
          </Button>
        </DialogClose>
        <Button
          disabled={loading || !usernameValue}
          type="submit"
          className="flex-1 h-11 flex gap-2 justify-center items-center rounded-2xl font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none disabled:cursor-not-allowed cursor-pointer bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 disabled:bg-violet-500/20 dark:disabled:bg-violet-500/30 disabled:text-violet-700 dark:disabled:text-violet-300 disabled:border disabled:border-violet-500/20"
          style={{
            boxShadow: usernameValue
              ? "0 4px 15px rgba(124, 58, 237, 0.25)"
              : "none",
          }}
          onMouseEnter={(e) => {
            if (usernameValue && !loading) {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(124, 58, 237, 0.35)";
            }
          }}
          onMouseLeave={(e) => {
            if (usernameValue && !loading) {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(124, 58, 237, 0.25)";
            }
          }}
        >
          {loading ? (
            <div className="flex items-center gap-1.5">
              <Loader2 className="animate-spin" size={16} />
              <span>Đang tìm...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-white">
              <Search size={16} />
              <span>Tìm kiếm</span>
            </div>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SearchForm;
