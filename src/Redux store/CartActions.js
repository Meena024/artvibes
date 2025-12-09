import { CartSliceActions as SliceActions } from "./CartSlice";
import { dbApi } from "../Components/Hooks/DbApi";

/* ------------------ FETCH CART (Firebase → Redux) ------------------ */
export const fetchCart = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
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

export const updateCart = () => {
  return async (dispatch, getState) => {
    const cartItems = getState().cart.cartItems;
    const userId = getState().auth.userId;
    const formatted = {};
    cartItems.forEach((item) => {
      formatted[item.id] = {
        id: item.id,
        title: item.title,
        price: item.price,
        qty: item.qty,
        image: item.image,
        status: "pending",
      };
    });

    await dbApi.put(`cart/${userId}`, formatted);
  };
};

/* ------------------ FAVORITES ------------------ */

export const fetchFav = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await dbApi.get(`fav/${userId}`);

    const favItems = data
      ? Object.keys(data).map((key) => ({
          firebaseKey: key,
          ...data[key],
        }))
      : [];

    dispatch(SliceActions.setFav({ favItems }));
  };
};

export const addToFav = (item) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    await dbApi.post(`fav/${userId}`, item);

    dispatch(SliceActions.addToFavr(item));
  };
};

export const removeFromFav = (productId) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
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

/* ------------------ FETCH ALL ORDERS (Firebase → Redux) ------------------ */

export const fetchAllOrders = () => {
  return async (dispatch) => {
    const data = await dbApi.get("orders");

    if (!data) {
      console.log("No orders found in database.");
      return;
    }

    const allOrders = [];

    Object.keys(data).forEach((userId) => {
      const userOrders = data[userId];

      Object.keys(userOrders).forEach((orderId) => {
        allOrders.push({
          userId,
          orderId,
          ...userOrders[orderId],
        });
      });
    });

    return allOrders;
  };
};

/* ------------------ FETCH ORDERS (Firebase → Redux) ------------------ */

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await dbApi.get(`orders/${userId}`);

    const myOrders = data
      ? Object.keys(data).map((key) => ({
          firebaseKey: key,
          ...data[key],
        }))
      : [];
    dispatch(SliceActions.setOrders({ myOrders }));
  };
};

/* ------------------ PLACE ORDER (Firebase → Redux) ------------------ */
export const PlaceOrder = (order) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    if (!userId) {
      console.error("No userId found in Redux store.");
      return;
    }

    const newOrderRef = await dbApi.put(
      `orders/${userId}/${order.orderId}`,
      order
    );

    dispatch(
      SliceActions.addOrder({
        firebaseKey: newOrderRef.name,
        ...order,
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
};
