import DialogUserAdd from "./DialogAddUser";
import SearchUser from "./SearchUser";

export const ToolBar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <DialogUserAdd />
      <SearchUser />
    </div>
  );
};
