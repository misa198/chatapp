import { listConversationsThunk } from "@/app/store/conversationsSlice";
import { addNewMessage } from "@/app/store/conversationsSlice";
import { getUser } from "@/common/utils";
import ChatSideBar from "@/components/common/ChatSideBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import io from "socket.io-client";
import useSound from "use-sound";
import tingSound from "@/assets/audios/ting.mp3";

const user = getUser();
const socket = io("ws://localhost:8082", {
  transports: ["websocket"],
  query: {
    userId: user.id,
  },
});

const ChatLayout = () => {
  const dispatch = useDispatch();
  const [play] = useSound(tingSound);

  useEffect(() => {
    dispatch(listConversationsThunk());
  }, []);

  useEffect(() => {
    socket.on("message-new", (payload) => {
      dispatch(addNewMessage(payload));
      play();
    });

    return () => {
      socket.off("message-new");
    };
  }, []);

  return (
    <div className="w-screen h-screen flex">
      <ChatSideBar />
      <Outlet />
    </div>
  );
};

export default ChatLayout;
