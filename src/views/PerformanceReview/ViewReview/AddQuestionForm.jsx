/* eslint-disable react/prop-types */
import { QUESTION } from "@/api/endpoint";
import { post_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CheckCircle } from "lucide-react";
import { useForm, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { Question } from "../AddReview/Question";

export function AddQuestionForm({ mutate }) {
  const form = useForm({
    defaultValues: {
      reviewers: [],
    },
  });
  const { isMutating, trigger } = useAddReview({
    onSuccess() {
      mutate();
    },
  });
  async function onSubmit(data) {
    await trigger(data);
    form.reset({
      questions: [],
    });
  }
  return (
    <Spinner loading={isMutating}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-2">
          <Question name={"questions"} form={form} />
          <SubmitButton />
        </form>
      </Form>
    </Spinner>
  );
}

function SubmitButton() {
  const { getValues } = useFormContext();
  const value = getValues().questions;
  if (!value || value?.length === 0) return <></>;
  return (
    <Button type="submit" className="flex gap-x-2">
      <CheckCircle size={20} />
      Submit
    </Button>
  );
}

function useAddReview({ onSuccess }) {
  const param = useParams();
  const { trigger, isMutating } = useSWRMutation(
    QUESTION + `/${param.id}`,
    post_default_api,
    {
      onSuccess(data) {
        toast.success(data.statusText);
        onSuccess();
      },
      onError(error) {
        toast.error(error.toString());
      },
    }
  );
  return { isMutating, trigger };
}
