import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginThunk } from "@/app/store/authSlice";

const validationSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema,
    initialValues: {
      user: "",
      password: "",
    },
    validateOnChange: true,
    onSubmit: (values) => {
      dispatch(loginThunk(values));
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <h3 className="mb-6 text-2xl text-center font-bold text-gray-800">
        Login
      </h3>
      <div className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="user"
          type="text"
          placeholder="Username or email"
          name="user"
          onChange={formik.handleChange}
        />
        {formik.errors.user && formik.touched.user && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.user}
          </span>
        )}
      </div>
      <div className="mb-2">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="password"
          type="password"
          placeholder="Password"
          name="password"
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.password}
          </span>
        )}
      </div>
      <div className="text-right mb-2">
        <Link to="/auth/forgot-password">
          <span className="text-primary text-xs">Forgot password</span>
        </Link>
      </div>
      <div className="w-full">
        <button
          className="shadow bg-primary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
          type="submit"
        >
          Submit
        </button>
      </div>
      <div className="text-center mt-2">
        <Link to="/auth/register">
          <span className="text-primary text-xs">
            Haven't account, register?
          </span>
        </Link>
      </div>
    </form>
  );
};

export default Login;
