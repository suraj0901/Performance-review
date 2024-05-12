import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { EditIcon } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteReview from "./DeleteReview";

export const review_column = [
  {
    header: "SRNO",
    accessorKey: "srNo",
  },
  {
    header: "ASSIGNEE",
    accessorKey: "assignee",
    cell: ({ row: { original } }) => {
      console.log({ original });
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
          <Link to={original._id}>
            <Button variant="outline" size="sm">
              <EditIcon size={15} className="mr-1" /> Edit
            </Button>
          </Link>
          <DeleteReview>
            <Button variant="destructive" size="sm">
              <Trash2 size={15} className="mr-1" /> Delete
            </Button>
          </DeleteReview>
        </div>
      );
    },
  },
];
