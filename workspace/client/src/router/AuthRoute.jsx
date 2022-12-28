import { getAccessToken } from "@/common/utils";
import Fallback from "@/components/common/Fallback";
import PropTypes from "prop-types";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ component }) => {
  const Component = lazy(component);
  const accessToken = getAccessToken();
  console.log("accessToken", accessToken);

  if (accessToken) return <Navigate to="/c" />;
  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
};

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoute;
