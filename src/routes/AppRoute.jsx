import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "../components/auth/Login";
import { NewTest } from "../components/admin/NewTest";
import { TestsList } from "../components/tests/Tests";
import { Questions } from "../components/questions/Questions";

export const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/tests",
      element: <TestsList />,
    },
    {
      path: "/tests/:testId",
      element: <Questions />,
    },
    {
      path: "/new-test",
      element: <NewTest />,
    },
  ]);
  return <RouterProvider router={router} />;
};
