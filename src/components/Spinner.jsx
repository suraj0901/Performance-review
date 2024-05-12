/* eslint-disable react/prop-types */
import { Loader } from "lucide-react";

function Spinner({ loading, children }) {
  return (
    <div className="relative">
      {loading ? (
        <div className="absolute inset-0 bg-primary-foreground/30 grid place-items-center">
          <Loader className="animate-spin" />
        </div>
      ) : null}
      {children}
    </div>
  );
}
export default Spinner;
