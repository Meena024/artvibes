import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  idToken: "",
  userId: "",
  loading: true,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
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

    setLoading(state, action) {
      state.loading = action.payload;
    },

    reset() {
      return initialState;
    },
  },
});

export const AuthAction = AuthSlice.actions;
export default AuthSlice;
