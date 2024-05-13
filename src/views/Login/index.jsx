import { EMPLOYEE } from "@/api/endpoint";
import { get_default_api } from "@/api/service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import useSWR from "swr";

const Login = () => {
  const { data, isLoading } = useSWR(EMPLOYEE, get_default_api);
  return (
    <div className="grid place-items-center h-svh">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {isLoading ? (
            <Loader className="animate-spin" />
          ) : (
            <div>
              <Link
                to={`admin`}
                className="flex items-center gap-x-4 py-2 px-4 rounded-lg hover:bg-muted"
              >
                <Avatar>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <p>Admin View</p>
              </Link>
              {data?.data?.map((item) => (
                <Link
                  to={`employee-view/${item._id}`}
                  key={item._id}
                  className="flex items-center gap-x-4 py-2 px-4 rounded-lg hover:bg-muted"
                >
                  <Avatar>
                    <AvatarImage src={item.profile} />
                    <AvatarFallback>
                      {item.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>{item.name}</p>
                </Link>
              ))}
            </div>
          )}
        </CardHeader>
      </Card>
    </div>
  );
};
export default Login;
