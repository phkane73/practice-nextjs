import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { CircleCheck, CircleX, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SheetEditUser from "./SheetEditUser";
import { Button } from "./ui/button";

export enum ActiveYn {
  Y = "Y",
  N = "N",
}

export interface User {
  username: string;
  fullname: string;
  role: string;
  projects: string | string[];
  activeYn: ActiveYn;
}

interface ITableProps {
  render: boolean;
  listUser: User[];
}

const TableUser: React.FC<ITableProps> = ({ render, listUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [tableR, setTableR] = useState(false);
  const childRender = () => {
    setTableR(!tableR);
  };

  const deleteUser = async (username: string) => {
    const res = await axios.delete(
      process.env.NEXT_PUBLIC_SERVER_URL! + `/user/delete/${username}`
    );
    if (res) {
      toast.success("Delete user success!!!");
    }
    setIsDeleted(!isDeleted);
  };

  useEffect(() => {
    setUsers(listUser);
    setIsClient(true);
  }, [isDeleted, listUser, render, tableR]);

  return (
    <>
      {isClient && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[350px]">Full Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Projects</TableHead>
              <TableHead>Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.length > 0 &&
              users.map((user: User) => (
                <TableRow key={user.username}>
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    {Array.isArray(user.projects)
                      ? user.projects?.map((p, index) => (
                          <li key={index}>{p}</li>
                        ))
                      : user.projects}
                  </TableCell>
                  <TableCell>
                    {user.activeYn === "Y" ? (
                      <CircleCheck className="text-green-500" />
                    ) : (
                      <CircleX className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 float-end">
                      <SheetEditUser
                        user={user}
                        childRender={childRender}
                      ></SheetEditUser>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            className="hover:bg-red-300"
                          >
                            <Trash className="text-red-700" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Delete User</DialogTitle>
                            <DialogDescription>
                              You sure delete the selected user.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => deleteUser(user.username)}
                              className="bg-red-700 hover:bg-red-500"
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TableUser;
