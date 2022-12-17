import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const ForgotPassword = () => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      email: "",
    },
    validateOnChange: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <h3 className="mb-6 text-2xl text-center font-bold text-gray-800">
        Forgot password
      </h3>
      <div className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="email"
          type="text"
          placeholder="Email"
          name="email"
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.email}
          </span>
        )}
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
        <Link to="/auth/login">
          <span className="text-primary text-xs">Login</span>
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
