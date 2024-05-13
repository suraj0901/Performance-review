import { REVIEW } from "@/api/endpoint";
import { get_default_api } from "@/api/service";
import { DataTable } from "@/components/ui/data-table";
import { Loader } from "lucide-react";
import useSWR from "swr";
import { review_column } from "./column";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function PerformanceReview() {
  const { data, error, isLoading } = useSWR(REVIEW, get_default_api);

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
        <i className="text-center">No Review Found</i>
      </div>
    );
  }

  const reviews = data?.data?.map((item, index) => ({
    ...item,
    srNo: index + 1,
  }));
  console.log(reviews);
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link to={"add"}>
          <Button>
            <PlusCircle size={20} className="mr-2" /> Add Performance Review
          </Button>
        </Link>
      </div>
      <DataTable columns={review_column} data={reviews} />
    </div>
  );
}
