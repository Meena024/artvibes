import { AuthAction } from "./AuthSlice";

export const fetchAuthData = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBTQ2asMnlPUffJVn8EKwscBGedzGW_e9c`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: token }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      const user = data?.users?.[0];
      if (!user) {
        console.warn("User not found");
        return null;
      }

      console.log("Auth Data:", user);
      dispatch(AuthAction.setIdToken(token));
      // --- Update Auth slice ---
      const userId = user.localId;
      dispatch(AuthAction.setUserId(userId));
      // --- Update Profile slice ---

      return user.localId;
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      return null;
    }
  };
};
