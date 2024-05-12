import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { EditIcon, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import DeleteEmployee from "./DeleteEmployee";

export const employee_columns = [
  {
    header: "SRNO",
    accessorKey: "srNo",
  },
  {
    header: "NAME",
    accessorKey: "name",
    cell: ({ row: { original } }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={original.profile} />
            <AvatarFallback>
              {original.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{original.name}</p>
        </div>
      );
    },
  },
  {
    header: "EMAIL",
    accessorKey: "email",
  },
  {
    header: "GENDER",
    accessorKey: "gender",
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
          <DeleteEmployee>
            <Button variant="destructive" size="sm">
              <Trash2 size={15} className="mr-1" /> Delete
            </Button>
          </DeleteEmployee>
        </div>
      );
    },
  },
];
