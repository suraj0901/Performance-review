/* eslint-disable react/prop-types */
import { EMPLOYEE } from "@/api/endpoint";
import { delete_default_api } from "@/api/service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

function DeleteEmployee({ id, children }) {
  const { mutate } = useSWRConfig();
  const { isMutating, trigger } = useSWRMutation(
    EMPLOYEE + `/${id}`,
    delete_default_api,
    {
      onSuccess(data) {
        toast.success(data.statusText);
        mutate(EMPLOYEE);
      },
      onError(error) {
        toast.error(error.toString());
      },
    }
  );

  async function onSubmit() {
    await trigger(id);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete employee
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>
            {isMutating ? <Loader className="animate-spin mr-1" /> : null}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteEmployee;
