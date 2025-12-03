import { createSlice } from "@reduxjs/toolkit";

const SellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
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
  },
});

export const SellerProductsActions = SellerProductsSlice.actions;
export default SellerProductsSlice;
