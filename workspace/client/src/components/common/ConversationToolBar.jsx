import { IconPhoto, IconFileBarcode, IconSend } from "@tabler/icons";

const ConversationToolBar = () => {
  return (
    <div className="w-full p-3 flex items-center border-t">
      <IconPhoto className="text-primary h-7 mr-2 cursor-pointer" />
      <IconFileBarcode className="text-primary h-7 mr-1 cursor-pointer" />

      <input
        type="text"
        className="appearance-none rounded-full w-full py-1 px-4 focus:outline-none bg-gray-200 mx-2"
      />
      <IconSend className="text-primary h-7 ml-2 cursor-pointer" />
    </div>
  );
};

export default ConversationToolBar;
