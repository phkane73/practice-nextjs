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
import React from "react";
import ValidationForm, { IValidationFormProps } from "./ValidationForm";

const SheetEditUser: React.FC<IValidationFormProps> = ({
  user,
  childRender,
}) => {
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
        <ValidationForm user={user} childRender={childRender}></ValidationForm>
      </SheetContent>
    </Sheet>
  );
};

export default SheetEditUser;
