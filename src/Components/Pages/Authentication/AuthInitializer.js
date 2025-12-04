import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AuthAction } from "../../../Redux store/AuthSlice";
import { fetchAuthData } from "../../../Redux store/AuthActions";
import { ProfileActions } from "../../../Redux store/ProfileActions";
import { SellerProductsActions } from "../../../Redux store/Seller/SellerProductActions";

export const useAuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(AuthAction.userAuthenticated(false));
      return;
    }

    dispatch(AuthAction.userAuthenticated(true));
    dispatch(fetchAuthData(token)).then((id) => {
      dispatch(ProfileActions.fetchProfile(id));
      dispatch(SellerProductsActions.fetchProducts());
      dispatch(SellerProductsActions.fetchCategories());
    });
  }, [dispatch]);
};
