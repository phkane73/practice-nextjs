import { useUserContext } from "@/lib/context";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";

const TableUser = () => {
  const { users } = useUserContext();

  return <>{<DataTable columns={columns} data={users} />}</>;
};

export default TableUser;
