import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const review_column = [
  {
    header: "SRNO",
    accessorKey: "srNo",
  },
  {
    header: "ASSIGNEE",
    accessorKey: "assignee",
    cell: ({ row: { original } }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={original?.assignee?.profile} />
            <AvatarFallback>
              {original?.assignee?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{original?.assignee?.name ?? ""}</p>
        </div>
      );
    },
  },
  {
    header: "ACTION",
    accessorKey: "action",
    cell: ({ row: { original } }) => {
      return (
        <div className="flex gap-x-2">
          <Link to={`/employee-view/submit-feedback/${original._id}`}>
            <Button variant="outline" size="sm">
              <EditIcon size={15} className="mr-1" /> Submit Feedback
            </Button>
          </Link>
        </div>
      );
    },
  },
];
