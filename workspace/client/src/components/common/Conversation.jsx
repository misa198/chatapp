import ConversationHeader from "@/components/common/ConversationHeader.jsx";
import ConversationMain from "@/components/common/ConversationMain.jsx";
import ConversationToolBar from "@/components/common/ConversationToolBar.jsx";

const Conversation = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <ConversationHeader />
      <ConversationMain />
      <ConversationToolBar />
    </div>
  );
};

export default Conversation;
