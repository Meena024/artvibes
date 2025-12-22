import { AuthAction } from "../../../Redux store/AuthSlice";
import { fetchAuthData } from "../../../Redux store/AuthActions";
import { ProfileActions } from "../../../Redux store/ProfileActions";
import { CartActions } from "../../../Redux store/CartActions";

export const InitializeAuth = async (dispatch, token) => {
  dispatch(AuthAction.userAuthenticated(true));

  await dispatch(fetchAuthData(token));
  await dispatch(ProfileActions.fetchProfile());

  const role = JSON.parse(localStorage.getItem("role")) || null;

  if (role === "user") {
    await dispatch(CartActions.fetchCart());
    await dispatch(CartActions.fetchOrders());
    await dispatch(CartActions.fetchFav());
  } else {
    await dispatch(CartActions.fetchAllOrders());
  }

  dispatch(AuthAction.setLoading(false));
};
