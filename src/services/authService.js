import axios from "axios";
import { checkAuthRoute } from "../utils/APIRoutes";

export const isAuthenticated = async () => {
  const token = localStorage.getItem("user-token");
  if (token) {
    const { data } = await axios.get(checkAuthRoute, {
      headers: {
        authorization: `token ${token}`,
      },
    });
    if (data.session == true) {
      const user = JSON.stringify(data.user);
      localStorage.setItem("user", user);
      return JSON.parse(user);
    } else {
      return false;
    }
  } else {
    return false;
  }
};
