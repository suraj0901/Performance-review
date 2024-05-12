/* eslint-disable react/prop-types */
import { FEEDBACK } from "@/api/endpoint";
import { post_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export function FeedbackForm({ question_id, mutate }) {
  const [state, setState] = useState(false);
  const { id: reviewer_id } = useParams();
  const { isMutating, handleChange, trigger, title } = useAddFeedback({
    question_id,
    onSuccess() {
      mutate();
      setState(false);
    },
  });

  if (!state)
    return (
      <div>
        <Button size="sm" onClick={() => setState(true)}>
          Add Feedback
        </Button>
      </div>
    );

  function handleSubmit() {
    trigger({
      title,
      reviewer: reviewer_id,
    });
  }
  return (
    <Spinner loading={isMutating}>
      <div className="space-y-2">
        <Textarea value={title} onChange={handleChange} />
        <div className="flex items-center gap-x-2">
          <Button size="sm" onClick={() => setState(false)} variant="outline">
            <XCircleIcon size={20} className="mr-1" /> Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm">
            <CheckCircle size={20} className="mr-1" /> Submit
          </Button>
        </div>
      </div>
    </Spinner>
  );
}
function useAddFeedback({ question_id, onSuccess }) {
  const [title, setTitle] = useState("");
  const { isMutating, trigger } = useSWRMutation(
    FEEDBACK + `/${question_id}`,
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

  function handleChange(e) {
    setTitle(e.target.value);
  }

  return { title, isMutating, handleChange, trigger };
}
