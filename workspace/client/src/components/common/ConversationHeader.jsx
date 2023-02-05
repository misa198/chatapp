import IconButton from "@/components/common/IconButton.jsx";
import { IconDots } from "@tabler/icons";
import { DEFAULT_PROFILE_IMAGE } from "@/common/constants";

const ConversationHeader = ({ conversation }) => {
  return (
    <div className="w-full p-3 border-b flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={DEFAULT_PROFILE_IMAGE}
          alt="avatar"
          className="w-10 border rounded-full mr-3"
        />
        <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          {conversation ? (
            <>
              {conversation.partner.firstName} {conversation.partner.lastName}
            </>
          ) : (
            "Loading..."
          )}
        </h3>
      </div>
      <div className="flex items-center">
        {/* <IconButton className="bg-gray-100 mr-3">
          <IconPhone />
        </IconButton> */}
        <IconButton className="bg-gray-100">
          <IconDots />
        </IconButton>
      </div>
    </div>
  );
};

export default ConversationHeader;
