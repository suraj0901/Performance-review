/* eslint-disable react/prop-types */
import { REVIEW } from "@/api/endpoint";
import { get_default_api } from "@/api/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { CheckCircle, ChevronLeft, Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Question } from "./Question";
import { AddQuestionForm } from "./AddQuestionForm";

const ViewReview = () => {
  const { id } = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    REVIEW + `/${id}`,
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
  return (
    <div>
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
          <h1 className="font-medium text-lg">Edit Performance Review</h1>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-full flex flex-col gap-4">
          {data.data.questions.map((item, index) => (
            <Question
              key={item._id}
              item={item}
              review_id={data.data._id}
              index={index}
              mutate={mutate}
            />
          ))}
          <AddQuestionForm mutate={mutate} />
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
export default ViewReview;
