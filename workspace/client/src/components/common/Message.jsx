import { getUser } from "@/common/utils";
import { DEFAULT_PROFILE_IMAGE } from "@/common/constants";
import { Tooltip } from "react-tooltip";
import { isVideoUrl, isImageUrl } from "@/common/utils";

const Message = ({ message }) => {
  const user = getUser();
  const isMine = message.userId === user.id;

  return (
    <div
      className={`w-full p-4 flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      {!isMine && (
        <div className="mr-4">
          <img
            src={DEFAULT_PROFILE_IMAGE}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
      <div
        className={`flex-1 flex ${isMine ? "flex-row-reverse" : "flex-row"}`}
      >
        <Tooltip place="top" type="dark" effect="solid" anchorId={message.id}>
          <span className="text-xs">
            {new Date(message.createdAt).toLocaleString()}
          </span>
        </Tooltip>
        {isImageUrl(message.content) ? (
          <img
            src={message.content}
            alt="message"
            className="w-fit max-w-3xl rounded-lg border"
          />
        ) : isVideoUrl(message.content) ? (
          <video
            src={message.content}
            className="w-fit max-w-3xl rounded-lg border"
            controls
          />
        ) : (
          <p
            className={`text-sm p-2 rounded-xl w-fit ${
              isMine ? "bg-primary text-white" : "bg-gray-200"
            }`}
            id={message.id}
          >
            {message.content}
          </p>
        )}
      </div>
    </div>
  );
};

export default Message;
