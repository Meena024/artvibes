import { CartSliceActions as SliceActions } from "./CartSlice";
import { dbApi } from "../Components/Hooks/DbApi";

/* ------------------ helpers ------------------ */

const mapFirebaseList = (data) =>
  data
    ? Object.keys(data).map((key) => ({
        firebaseKey: key,
        ...data[key],
      }))
    : [];

/* ------------------ FETCH CART (Firebase → Redux) ------------------ */

export const fetchCart = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const data = await dbApi.get(`cart/${userId}`);
    const cartItems = mapFirebaseList(data);

    dispatch(SliceActions.setCart({ cartItems }));
  };
};

/* ------------------ UPDATE CART (Redux → Firebase) ------------------ */

export const updateCart = () => {
  return async (_, getState) => {
    const { cartItems } = getState().cart;
    const userId = getState().auth.userId;
    if (!userId) return;

    const formatted = {};
    for (const item of cartItems) {
      formatted[item.id] = {
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
        image: item.image,
        status: "pending",
      };
    }

    await dbApi.put(`cart/${userId}`, formatted);
  };
};

/* ------------------ FAVORITES ------------------ */

export const fetchFav = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const data = await dbApi.get(`fav/${userId}`);
    const favItems = mapFirebaseList(data);

    dispatch(SliceActions.setFav({ favItems }));
  };
};

export const addToFav = (item) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    await dbApi.post(`fav/${userId}`, item);
    dispatch(SliceActions.addToFavr(item));
  };
};

export const removeFromFav = (productId) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const favData = await dbApi.get(`fav/${userId}`);
    if (!favData) return;

    const firebaseKey = Object.keys(favData).find(
      (key) => favData[key].id === productId
    );
    if (!firebaseKey) return;

    await dbApi.remove(`fav/${userId}/${firebaseKey}`);
    dispatch(SliceActions.removeFromFavr(productId));
  };
};

/* ------------------ FETCH ORDERS (Firebase → Redux) ------------------ */

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const data = await dbApi.get(`orders/${userId}`);
    const myOrders = mapFirebaseList(data).sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    dispatch(SliceActions.setOrders({ myOrders }));
  };
};

/* ------------------ PLACE ORDER (Firebase → Redux) ------------------ */

export const PlaceOrder = (order) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    if (!userId) return;

    const newOrderRef = await dbApi.put(
      `orders/${userId}/${order.orderId}`,
      order
    );

    dispatch(
      SliceActions.addOrder({
        firebaseKey: newOrderRef?.name,
        ...order,
      })
    );
  };
};

/* ------------------ UPDATE ITEM STATUS ------------------ */

export const updateItemStatus = (orderId, pur_userId, itemIndex, status) => {
  return async (dispatch) => {
    await dbApi.patch(`orders/${pur_userId}/${orderId}/items/${itemIndex}`, {
      status,
    });

    dispatch(
      SliceActions.updateItemStatus({
        orderId,
        itemIndex,
        status,
      })
    );
  };
};

/* ------------------ EXPORT ALL ------------------ */

export const CartActions = {
  ...SliceActions,
  fetchCart,
  updateCart,
  fetchFav,
  addToFav,
  removeFromFav,
  fetchOrders,
  PlaceOrder,
  updateItemStatus,
};
