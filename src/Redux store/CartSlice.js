import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  favItems: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload.cartItems ?? [];
    },

    addItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.cartItems.find((i) => i.id === newItem.id);

      if (existing) {
        existing.qty += newItem.qty;
      } else {
        state.cartItems.push(newItem);
      }
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item) item.qty = qty;
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    addToFav: (state, action) => {
      const exists = state.favItems.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.favItems.push(action.payload);
      }
    },

    removeFromFav: (state, action) => {
      state.favItems = state.favItems.filter((i) => i.id !== action.payload);
    },

    clearFav: (state) => {
      state.favItems = [];
    },
  },
});

export const CartSliceActions = CartSlice.actions;
export default CartSlice;
