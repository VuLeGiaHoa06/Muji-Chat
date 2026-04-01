import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardAccount from "./CardAccount";
import ConfigPage from "./ConfigPage";
import SecurityPage from "./SecurityPage";

const TabTrigger = () => {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="w-full">
        {/* TAB TRIGGER */}
        <TabsTrigger value="account" className="cursor-pointer">
          Tài khoản
        </TabsTrigger>
        <TabsTrigger value="config" className="cursor-pointer">
          Cấu hình
        </TabsTrigger>
        <TabsTrigger value="security" className="cursor-pointer">
          Bảo mật
        </TabsTrigger>
      </TabsList>

      {/* TAB CONTENT */}
      <TabsContent value="account">
        <CardAccount />
      </TabsContent>

      <TabsContent value="config">
        <ConfigPage />
      </TabsContent>

      <TabsContent value="security">
        <SecurityPage />
      </TabsContent>
    </Tabs>
  );
};

export default TabTrigger;
