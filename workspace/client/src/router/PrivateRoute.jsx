import { getAccessToken } from "@/common/utils";
import Fallback from "@/components/common/FallBack";
import PropTypes from "prop-types";
import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component }) => {
  const Component = lazy(component);

  const token = getAccessToken();
  if (!token) return <Navigate to="/auth/login" />;

  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
