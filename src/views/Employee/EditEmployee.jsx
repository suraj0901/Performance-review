import { EMPLOYEE } from "@/api/endpoint";
import { get_default_api, put_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import EmployeeForm from "./EmployeeForm";

function EditEmployee() {
  const param = useParams();
  const { data, isLoading } = useGetEmployeeById(param.id);
  const { isMutating, trigger } = useUpdateEmployee(param.id);

  function onSubmit(data) {
    trigger(data);
  }

  function onClose() {
    window.history.back();
  }

  return (
    <Sheet open={Boolean(param.id)} onOpenChange={onClose}>
      <SheetContent className="!max-w-lg !w-full">
        <SheetHeader>
          <SheetTitle>Edit Employee Detail</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <div className="grid place-items-center h-full">
            <Loader className="animate-spin m-auto" />
          </div>
        ) : null}

        {!data ? (
          <i>No data found</i>
        ) : (
          <Spinner loading={isMutating}>
            <EmployeeForm initialValues={data?.data} onSubmit={onSubmit} />
          </Spinner>
        )}
      </SheetContent>
    </Sheet>
  );
}
export default EditEmployee;

function useUpdateEmployee(id) {
  const { mutate } = useSWRConfig();

  const { isMutating, trigger } = useSWRMutation(
    id ? EMPLOYEE + `/${id}` : null,
    put_default_api,
    {
      onSuccess(data) {
        toast.success(data.statusText);
        window.history.back();
        mutate(EMPLOYEE);
      },
      onError(error) {
        toast.error(error.toString());
      },
    }
  );

  return { isMutating, trigger };
}

function useGetEmployeeById(id) {
  const { isLoading, data } = useSWR(
    id ? EMPLOYEE + `/${id}` : null,
    get_default_api,
    {
      onError(error) {
        toast.error(error.toString());
      },
    }
  );
  return { isLoading, data };
}
