import "@/assets/styles/global.scss";
import Fallback from "@/components/common/FallBack";
import Routes from "@/router/Routes";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  return (
    <>
      <Suspense
        fallback={
          <div className="h-screen w-screen">
            <Fallback />
          </div>
        }
      >
        <Routes />
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
