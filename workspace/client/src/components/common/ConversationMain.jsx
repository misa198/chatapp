import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMessagesThunk } from "@/app/store/conversationsSlice";
import Message from "./Message";

const ConversationMain = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.conversations.messages);

  useEffect(() => {
    dispatch(listMessagesThunk(id));
  }, [id, dispatch]);

  // auto scroll to bottom when new message is added
  useEffect(() => {
    const element = document.querySelector(".messages");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full h-full flex-1 overflow-y-auto messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};

export default ConversationMain;
