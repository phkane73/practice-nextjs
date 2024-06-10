import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserContext } from "@/lib/context";
import axios from "axios";
import { SquareX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ActiveYn } from "./Columns";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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

const SearchUser = () => {
  const [value, setValue] = useState("");
  const { role, setRole, setUsers, activeYn, setActiveYn } = useUserContext();
  const searchUsers = useCallback(
    debounce(
      async (searchValue?: string, role?: string, activeYn?: ActiveYn) => {
        try {
          const res = await axios.get(
            process.env.NEXT_PUBLIC_SERVER_URL! + "/user/search",
            {
              params: {
                searchKeyWord: searchValue,
                role: role,
                activeYn: activeYn ?? "",
              },
            }
          );
          if (res) {
            setUsers(res.data);
          }
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },
      300
    ),
    []
  );

  function handleOnRemoveFilter() {
    setRole("");
    setActiveYn("");
    setValue("");
  }

  useEffect(() => {
    searchUsers(value, role, activeYn);
  }, [value, role, activeYn, searchUsers]);

  return (
    <div className="flex items-center space-x-2 gap-10">
      <Select onValueChange={(value) => setRole(value)} value={role}>
        <SelectTrigger className="w-[350px]">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Developer">Developer</SelectItem>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Manager">Manager</SelectItem>
        </SelectContent>
      </Select>
      <RadioGroup
        value={activeYn}
        onValueChange={(value) => setActiveYn(value)}
      >
        <div className="flex items-center space-x-2">
          <Label>Active</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={ActiveYn.Y} id="activeY" />
          <Label htmlFor="activeY">Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value={ActiveYn.N} id="activeN" />
          <Label htmlFor="activeN">No</Label>
        </div>
      </RadioGroup>
      <Input
        type="text"
        value={value}
        placeholder="Enter Full Name, Username or Projects to search!"
        onChange={(e) => setValue(e.target.value)}
      />
      <Button className="gap-2 bg-primary" onClick={handleOnRemoveFilter}>
        <SquareX />
        Remove Filter
      </Button>
    </div>
  );
};

export default SearchUser;
