import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UserPlus2 } from "lucide-react";

import ValidationForm from "./ValidationForm";

const DialogUserAdd = ({ childRender }: { childRender: Function }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-primary text-white gap-2">
          <UserPlus2 size={"22"}></UserPlus2>
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Add User Form</DialogTitle>
          <DialogDescription>
            Enter information user to add user
          </DialogDescription>
        </DialogHeader>
        <ValidationForm childRender={childRender}></ValidationForm>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUserAdd;
