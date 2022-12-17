import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  firstName: yup.string().max(255).required(),
  lastName: yup.string().max(255).required(),
  email: yup.string().email().max(255).required(),
  username: yup.string().max(255).required(),
  password: yup.string().max(255).min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required(),
});

const Register = () => {
  const formik = useFormik({
    validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: true,
  });

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <h3 className="mb-6 text-2xl text-center font-bold text-gray-800">
        Register
      </h3>
      <div className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="firstName"
          type="text"
          placeholder="First name"
          name="firstName"
          onChange={formik.handleChange}
        />
        {formik.errors.firstName && formik.touched.firstName && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.firstName}
          </span>
        )}
      </div>
      <div className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="Last name"
          type="text"
          placeholder="Last name"
          name="lastName"
          onChange={formik.handleChange}
        />
        {formik.errors.lastName && formik.touched.lastName && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.lastName}
          </span>
        )}
      </div>
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
      <div className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="username"
          type="text"
          placeholder="username"
          name="username"
          onChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.username}
          </span>
        )}
      </div>
      <div className="mb-4">
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
      <div className="mb-4">
        <input
          className="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          onChange={formik.handleChange}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <span className="text-xs text-red-600 ml-1">
            {formik.errors.confirmPassword}
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
          <span className="text-primary text-xs">Had an account, login?</span>
        </Link>
      </div>
    </form>
  );
};

export default Register;
