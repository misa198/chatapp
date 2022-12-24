import { IconCamera } from "@tabler/icons";

const Account = () => {
  return (
    <div className="flex justify-center">
      <div className="mr-20">
        <img
          className="border rounded-full"
          style={{
            width: "300px",
          }}
          src="https://avatars.githubusercontent.com/u/51451216?v=4"
          alt="profile-picture"
        />
        <div className="flex justify-center">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full items-center mt-4">
            <IconCamera />
          </button>
        </div>
      </div>

      <div
        style={{
          width: "350px",
        }}
      >
        <div className="w-full mb-4">
          <h4 className="font-bold ml-1 mb-2">Email</h4>
          <input
            type="text"
            className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-gray-100"
          />
        </div>

        <div className="w-full mb-4">
          <h4 className="font-bold ml-1 mb-2">Fist Name</h4>
          <input
            type="text"
            className="appearance-none rounded-full w-full py-2 px-4 focus:outline-none bg-gray-100"
          />
        </div>

        <div className="w-full mb-4">
          <h4 className="font-bold ml-1 mb-2">Last Name</h4>
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

export default Account;
