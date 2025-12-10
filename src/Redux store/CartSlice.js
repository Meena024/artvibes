import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  favItems: [],
  orders: [],
};

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload.cartItems ?? [];
    },

    setOrders: (state, action) => {
      state.orders = action.payload.myOrders ?? [];
    },

    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },

    addItem: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((i) => i.id === item.id);

      if (exists) {
        exists.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
    },

    increaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.qty++;
    },

    decreaseQty: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty--;
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    updateItemStatus: (state, action) => {
      const { orderId, itemIndex, status } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);
      if (order) {
        order.items[itemIndex].status = status;
      }
    },

    setFav: (state, action) => {
      state.favItems = action.payload.favItems ?? [];
    },

    addToFavr: (state, action) => {
      if (!state.favItems.find((i) => i.id === action.payload.id)) {
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
