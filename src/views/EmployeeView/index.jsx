import { REVIEW } from "@/api/endpoint";
import { get_default_api } from "@/api/service";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CircleUser } from "lucide-react";
import { Loader, Package2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import useSWR from "swr";

export default function Employeeview() {
  const param = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { data, error, isLoading } = useSWR(
    REVIEW + `?reviewer_id=${param.id}`,
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

  if (data.data.length === 0) {
    return (
      <div className="grid place-items-center mx-auto my-auto">
        <i className="text-center">No Review Found</i>
      </div>
    );
  }

  const reviews = data.data;
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Employee View</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {reviews.map((item) => (
                <Link
                  key={item._id}
                  to={`submit-feedback/${item._id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname.includes(`submit-feedback/${item._id}`)
                      ? "bg-muted text-primary"
                      : ""
                  )}
                >
                  <User className="h-4 w-4" />
                  {item?.assignee?.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="w-full flex-1"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
