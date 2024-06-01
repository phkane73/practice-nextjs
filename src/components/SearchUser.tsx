import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import TableUser from "./TableUser";

const SearchUser = ({ render }: { render: boolean }) => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.get(
      process.env.NEXT_PUBLIC_SERVER_URL! + "/user/search",
      {
        params: { username: value === "" ? "all" : value },
      }
    );
    if (res) {
      setUsers(res.data);
    } else {
      setUsers([]);
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex w-full max-w-sm items-center space-x-2 float-end"
      >
        <Input
          type="text"
          value={value}
          placeholder="Enter information user to search!"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button type="submit">
          <Search />
        </Button>
      </form>
      <div className="flex-auto overflow-y-auto mt-10">
        <TableUser render={render} listUser={users}></TableUser>
      </div>
    </>
  );
};

export default SearchUser;
