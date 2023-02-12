import { TOKEN_KEY } from "@/common/constants";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get(TOKEN_KEY);
};

export const getUser = () => {
  const token = getAccessToken();
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
};

export const isVideoUrl = (value) => {
  return (
    value &&
    (value.startsWith("http") || value.startsWith("https")) &&
    (value.endsWith(".mp4") ||
      value.endsWith(".webm") ||
      value.endsWith(".ogg") ||
      value.endsWith(".mov"))
  );
};

export const isImageUrl = (value) => {
  return (
    value &&
    (value.startsWith("http") || value.startsWith("https")) &&
    (value.endsWith(".png") ||
      value.endsWith(".jpg") ||
      value.endsWith(".jpeg") ||
      value.endsWith(".gif"))
  );
};
