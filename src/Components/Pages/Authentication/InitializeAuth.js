import { AuthAction } from "../../../Redux store/AuthSlice";
import { fetchAuthData } from "../../../Redux store/AuthActions";
import { ProfileActions } from "../../../Redux store/ProfileActions";

export const InitializeAuth = async (dispatch, token) => {
  dispatch(AuthAction.userAuthenticated(true));

  try {
    await dispatch(fetchAuthData(token));
    await dispatch(ProfileActions.fetchProfile());
  } catch (error) {
    console.error("Auth initialization failed:", error);

    dispatch(AuthAction.userAuthenticated(false));
  } finally {
    dispatch(AuthAction.setLoading(false));
  }
};
