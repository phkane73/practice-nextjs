import TableUser from "@/components/TableUser";
import { ToolBar } from "@/components/ToolBar";
import { UserProvider } from "@/lib/context";

export default function Home() {
  return (
    <UserProvider>
      <h1 className="text-center font-bold text-2xl text-primary uppercase">
        User Management
      </h1>
      <ToolBar></ToolBar>
      <div className="flex-auto overflow-y-auto mt-10">
        <TableUser></TableUser>
      </div>
    </UserProvider>
  );
}
