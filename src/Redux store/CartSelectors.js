import { createSelector } from "@reduxjs/toolkit";

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartQty = createSelector(
  [selectCartItems],
  (items) => items.length
);

export const selectTotalQty = createSelector([selectCartItems], (items) =>
  items.reduce((sum, { qty }) => sum + Number(qty || 0), 0)
);

export const selectTotalAmount = createSelector([selectCartItems], (items) =>
  items.reduce(
    (sum, { price, qty }) => sum + Number(price || 0) * Number(qty || 0),
    0
  )
);
