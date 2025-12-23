import { AuthAction } from "./AuthSlice";

const AUTH_LOOKUP_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBTQ2asMnlPUffJVn8EKwscBGedzGW_e9c";

export const fetchAuthData = (token) => {
  return async (dispatch) => {
    try {
      if (!token) return null;

      const response = await fetch(AUTH_LOOKUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const { users } = await response.json();
      const user = users?.[0];

      if (!user?.localId) {
        console.warn("User not found");
        return null;
      }

      dispatch(AuthAction.setIdToken(token));
      dispatch(AuthAction.setUserId(user.localId));

      return user.localId;
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      return null;
    }
  };
};
