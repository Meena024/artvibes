import axios from "axios";

const AuthURL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const api_key = "AIzaSyBTQ2asMnlPUffJVn8EKwscBGedzGW_e9c";

export const useAuthApi = () => {
  const sendRequest = async (endpoint, payload) => {
    try {
      const res = await axios.post(
        `${AuthURL}${endpoint}?key=${api_key}`,
        payload
      );
      return res.data;
    } catch (err) {
      console.error("AUTH ERROR:", err);

      const message =
        err?.response?.data?.error?.message ||
        "Authentication failed. Please try again.";

      throw new Error(message);
    }
  };

  const signUp = async ({ email, password }) => {
    return await sendRequest("signUp", {
      email,
      password,
      returnSecureToken: true,
    });
  };

  const login = async ({ email, password }) => {
    return await sendRequest("signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
  };

  const forgotPassword = async (email) => {
    return await sendRequest("sendOobCode", {
      requestType: "PASSWORD_RESET",
      email,
    });
  };

  return { signUp, login, forgotPassword };
};
