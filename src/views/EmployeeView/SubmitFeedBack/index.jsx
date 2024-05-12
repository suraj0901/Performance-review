/* eslint-disable react/prop-types */
import { FEEDBACK, REVIEW } from "@/api/endpoint";
import { get_default_api, put_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2, Loader, XIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { FeedbackForm } from "./FeedbackForm";

const SubmitFeedBack = () => {
  const { review_id, id: reviewer_id } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    REVIEW + `/${review_id}`,
    get_default_api
  );

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

  const assignee = data?.data?.assignee;
  const reviewers = data?.data?.reviewers;
  const questions = data?.data.questions;
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="w-full flex flex-col gap-4">
          {questions.map((item, index) => (
            <Card key={item._id}>
              <CardHeader>
                <div className="flex items-center gap-x-4">
                  <span className="">{index + 1}</span>
                  <p className="font-semibold">{item.title}</p>
                </div>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium">Feedbacks</h4>
                {item.feedbacks.length === 0 ? (
                  <i className="text-sm">No feedback yet</i>
                ) : null}
                {item?.feedbacks?.map((item) => (
                  <UpdateFeedback
                    reviewer_id={reviewer_id}
                    mutate={mutate}
                    key={item._id}
                    item={item}
                  />
                ))}
                {item.feedbacks.some(
                  (feedback) => feedback.reviewer._id === reviewer_id
                ) ? (
                  <></>
                ) : (
                  <FeedbackForm mutate={mutate} question_id={item._id} />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="max-w-md w-full flex flex-col gap-y-2">
          <Card>
            <CardHeader>
              <h1 className="font-semibold mb-2">Assignee</h1>
              <div className="flex items-center gap-x-2 ">
                <Avatar>
                  <AvatarImage src={assignee.profile} />
                  <AvatarFallback>
                    {assignee.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p>{assignee.name}</p>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <h1 className="font-semibold mb-2">Reviewers</h1>
              {reviewers.map((reviewer) => (
                <div
                  key={reviewer._id}
                  className="flex items-center gap-x-2 mb-2 py-1"
                >
                  <Avatar>
                    <AvatarImage src={reviewer.profile} />
                    <AvatarFallback>
                      {reviewer.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>{reviewer.name}</p>
                </div>
              ))}
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SubmitFeedBack;

function UpdateFeedback({ item, mutate, reviewer_id }) {
  const [edit, setEdit] = useState(false);
  const { handleChange, isMutating, title, trigger } = useUpdateFeedback({
    item,
    onSuccess() {
      mutate();
      setEdit(false);
    },
  });
  function handleUpdate() {
    trigger({
      title,
    });
  }

  const editIcon =
    item.reviewer._id === reviewer_id ? (
      <Button onClick={() => setEdit(true)} variant="ghost" size="icon">
        <Edit2 size={16} />
      </Button>
    ) : null;
  return (
    <Spinner loading={isMutating}>
      <div className="border p-2 rounded my-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-x-2 ">
            <Avatar className="h-6 w-6">
              <AvatarImage src={item.reviewer.profile} />
              <AvatarFallback>
                {item.reviewer.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm">{item.reviewer.name}</p>
          </div>
          {edit ? (
            <div className="flex items-center gap-x-1">
              <Button onClick={handleUpdate} size="icon" variant="ghost">
                <Check size={18} />
              </Button>
              <Button
                onClick={() => setEdit(false)}
                size="icon"
                variant="ghost"
              >
                <XIcon size={18} />
              </Button>
            </div>
          ) : (
            editIcon
          )}
        </div>
        {edit ? (
          <Textarea value={title} onChange={handleChange} />
        ) : (
          <p className="mt-1">{item.title}</p>
        )}
      </div>
    </Spinner>
  );
}

function useUpdateFeedback({ item, onSuccess }) {
  const [title, setTitle] = useState(item.title);
  const { isMutating, trigger } = useSWRMutation(
    FEEDBACK + `/${item._id}`,
    put_default_api,
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

  function handleChange(e) {
    setTitle(e.target.value);
  }

  return { title, isMutating, handleChange, trigger };
}
