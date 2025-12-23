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
    setCart(state, action) {
      state.cartItems = action.payload.cartItems ?? [];
    },

    setOrders(state, action) {
      state.orders = action.payload.myOrders ?? [];
    },

    addOrder(state, action) {
      state.orders.unshift(action.payload);
    },

    addItem(state, action) {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.id === item.id);

      if (existing) {
        existing.qty += item.qty;
      } else {
        state.cartItems.push(item);
      }
    },

    increaseQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) item.qty += 1;
    },

    decreaseQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty -= 1;
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    clearCart(state) {
      state.cartItems = [];
    },

    updateItemStatus(state, action) {
      const { orderId, itemIndex, status } = action.payload;
      const order = state.orders.find((o) => o.orderId === orderId);

      if (order?.items?.[itemIndex]) {
        order.items[itemIndex].status = status;
      }
    },

    setFav(state, action) {
      state.favItems = action.payload.favItems ?? [];
    },

    addToFavr(state, action) {
      const exists = state.favItems.some((i) => i.id === action.payload.id);
      if (!exists) {
        state.favItems.push(action.payload);
      }
    },

    removeFromFavr(state, action) {
      state.favItems = state.favItems.filter((i) => i.id !== action.payload);
    },

    reset() {
      return initialState;
    },
  },
});

export const CartSliceActions = CartSlice.actions;
export default CartSlice;
