import { CartSliceActions as SliceActions } from "./CartSlice";
import { dbApi } from "../Components/Hooks/DbApi";

/* ------------------ FETCH CART (Firebase → Redux) ------------------ */
export const fetchCart = (userId) => {
  return async (dispatch) => {
    const data = await dbApi.get(`cart/${userId}`);

    const cartItems = data
      ? Object.keys(data).map((key) => ({
          firebaseKey: key,
          ...data[key],
        }))
      : [];

    dispatch(SliceActions.setCart({ cartItems }));
  };
};

/* ------------------ UPDATE CART (Redux → Firebase) ------------------ */

export const updateCart = (userId) => {
  return async (dispatch, getState) => {
    const cartItems = getState().cart.cartItems;
    const formatted = {};
    cartItems.forEach((item) => {
      formatted[item.id] = {
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
        image: item.image,
      };
    });

    await dbApi.put(`cart/${userId}`, formatted);
  };
};

/* ------------------ FAVORITES ------------------ */

export const addToFav = (userId, item) => {
  return async (dispatch) => {
    await dbApi.post(`fav/${userId}`, item);

    dispatch(SliceActions.addToFav(item));
  };
};

export const removeFromFav = (userId, productId) => {
  return async (dispatch) => {
    const favData = await dbApi.get(`fav/${userId}`);
    if (!favData) return;

    const firebaseKey = Object.keys(favData).find(
      (key) => favData[key].id === productId
    );

    if (!firebaseKey) return;

    await dbApi.remove(`fav/${userId}/${firebaseKey}`);

    dispatch(SliceActions.removeFromFav(productId));
  };
};

/* ------------------ EXPORT ALL ------------------ */
export const CartActions = {
  ...SliceActions,
  fetchCart,
  updateCart,
  addToFav,
  removeFromFav,
};
