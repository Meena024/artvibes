import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "Modal",
  initialState: {
    isModalVisible: false,
    modalContent: null,
  },
  reducers: {
    setModal(state) {
      state.isModalVisible = true;
    },
    unsetModal(state) {
      state.isModalVisible = false;
      state.modalContent = null;
    },
    setModalContent(state, action) {
      state.modalContent = action.payload;
    },
  },
});

export const ModalActions = ModalSlice.actions;
export default ModalSlice;
