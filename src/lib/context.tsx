import { ActiveYn, User } from "@/components/TableUser";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface IUserContext {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  activeYn: ActiveYn | string;
  setActiveYn: React.Dispatch<React.SetStateAction<ActiveYn | string>>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState<string>("");
  const [activeYn, setActiveYn] = useState<ActiveYn | string>("");

  return (
    <UserContext.Provider
      value={{ users, setUsers, role, setRole, activeYn, setActiveYn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must br use in UserProvider");
  }
  return context;
};
