import { Outlet } from "react-router-dom";
import ChatSideBar from "@/components/common/ChatSideBar";

const ChatLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <ChatSideBar />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
