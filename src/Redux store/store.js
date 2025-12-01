import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import ProfileSlice from "./ProfileSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    profile: ProfileSlice.reducer,
  },
});

export default store;
