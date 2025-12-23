import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "../../Redux store/AuthSlice";
import { SellerProductsActions } from "../../Redux store/Seller/SellerProductActions";
import { InitializeAuth } from "../Pages/Authentication/InitializeAuth";
import { CartActions } from "../../Redux store/CartActions";

export const useAuthInitializer = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.profile.role);

  // -------- INITIAL LOAD (runs once) --------
  useEffect(() => {
    let isMounted = true;

    dispatch(SellerProductsActions.fetchProducts());
    dispatch(SellerProductsActions.fetchCategories());

    const token = localStorage.getItem("token");

    if (!token) {
      if (isMounted) {
        dispatch(AuthAction.userAuthenticated(false));
        dispatch(AuthAction.setLoading(false));
      }
      return;
    }

    // fire-and-forget (InitializeAuth handles loading & errors)
    InitializeAuth(dispatch, token);

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // -------- ROLE-BASED DATA --------
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
