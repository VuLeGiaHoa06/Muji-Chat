import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardAccount from "./CardAccount";
import ConfigPage from "./ConfigPage";
import SecurityPage from "./SecurityPage";

const TabTrigger = () => {
  return (
    <Tabs defaultValue="account" className="w-full space-y-4">
      <TabsList className="w-full grid grid-cols-3 bg-zinc-500/5 dark:bg-zinc-900/30 p-1.5 rounded-2xl border border-zinc-100/80 dark:border-zinc-900/60 h-12">
        {/* TAB TRIGGER */}
        <TabsTrigger
          value="account"
          className="cursor-pointer rounded-xl font-semibold text-xs transition-all h-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800/80 dark:data-[state=active]:text-violet-400 data-[state=active]:text-violet-600 data-[state=active]:shadow-md data-[state=active]:shadow-violet-500/5"
        >
          Tài khoản
        </TabsTrigger>
        <TabsTrigger
          value="config"
          className="cursor-pointer rounded-xl font-semibold text-xs transition-all h-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800/80 dark:data-[state=active]:text-violet-400 data-[state=active]:text-violet-600 data-[state=active]:shadow-md data-[state=active]:shadow-violet-500/5"
        >
          Cấu hình
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="cursor-pointer rounded-xl font-semibold text-xs transition-all h-full data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800/80 dark:data-[state=active]:text-violet-400 data-[state=active]:text-violet-600 data-[state=active]:shadow-md data-[state=active]:shadow-violet-500/5"
        >
          Bảo mật
        </TabsTrigger>
      </TabsList>

      {/* TAB CONTENT */}
      <TabsContent value="account" className="mt-0 outline-hidden">
        <CardAccount />
      </TabsContent>

      <TabsContent value="config" className="mt-0 outline-hidden">
        <ConfigPage />
      </TabsContent>

      <TabsContent value="security" className="mt-0 outline-hidden">
        <SecurityPage />
      </TabsContent>
    </Tabs>
  );
};

export default TabTrigger;
