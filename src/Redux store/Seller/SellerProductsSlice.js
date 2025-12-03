import { createSlice } from "@reduxjs/toolkit";

const SellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
    edit_product: null,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    updateProduct: (state, action) => {
      const { id, data } = action.payload;
      const index = state.products.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...data };
      }
    },

    setEditProduct: (state, action) => {
      state.edit_product = action.payload;
    },

    resetEditProduct: (state) => {
      state.edit_product = null;
    },
  },
});

export const SellerProductsActions = SellerProductsSlice.actions;
export default SellerProductsSlice;
