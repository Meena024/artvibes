import axios from "axios";

const AUTH_URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

if (!API_KEY) {
  throw new Error(
    "REACT_APP_FIREBASE_API_KEY is not defined in environment variables"
  );
}

const api = axios.create({
  timeout: 15000,
});

/**
 * Maps Firebase auth error codes to user-friendly messages
 */
const mapAuthError = (code) => {
  switch (code) {
    case "EMAIL_NOT_FOUND":
      return "No account found with this email.";
    case "INVALID_PASSWORD":
      return "Incorrect password.";
    case "USER_DISABLED":
      return "This account has been disabled.";
    case "EMAIL_EXISTS":
      return "An account with this email already exists.";
    case "WEAK_PASSWORD":
      return "Password should be at least 6 characters.";
    default:
      return "Authentication failed. Please try again.";
  }
};

export const useAuthApi = () => {
  const sendRequest = async (endpoint, payload) => {
    try {
      const res = await api.post(
        `${AUTH_URL}${endpoint}?key=${API_KEY}`,
        payload
      );
      return res.data;
    } catch (err) {
      console.error("AUTH ERROR:", err);

      const errorCode = err?.response?.data?.error?.message;
      const message = mapAuthError(errorCode);

      throw new Error(message);
    }
  };

  const signUp = ({ email, password }) =>
    sendRequest("signUp", {
      email,
      password,
      returnSecureToken: true,
    });

  const login = ({ email, password }) =>
    sendRequest("signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });

  const forgotPassword = (email) =>
    sendRequest("sendOobCode", {
      requestType: "PASSWORD_RESET",
      email,
    });

  return { signUp, login, forgotPassword };
};
