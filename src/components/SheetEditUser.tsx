import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "./TableUser";
import ValidationForm from "./ValidationForm";

const SheetEditUser = ({ user }: { user: User }) => {
  return (
    <Sheet key="right">
      <SheetTrigger asChild>
        <Button variant="secondary" className="hover:bg-primary/20">
          <Pencil className="text-primary" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle className="uppercase text-primary">Edit user</SheetTitle>
          <SheetDescription>
            You can edit information user-selected.
          </SheetDescription>
        </SheetHeader>
        <ValidationForm user={user}></ValidationForm>
      </SheetContent>
    </Sheet>
  );
};

export default SheetEditUser;
