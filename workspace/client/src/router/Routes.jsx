import { useRoutes } from "react-router-dom";
import AuthRoute from "./AuthRoute";

export const router = [
  // Auth router
  {
    path: "auth",
    element: (
      <AuthRoute component={() => import("@/components/layouts/AuthLayout")} />
    ),
    children: [
      {
        path: "login",
        element: <AuthRoute component={() => import("@/pages/auth/Login")} />,
      },
      {
        path: "register",
        element: <AuthRoute component={() => import("@/pages/auth/Register")} />,
      },
      {
        path: "forgot-password",
        element: <AuthRoute component={() => import("@/pages/auth/ForgotPassword")} />,
      },
    ],
  },
];

const Routes = () => {
  const element = useRoutes(router);

  return <>{element}</>;
};

export default Routes;
