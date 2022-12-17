const ConversationCard = () => {
  return (
    <div className="w-full px-3 py-2 flex cursor-pointer rounded-md hover:bg-gray-200 transition select-none">
      <img
        src="https://avatars.githubusercontent.com/u/51451216?v=4"
        alt="avatar"
        className="w-12 border rounded-full mr-3"
      />
      <div className="flex-1 w-full overflow-hidden flex flex-col justify-center">
        <h3 className="font-semibold text-ellipsis overflow-hidden whitespace-nowrap mb-1">
          Vũ Công Thành
        </h3>
        <div className="w-full flex justify-between text-gray-600">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap text-xs">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
          <span className="text-xs ml-4">2h</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
