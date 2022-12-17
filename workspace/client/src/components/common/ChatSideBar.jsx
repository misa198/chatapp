import { IconEdit } from "@tabler/icons";
import IconButton from "@/components/common/IconButton";

const ChatSideBar = () => {
  return (
    <div className="h-screen w-80 border-r flex flex-col">
      <div className="w-full flex justify-between items-center p-4">
        <h3 className="text-2xl font-bold">Chat</h3>
        <IconButton className="bg-gray-100">
          <IconEdit size={20} />
        </IconButton>
      </div>
      <div className="px-4 pb-4">
        <input
          type="text"
          className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-gray-100"
          placeholder="Search a conversation"
        />
      </div>
      <div className="flex-1 w-full"></div>
    </div>
  );
};

export default ChatSideBar;
