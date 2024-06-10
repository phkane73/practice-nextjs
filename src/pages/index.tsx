import { User } from "@/components/Columns";
import TableUser from "@/components/TableUser";
import { ToolBar } from "@/components/ToolBar";
import { UserProvider } from "@/lib/context";
import axios from "axios";

export default function Home({ data }: Readonly<{ data: User[] }>) {
  return (
    <UserProvider initData={data}>
      <h1 className="text-center font-bold text-2xl text-primary uppercase">
        User Management
      </h1>
      <ToolBar></ToolBar>
      <div className="mt-2">
        <TableUser></TableUser>
      </div>
    </UserProvider>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_URL! + "/user/search"
    );
    const data = res.data;
    return { props: { data } };
  } catch (error) {
    console.error(error);
  }
  return { props: { data: [] } };
}
