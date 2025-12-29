import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../Redux store/AuthSlice";
import { SellerProductsActions } from "../../Redux store/Seller/SellerProductActions";
import { InitializeAuth } from "../Pages/Authentication/InitializeAuth";
import { CartActions } from "../../Redux store/CartActions";

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.profile.role);

  useEffect(() => {
    dispatch(SellerProductsActions.fetchProducts());
    dispatch(SellerProductsActions.fetchCategories());

    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(AuthAction.userAuthenticated(false));
      dispatch(AuthAction.setLoading(false));
      return;
    }

    InitializeAuth(dispatch, token);
  }, [dispatch]);

  useEffect(() => {
    if (!role) return;

    if (role === "user") {
      dispatch(CartActions.fetchCart());
      dispatch(CartActions.fetchOrders());
      dispatch(CartActions.fetchFav());
    } else {
      dispatch(SellerProductsActions.fetchAllOrders());
    }
  }, [role, dispatch]);
};
