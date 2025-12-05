import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartQty = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectTotalQty = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + Number(i.qty), 0)
);

export const selectTotalAmount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + Number(i.price) * Number(i.qty), 0)
);
