import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const Logout = () => {
  // global state
  const { signOut } = useAuthStore();

  // local state
  const router = useRouter();

  // handles
  const handleLogout = async () => {
    try {
      await signOut();

      router.push("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  // render
  return (
    <button
      type="button"
      className="flex gap-3 text-red-500 items-center cursor-pointer w-full"
      onClick={handleLogout}
    >
      <LogOut color="red" />
      <p>Logout</p>
    </button>
  );
};

export default Logout;
