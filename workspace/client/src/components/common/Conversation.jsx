import ConversationHeader from "@/components/common/ConversationHeader.jsx";
import ConversationMain from "@/components/common/ConversationMain.jsx";
import ConversationToolBar from "@/components/common/ConversationToolBar.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { setConversationId } from "@/app/store/conversationsSlice";

const Conversation = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const conversation = useSelector((state) =>
    state.conversations.conversations.find((c) => c.id === id)
  );

  useEffect(() => {
    if (id) {
      dispatch(setConversationId(id));
    }
  }, [id]);

  return (
    <>
      {conversation ? (
        <div className="w-full h-full flex flex-col">
          <ConversationHeader conversation={conversation} />
          <ConversationMain />
          <ConversationToolBar />
        </div>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default Conversation;
