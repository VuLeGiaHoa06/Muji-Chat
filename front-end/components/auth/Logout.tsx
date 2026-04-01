import { useAuthStore } from "@/stores/useAuthStore";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Logout = () => {
  // global state
  const { signOut } = useAuthStore();

  // local state
  const router = useRouter();

  // handles
  const handleLogout = async () => {
    try {
      router.push("/sign-in");

      await signOut();
    } catch (error) {
      console.log("auth_handleLogout", error);
    }
  };

  // render
  return (
    <div
      className="flex gap-3 text-red-500 items-center cursor-pointer w-full"
      onClick={handleLogout}
    >
      <LogOut color="red" />
      <p>Logout</p>
    </div>
  );
};

export default Logout;
