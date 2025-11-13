import Cookies from "js-cookie";

export const logoutUser = () => {
  Cookies.remove("authToken");
  Cookies.remove("role");
  window.location.href = "/panels-admins/auth-login";
};
