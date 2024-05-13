import { EMPLOYEE } from "@/api/endpoint";
import { get_default_api } from "@/api/service";
import { DataTable } from "@/components/ui/data-table";
import { Loader } from "lucide-react";
import useSWR from "swr";
import AddEmployee from "./AddEmployee.jsx";
import EditEmployee from "./EditEmployee.jsx";
import { employee_columns } from "./column.jsx";

export default function Employee() {
  const { data, isLoading, error } = useSWR(EMPLOYEE, get_default_api);

  if (error) {
    return (
      <div className="grid place-items-center mx-auto my-auto">
        <p>{error?.toString()}</p>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="grid place-items-center mx-auto my-auto">
        <Loader className="animate-spin" />
      </div>
    );

  if (data.data.length === 0) {
    return (
      <div className="grid place-items-center mx-auto my-auto">
        <i className="text-center">No Employee Found</i>
      </div>
    );
  }

  const employee = data?.data?.map((item, index) => ({
    ...item,
    srNo: index + 1,
  }));

  return (
    <>
      <div className="flex justify-end">
        <AddEmployee />
      </div>
      <DataTable columns={employee_columns} data={employee} />
      <EditEmployee />
    </>
  );
}
