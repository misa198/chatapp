import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <form class="w-full">
      <h3 className="mb-6 text-2xl text-center font-bold text-gray-800">
        Forgot password
      </h3>

      <div class="mb-4">
        <input
          class="appearance-none border rounded w-full py-2 px-3 focus:outline-none"
          id="email"
          type="text"
          placeholder="email"
        />
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
        <Link to="/auth/login">
          <span className="text-primary text-xs">Login</span>
        </Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
