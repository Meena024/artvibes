import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ProfileSlice from "./ProfileSlice";
import ModalSlice from "./ModalSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    profile: ProfileSlice.reducer,
    modal: ModalSlice.reducer,
  },
});

export default store;
