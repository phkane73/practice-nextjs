import { useState } from "react";
import DialogUserAdd from "./DialogAddUser";
import SearchUser from "./SearchUser";

export const ToolBar = () => {
  const [render, setRender] = useState(false);

  const childRender = () => {
    setRender(!render);
  };

  return (
    <div className="w-full gap-2">
      <DialogUserAdd childRender={childRender}></DialogUserAdd>
      <SearchUser render={render}></SearchUser>
    </div>
  );
};
