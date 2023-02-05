import { sendMessageThunk } from "@/app/store/conversationsSlice";
import { IconFileBarcode, IconPhoto, IconSend } from "@tabler/icons";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConversationToolBar = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const conversationId = useSelector(
    (state) => state.conversations.currentConversationId
  );
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      sendMessageThunk({
        conversationId,
        message: {
          content,
        },
      })
    );
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <form className="w-full p-3 flex items-center border-t" onSubmit={onSubmit}>
      <IconPhoto className="text-primary h-7 mr-2 cursor-pointer" />
      <IconFileBarcode className="text-primary h-7 mr-1 cursor-pointer" />

      <input
        type="text"
        className="appearance-none rounded-full w-full py-1 px-4 focus:outline-none bg-gray-200 mx-2"
        placeholder="Type a message"
        onChange={onChangeContent}
        ref={inputRef}
      />
      <button type="submit">
        <IconSend className="text-primary h-7 ml-2 cursor-pointer" />
      </button>
    </form>
  );
};

export default ConversationToolBar;
