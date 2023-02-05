import { getUser } from "@/common/utils";
import { DEFAULT_PROFILE_IMAGE } from "@/common/constants";

const Message = ({ message }) => {
  const user = getUser();
  const isMine = message.userId === user.id;

  return (
    <div
      className={`w-full p-4 flex ${!isMine ? "justify-end" : "justify-start"}`}
    >
      {isMine && (
        <div className="mr-4">
          <img
            src={DEFAULT_PROFILE_IMAGE}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>
      )}
      <div>
        <p
          className={`text-sm p-2 rounded-xl ${
            !isMine ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default Message;
