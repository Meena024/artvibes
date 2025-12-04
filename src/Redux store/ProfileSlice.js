import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  role: null,
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.email = action.payload.email;
    },

    setName: (state, action) => {
      state.name = action.payload;
    },

    setRole: (state, action) => {
      state.role = action.payload;
    },

    setEmailInfo: (state, action) => {
      state.email = action.payload;
    },

    reset: (state) => {
      state.name = null;
      state.role = null;
      state.email = null;
    },
  },
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
