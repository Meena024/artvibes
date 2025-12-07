import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  role: null,
  phone: null,
  address: [],
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.name = action.payload.name ?? null;
      state.email = action.payload.email ?? null;
      state.role = action.payload.role ?? null;
      state.phone = action.payload.phone ?? null;
      state.address = action.payload.address ?? [];
    },

    updateProfile: (state, action) => {
      if ("name" in action.payload) state.name = action.payload.name;
      if ("phone" in action.payload) state.phone = action.payload.phone;
      if ("address" in action.payload) state.address = action.payload.address;
    },

    reset: () => initialState,
  },
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
