import "@/assets/styles/global.scss";
import Fallback from "@/components/common/FallBack";
import Routes from "@/router/Routes";
import { Suspense } from "react";

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen">
          <Fallback />
        </div>
      }
    >
      <Routes />
    </Suspense>
  );
}

export default App;
