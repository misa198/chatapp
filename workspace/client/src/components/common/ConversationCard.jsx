import { Link } from "react-router-dom";
import { DEFAULT_PROFILE_IMAGE } from "@/common/constants";

const ConversationCard = ({ conversation }) => {
  return (
    <Link to={`/c/${conversation.id}`}>
      <div className="w-full px-3 py-2 flex cursor-pointer rounded-md hover:bg-gray-200 transition select-none">
        <img
          src={DEFAULT_PROFILE_IMAGE}
          alt="avatar"
          className="w-12 border rounded-full mr-3"
        />
        <div className="flex-1 w-full overflow-hidden flex flex-col justify-center">
          <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap mb-1">
            {conversation.partner.firstName} {conversation.partner.lastName}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default ConversationCard;
