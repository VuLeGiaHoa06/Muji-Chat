import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { CardInfo, TabContent, TabTrigger } from "@/components/profile/";
import { useAuthStore } from "@/stores/useAuthStore";

const ProfileDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { user } = useAuthStore();
  if (!user) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* HEADER */}
        <DialogHeader>
          <DialogTitle>Profile & Settings</DialogTitle>
        </DialogHeader>

        {/* CARD INFO */}
        <CardInfo user={user} />

        {/* TAB TRIGGER */}
        <TabTrigger />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
