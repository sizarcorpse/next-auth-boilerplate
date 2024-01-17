import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UserSettingsLayout({
  account,
  profile,
}: {
  children: React.ReactNode;
  account: React.ReactNode;
  profile: React.ReactNode;
}) {
  return (
    <main className="container max-w-screen-md px-2">
      <Tabs defaultValue="profile" orientation="vertical">
        <TabsList className="bg-primary/5 p-1 h-auto mb-6">
          <TabsTrigger value="profile" className="h-10 px-10">
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="h-10 px-10">
            Account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>{profile}</div>
        </TabsContent>
        <TabsContent value="account">
          <div>{account}</div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
