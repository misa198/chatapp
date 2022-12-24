import { Outlet, Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import { IconHome2, IconChevronRight } from "@tabler/icons";

const AccountLayout = () => {
  const activeClass =
    "border-primary active dark:text-blue-500 dark:border-blue-500  text-primary";
  const inactiveClass =
    "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300";
  const { pathname } = useLocation();

  return (
    <div className="w-screen min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mt-14 mb-8 flex items-center">
          <Link to="/c">
            <IconHome2 />
          </Link>
          <IconChevronRight className="mx-2" />
          <h3 className="font-bold text-2xl">Account</h3>
        </div>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-8">
          <ul className="flex flex-wrap w-full">
            <li className="mr-2">
              <Link
                to="/account"
                className={classnames(
                  "inline-block p-4 rounded-t-lg border-b-2",
                  {
                    [activeClass]: pathname === "/account",
                    [inactiveClass]: pathname !== "/account",
                  }
                )}
              >
                General
              </Link>
            </li>
            <li className="mr-2">
              <Link
                to="/account/password"
                className={classnames(
                  "inline-block p-4 rounded-t-lg border-b-2",
                  {
                    [activeClass]: pathname === "/account/password",
                    [inactiveClass]: pathname !== "/account/password",
                  }
                )}
              >
                Password
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AccountLayout;
