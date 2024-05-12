import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./views/App";
import Employee from "./views/Employee";
import ErrorPage from "./views/ErrorPage.jsx";
import PerformanceReview from "./views/PerformanceReview";
import AddReview from "./views/PerformanceReview/AddReview";
import ViewReview from "./views/PerformanceReview/ViewReview";
import Login from "./views/Login";
import EmployeeView from "./views/EmployeeView";
import ViewFitleredReview from "./views/EmployeeView/ViewFitleredReview";
import SubmitFeedBack from "./views/EmployeeView/SubmitFeedBack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Employee />,
      },
      {
        path: ":id",
        element: <Employee />,
      },
      {
        path: "performance-review",
        element: <PerformanceReview />,
      },
      {
        path: "performance-review/:id",
        element: <ViewReview />,
      },
      {
        path: "performance-review/add",
        element: <AddReview />,
      },
    ],
  },
  {
    path: "/employee-view/:id",
    element: <EmployeeView />,
    children: [
      {
        index: true,
        element: <ViewFitleredReview />,
      },
      {
        path: "submit-feedback/:review_id",
        element: <SubmitFeedBack />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
