import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ProfileSlice from "./ProfileSlice";
import ModalSlice from "./ModalSlice";
import SellerProductsSlice from "./Seller/SellerProductsSlice";
import CartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    profile: ProfileSlice.reducer,
    modal: ModalSlice.reducer,
    sellerProducts: SellerProductsSlice.reducer,
    cart: CartSlice.reducer,
  },
});

export default store;
