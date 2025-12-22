import { AuthAction } from "../../../Redux store/AuthSlice";
import { fetchAuthData } from "../../../Redux store/AuthActions";
import { ProfileActions } from "../../../Redux store/ProfileActions";

export const InitializeAuth = async (dispatch, token) => {
  dispatch(AuthAction.userAuthenticated(true));

  await dispatch(fetchAuthData(token));
  await dispatch(ProfileActions.fetchProfile());

  dispatch(AuthAction.setLoading(false));
};
