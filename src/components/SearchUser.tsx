import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import TableUser from "./TableUser";

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchUser = ({ render }: { render: boolean }) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);

  const searchUsers = useCallback(
    debounce(async (searchValue: string) => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_SERVER_URL! + "/user/search",
          {
            params: { searchKeyWord: searchValue === "" ? "all" : searchValue },
          }
        );
        if (res) {
          setUsers(res.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchUsers(value);
  }, [value, render, searchUsers]);

  return (
    <>
      <div className="flex w-full max-w-lg items-center space-x-2 float-end">
        <Search className="bg-primary rounded-lg w-[37px] h-[37px] text-white" />
        <Input
          type="text"
          value={value}
          placeholder="Enter Full Name, Username, Projects or Role user to search!"
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="flex-auto overflow-y-auto mt-10">
        <TableUser render={render} listUser={users}></TableUser>
      </div>
    </>
  );
};

export default SearchUser;
