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
    setProfile(state, action) {
      const {
        name = null,
        email = null,
        role = null,
        phone = null,
        address = [],
      } = action.payload || {};

      state.name = name;
      state.email = email;
      state.role = role;
      state.phone = phone;
      state.address = address;
    },

    updateProfile(state, action) {
      const payload = action.payload || {};

      if (Object.prototype.hasOwnProperty.call(payload, "name")) {
        state.name = payload.name;
      }

      if (Object.prototype.hasOwnProperty.call(payload, "phone")) {
        state.phone = payload.phone;
      }

      if (Object.prototype.hasOwnProperty.call(payload, "address")) {
        state.address = payload.address;
      }
    },

    reset() {
      return initialState;
    },
  },
});

export const ProfileActions = ProfileSlice.actions;
export default ProfileSlice;
