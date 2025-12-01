import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: { isAuthenticated: false, idToken: "", userId: "" },
  reducers: {
    userAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },

    setIdToken(state, action) {
      state.idToken = action.payload;
    },

    setUserId(state, action) {
      state.userId = action.payload;
    },

    reset(state) {
      state.isAuthenticated = false;
      state.idToken = null;
      state.userId = null;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice;
