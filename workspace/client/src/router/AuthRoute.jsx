import Fallback from "@/components/common/FallBack";
import PropTypes from "prop-types";
import { lazy, Suspense } from "react";

const AuthRoute = ({ component }) => {
  const Component = lazy(component);

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
