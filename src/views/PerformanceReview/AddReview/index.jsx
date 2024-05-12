/* eslint-disable react/prop-types */
import { EMPLOYEE, REVIEW } from "@/api/endpoint";
import { get_default_api, post_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Question } from "./Question";
import { SelectAssignee } from "./SelectAssignee";
import { SelectReviewers } from "./SelectReviewers";
import { ChevronLeft } from "lucide-react";

const AddReview = () => {
  const { data: employee_list } = useEmployee();
  const form = useForm({
    defaultValues: {
      reviewers: [],
    },
  });
  const { isMutating, trigger } = useAddReview();
  function onSubmit(data) {
    data.reviewers = data.reviewers.map((item) => item._id);
    trigger(data);
  }
  return (
    <Spinner loading={isMutating}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2">
          <div className="flex justify-between ">
            <div className="flex items-center gap-x-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                type="button"
                onClick={() => window.history.back()}
              >
                <ChevronLeft size={20} className="mr-1" />
              </Button>
              <h1 className="font-medium text-lg">Add Performance Review</h1>
            </div>
            <Button type="submit" className="flex items-center">
              <CheckCircle size={20} className="mr-2" />
              Save
            </Button>
          </div>
          <div className="flex gap-x-4">
            <div className="w-full">
              <Question name="questions" form={form} />
            </div>
            <Card className="max-w-md w-full">
              <CardContent className="grid gap-y-4 mt-4">
                <SelectAssignee
                  name={"assignee"}
                  form={form}
                  list={employee_list}
                />
                <SelectReviewers
                  name="reviewers"
                  form={form}
                  list={employee_list}
                />
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </Spinner>
  );
};
export default AddReview;

function useEmployee() {
  const { data, ...rest } = useSWR(EMPLOYEE, get_default_api, {
    onError(error) {
      toast.error(error.toString());
    },
  });

  return { data: data?.data ?? [], ...rest };
}

function useAddReview() {
  const { trigger, isMutating } = useSWRMutation(REVIEW, post_default_api, {
    onError(error) {
      toast.error(error.toString());
    },
    onSuccess(data) {
      toast.success(data.statusText);
      window.history.back();
    },
  });
  return { isMutating, trigger };
}
