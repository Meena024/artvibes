import { createSlice } from "@reduxjs/toolkit";

const SellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
    edit_product: null,
    category: [],
    edit_category: null,
  },

  reducers: {
    /* ------------------ PRODUCTS ------------------ */

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

    /* ------------------ CATEGORY CRUD ------------------ */

    addCategory: (state, action) => {
      if (!state.category.includes(action.payload)) {
        state.category.push(action.payload);
        console.log(action.payload);
      }
    },

    removeCategory: (state, action) => {
      state.category = state.category.filter(
        (cat) => cat.id !== action.payload
      );
    },

    updateCategory: (state, action) => {
      const { id, data } = action.payload;
      const index = state.category.findIndex((p) => p.id === id);
      if (index !== -1) {
        state.category[index] = { ...state.category[index], ...data };
      }
    },

    setEditCategory: (state, action) => {
      state.edit_category = action.payload;
    },

    resetEditCategory: (state) => {
      state.edit_category = null;
    },

    reset: (state) => {
      state.products = [];
      state.category = [];
      state.edit_product = null;
      state.edit_category = null;
    },
  },
});

export const SellerProductsActions = SellerProductsSlice.actions;
export default SellerProductsSlice;
