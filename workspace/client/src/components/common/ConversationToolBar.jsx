import {
  sendMessageThunk,
  sendMessageWithFileThunk,
} from "@/app/store/conversationsSlice";
import { IconPhoto, IconSend } from "@tabler/icons";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConversationToolBar = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const conversationId = useSelector(
    (state) => state.conversations.currentConversationId
  );
  const inputRef = useRef();
  const fileInputRef = useRef();

  const onClickFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    dispatch(
      sendMessageWithFileThunk({
        conversationId,
        formData,
      })
    );
  };

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
      <IconPhoto
        className="text-primary h-7 mr-1 cursor-pointer"
        onClick={onClickFile}
      />
      <input
        type="file"
        onChange={onChangeFile}
        className="hidden"
        ref={fileInputRef}
        accept="image/*,video/*"
        max-size="5242880"
      />

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
