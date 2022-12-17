import { Outlet } from "react-router-dom";
import authBackgroundImg from "@/assets/images/auth-background.png";

const AuthLayout = () => {
  return (
    <div
      className="w-screen min-h-screen flex justify-center items-center"
      style={{
        background: `url(${authBackgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white shadow-md rounded p-4 flex justify-center items-center"
        style={{
          width: "400px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
