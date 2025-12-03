import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SellerProductsActions } from "../../../Redux store/Seller/SellerProductActions";

const UserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SellerProductsActions.fetchProducts());
    dispatch(SellerProductsActions.fetchCategories());
  });
  return (
    <div style={{ padding: "20px" }}>
      <Outlet />
    </div>
  );
};

export default UserProfile;
