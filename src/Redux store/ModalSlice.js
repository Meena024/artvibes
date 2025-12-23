import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalVisible: false,
  modalContent: null,
  modalData: null,
};

const ModalSlice = createSlice({
  name: "Modal",
  initialState,
  reducers: {
    setModal(state) {
      state.isModalVisible = true;
    },

    unsetModal() {
      return initialState;
    },

    setModalContent(state, action) {
      state.modalContent = action.payload;
    },

    setModalData(state, action) {
      state.modalData = action.payload;
    },
  },
});

export const ModalActions = ModalSlice.actions;
export default ModalSlice;
