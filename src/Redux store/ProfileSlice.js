import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  profileUrl: null,
  email: null,
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setProfileUrl: (state, action) => {
      state.profileUrl = action.payload;
    },
    setEmailInfo: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    reset: (state) => {
      state.name = null;
      state.profileUrl = null;
      state.email = null;
      state.emailVerified = false;
    },
  },
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
