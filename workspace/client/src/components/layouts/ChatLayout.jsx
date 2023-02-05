import { listConversationsThunk } from "@/app/store/conversationsSlice";
import ChatSideBar from "@/components/common/ChatSideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listConversationsThunk());
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <ChatSideBar />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
