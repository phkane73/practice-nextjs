import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserContext } from "@/lib/context";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, CircleCheck, CircleX, Trash } from "lucide-react";
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

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "projects",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Projects
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const projects: [] = row.getValue("projects");
      return (
        <div>
          {projects?.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "activeYn",
    header: "Active",
    cell: ({ row }) => {
      const user = row.original;
      if (user.activeYn === ActiveYn.Y) {
        return <CircleCheck className="text-green-500" />;
      } else {
        return <CircleX className="text-red-500" />;
      }
    },
  },
  {
    id: "action",
    header: () => {
      return <div className="text-center">Actions</div>;
    },
    cell: ({ row }) => {
      const user = row.original;
      const { users, setUsers } = useUserContext();
      const deleteUser = async (username: string) => {
        const res = await axios.delete(
          process.env.NEXT_PUBLIC_SERVER_URL! + `/user/delete/${username}`
        );
        if (res) {
          toast.success("Delete user success!!!");
          setUsers(users.filter((u) => u.username !== username));
        }
      };
      return (
        <div className="flex gap-3 justify-center">
          <SheetEditUser user={user}></SheetEditUser>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="hover:bg-red-300">
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
      );
    },
  },
];
