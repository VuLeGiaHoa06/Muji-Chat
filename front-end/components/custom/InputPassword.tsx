import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputPasswordProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ className, placeholder, containerClassName, ...props }, ref) => {
    const [togglePassword, setTogglePassword] = React.useState(false);

    return (
      <div
        className={cn("relative flex items-center w-full", containerClassName)}
      >
        <input
          ref={ref}
          type={togglePassword ? "text" : "password"}
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent pl-3 pr-10 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
          placeholder={placeholder}
          {...props}
        />

        <button
          type="button"
          className="absolute right-3.5 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors cursor-pointer focus:outline-hidden"
          onClick={() => setTogglePassword((prev) => !prev)}
        >
          {togglePassword ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
      </div>
    );
  },
);

InputPassword.displayName = "InputPassword";

export default InputPassword;
