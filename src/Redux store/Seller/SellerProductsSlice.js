import { createSlice } from "@reduxjs/toolkit";

const SellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState: {
    products: [],
    edit_product: null,
    category: [],
    edit_category: null,
    selectedCategories: [],
    searchText: "",
  },

  reducers: {
    /* ------------------ PRODUCTS ------------------ */

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
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

    setCategories: (state, action) => {
      state.category = action.payload; // <-- NEW
    },

    addCategory: (state, action) => {
      if (!state.category.some((cat) => cat.id === action.payload.id)) {
        state.category.push(action.payload);
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

    toggleSelectedCategory: (state, action) => {
      const title = action.payload;
      if (state.selectedCategories.includes(title)) {
        state.selectedCategories = state.selectedCategories.filter(
          (cid) => cid !== title
        );
      } else {
        state.selectedCategories.push(title);
      }
    },

    clearSelectedCategories: (state) => {
      state.selectedCategories = [];
    },

    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },

    reset: (state) => {
      state.products = [];
      state.category = [];
      state.edit_product = null;
      state.edit_category = null;
      state.selectedCategories = [];
      state.searchText = "";
    },
  },
});

export const SellerProductsActions = SellerProductsSlice.actions;
export default SellerProductsSlice;
