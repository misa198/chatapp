import { TOKEN_KEY } from "@/common/constants";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get(TOKEN_KEY);
};
