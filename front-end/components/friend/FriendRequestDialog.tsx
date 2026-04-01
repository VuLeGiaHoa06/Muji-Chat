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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReceivedRequest from "./ReceivedRequest";
import SentRequest from "./SentRequest";
import { useFriendStore } from "@/stores/useFriendStore";
import { memo } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

const FriendRequestDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { getAllFriendRequest } = useFriendStore();

  const [tab, setTab] = useState("received");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAllFriendRequest();
      } catch (error) {
        console.log("FriendRequestDiaglo_fetchData", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-[20px]">Lời mời kết bạn</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="w-full space-y-2">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="received" className="cursor-pointer">
              Đã nhận
            </TabsTrigger>
            <TabsTrigger value="sent" className="cursor-pointer">
              Đã gửi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received">
            {/* received */}
            <ReceivedRequest onClose={setOpen} />
          </TabsContent>
          <TabsContent value="sent">
            {/* sent */}
            <SentRequest />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default memo(FriendRequestDialog);
