import { useSelector } from "react-redux";
import ConversationCard from "@/components/common/ConversationCard.jsx";

const ConversationList = () => {
  const conversations = useSelector(
    (state) => state.conversations.conversations
  );

  return (
    <div className="w-full h-full flex-1 flex flex-col px-1.5 overflow-y-auto">
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
