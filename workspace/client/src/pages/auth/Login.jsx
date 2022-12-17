import { Link } from "react-router-dom";

const Login = () => {
  return (
    <form class="w-full">
      <h3 className="mb-6 text-2xl text-center font-bold text-gray-800">
        Login
      </h3>

      <div class="mb-4">
        <input
          class="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="user"
          type="text"
          placeholder="Username or email"
        />
      </div>
      <div class="mb-2">
        <input
          class="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="password"
          type="text"
          placeholder="Password"
        />
      </div>
      <div className="text-right mb-2">
        <Link to="/auth/forgot-password">
          <span className="text-primary text-xs">Forgot password</span>
        </Link>
      </div>
      <div className="w-full">
        <button
          class="shadow bg-primary focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
          type="button"
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
