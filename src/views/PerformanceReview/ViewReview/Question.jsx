import { QUESTION } from "@/api/endpoint";
import { delete_default_api, put_default_api } from "@/api/service";
import Spinner from "@/components/Spinner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit2Icon, Trash, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export function Question({ item, index, mutate, review_id }) {
  const [edit, setEdit] = useState(false);
  const {
    title,
    handleQuestionChange,
    updateQuestion,
    isMutating: update_question_loader,
  } = useUpdateQuestion({
    item,
    onSuccess() {
      mutate();
      setEdit(false);
    },
  });
  const { delete_question_loader, handleDelete } = useDeleteQuestion({
    review_id,
    item,
    onSuccess() {
      mutate();
    },
  });

  return (
    <Spinner loading={update_question_loader || delete_question_loader}>
      <Card>
        <CardHeader>
          <div className="flex justify-end gap-x-1">
            {edit ? (
              <>
                <Button onClick={updateQuestion} size="icon" variant="ghost">
                  <Check size={18} />
                </Button>
                <Button
                  onClick={() => setEdit(false)}
                  size="icon"
                  variant="ghost"
                >
                  <XIcon size={18} />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setEdit(true)}
                  size="icon"
                  variant="ghost"
                >
                  <Edit2Icon size={18} />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Trash size={18} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete question.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <span className="">{index + 1}</span>
            {edit ? (
              <Textarea value={title} onChange={handleQuestionChange} />
            ) : (
              <p className="font-semibold">{item.title}</p>
            )}
          </div>
        </CardHeader>
      </Card>
    </Spinner>
  );
}
function useDeleteQuestion({ review_id, item, onSuccess }) {
  const { trigger, isMutating } = useSWRMutation(
    QUESTION + `/${item._id}/${review_id}`,
    delete_default_api,
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

  async function handleDelete() {
    await trigger({});
  }
  return { delete_question_loader: isMutating, handleDelete };
}
function useUpdateQuestion({ item, onSuccess }) {
  const [title, setQuestion] = useState(item.title);
  const { trigger, isMutating } = useSWRMutation(QUESTION, put_default_api, {
    onSuccess(data) {
      toast.success(data.statusText);
      onSuccess();
    },
    onError(error) {
      toast.error(error.toString());
    },
  });

  async function updateQuestion() {
    await trigger({ _id: item._id, title });
  }

  function handleQuestionChange(e) {
    console.log(e, e.target.value);
    setQuestion(e.target.value);
  }

  return { title, updateQuestion, handleQuestionChange, isMutating };
}
