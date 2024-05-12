/* eslint-disable react/prop-types */
import { EMPLOYEE } from "@/api/endpoint";
import { post_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import EmployeeForm from "./EmployeeForm";
import { useState } from "react";

function AddEmployee() {
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, isMutating } = useSWRMutation(EMPLOYEE, post_default_api, {
    onSuccess(data) {
      toast.success(data.statusText);
      setIsOpen(false);
    },
    onError(error) {
      toast.error(error.toString());
    },
  });
  function onSubmit(data) {
    trigger(data);
  }

  return (
    <Sheet modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle size={20} className="mr-1" /> Add Employee
        </Button>
      </SheetTrigger>
      <SheetContent className="!max-w-lg !w-full">
        <SheetHeader>
          <SheetTitle>Add Employee Detail</SheetTitle>
        </SheetHeader>
        <Spinner loading={isMutating}>
          <EmployeeForm onSubmit={onSubmit} />
        </Spinner>
      </SheetContent>
    </Sheet>
  );
}
export default AddEmployee;
