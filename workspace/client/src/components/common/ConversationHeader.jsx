import { IconDots, IconPhone } from "@tabler/icons";
import IconButton from "@/components/common/IconButton.jsx";

const ConversationHeader = () => {
  return (
    <div className="w-full p-3 border-b flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://avatars.githubusercontent.com/u/51451216?v=4"
          alt="avatar"
          className="w-10 border rounded-full mr-3"
        />
        <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
          Vũ Công Thành
        </h3>
      </div>
      <div className="flex items-center">
        <IconButton className="bg-gray-100 mr-3">
          <IconPhone />
        </IconButton>
        <IconButton className="bg-gray-100">
          <IconDots />
        </IconButton>
      </div>
    </div>
  );
};

export default ConversationHeader;
