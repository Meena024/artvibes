import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  favItems: [],
  orders: [],
  cartQty: 0,
  totalQty: 0,
  totalAmount: 0,
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      const cartItems = action.payload.cartItems ?? [];
      state.cartItems = cartItems;

      state.cartQty = cartItems.length;

      state.totalQty = cartItems.reduce(
        (sum, item) => sum + Number(item.qty),
        0
      );

      state.totalAmount = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.qty),
        0
      );
    },

    setOrders: (state, action) => {
      state.orders = action.payload.myOrders ?? [];
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
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

    addToFavr: (state, action) => {
      const exists = state.favItems.find((i) => i.id === action.payload.id);
      if (!exists) {
        state.favItems.push(action.payload);
      }
    },

    removeFromFavr: (state, action) => {
      state.favItems = state.favItems.filter((i) => i.id !== action.payload);
    },

    clearFav: (state) => {
      state.favItems = [];
    },
  },
});

export const CartSliceActions = CartSlice.actions;
export default CartSlice;
