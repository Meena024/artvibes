import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  edit_product: null,
  category: [],
  edit_category: null,
  selectedCategories: [],
  searchText: "",
  allOrders: [],
};

const updateById = (list, id, data) => {
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...data };
  }
};

const SellerProductsSlice = createSlice({
  name: "sellerProducts",
  initialState,

  reducers: {
    /* ------------------ PRODUCTS ------------------ */

    setProducts(state, action) {
      state.products = action.payload;
    },

    addProduct(state, action) {
      state.products.push(action.payload);
    },

    removeProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },

    updateProduct(state, action) {
      const { id, data } = action.payload;
      updateById(state.products, id, data);
    },

    setEditProduct(state, action) {
      state.edit_product = action.payload;
    },

    resetEditProduct(state) {
      state.edit_product = null;
    },

    /* ------------------ CATEGORY CRUD ------------------ */

    setCategories(state, action) {
      state.category = action.payload;
    },

    addCategory(state, action) {
      const exists = state.category.some((cat) => cat.id === action.payload.id);
      if (!exists) {
        state.category.push(action.payload);
      }
    },

    removeCategory(state, action) {
      state.category = state.category.filter(
        (cat) => cat.id !== action.payload
      );
    },

    updateCategory(state, action) {
      const { id, data } = action.payload;
      updateById(state.category, id, data);
    },

    setEditCategory(state, action) {
      state.edit_category = action.payload;
    },

    resetEditCategory(state) {
      state.edit_category = null;
    },

    toggleSelectedCategory(state, action) {
      const title = action.payload;
      const index = state.selectedCategories.indexOf(title);

      if (index !== -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(title);
      }
    },

    clearSelectedCategories(state) {
      state.selectedCategories = [];
    },

    setSearchText(state, action) {
      state.searchText = action.payload;
    },

    clearFilters(state) {
      state.searchText = "";
      state.selectedCategories = [];
    },

    setAllOrders(state, action) {
      state.allOrders = action.payload;
    },

    reset() {
      return initialState;
    },
  },
});

export const SellerProductsActions = SellerProductsSlice.actions;
export default SellerProductsSlice;
