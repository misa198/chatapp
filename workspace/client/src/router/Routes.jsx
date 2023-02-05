import { Navigate, useRoutes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";

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
        element: (
          <AuthRoute component={() => import("@/pages/auth/Register")} />
        ),
      },
      {
        path: "forgot-password",
        element: (
          <AuthRoute component={() => import("@/pages/auth/ForgotPassword")} />
        ),
      },
    ],
  },

  // Private layout
  {
    path: "c",
    element: (
      <PrivateRoute
        component={() => import("@/components/layouts/ChatLayout")}
      />
    ),
    children: [
      {
        path: "",
        element: <PrivateRoute component={() => import("@/pages/Home")} />,
      },
      {
        path: ":id",
        element: <PrivateRoute component={() => import("@/pages/Chat")} />,
      },
    ],
  },

  {
    path: "account",
    element: (
      <PrivateRoute
        component={() => import("@/components/layouts/AccountLayout")}
      />
    ),
    children: [
      {
        path: "",
        element: <PrivateRoute component={() => import("@/pages/Account")} />,
      },
      {
        path: "password",
        element: <PrivateRoute component={() => import("@/pages/Password")} />,
      },
    ],
  },

  {
    path: "",
    element: <Navigate to="/c" />,
  },
];

const Routes = () => {
  const element = useRoutes(router);

  return <>{element}</>;
};

export default Routes;
