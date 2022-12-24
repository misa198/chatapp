const PasswordPage = () => {
  return (
    <div className="w-full flex justify-center">
      <div
        style={{
          width: "350px",
        }}
      >
        <div className="w-full mb-4">
          <h4 className="font-bold ml-1 mb-2">Old Password</h4>
          <input
            type="text"
            className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-gray-100"
          />
        </div>
        <div className="w-full mb-4">
          <h4 className="font-bold ml-1 mb-2">New Password</h4>
          <input
            type="text"
            className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-gray-100"
          />
        </div>
        <div className="w-full mb-4">
          <h4 className="font-bold ml-1 mb-2">Confirm New Password</h4>
          <input
            type="text"
            className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-gray-100"
          />
        </div>
        <div className="w-full pt-2">
          <button
            type="submit"
            className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-primary text-white font-bold"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
