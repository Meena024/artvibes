import { SellerProductsActions as SliceActions } from "./SellerProductsSlice";
import { dbApi } from "../../Components/Hooks/DbApi";

/* ------------------ PRODUCTS ------------------ */

export const addProduct = (productData) => {
  return async (dispatch) => {
    const res = await dbApi.post("products", productData);
    const firebaseID = res.name;

    dispatch(
      SliceActions.addProduct({
        ...productData,
        id: firebaseID,
      })
    );
  };
};

export const updateProduct = ({ id, data }) => {
  return async (dispatch) => {
    await dbApi.patch(`products/${id}`, data);
    dispatch(SliceActions.updateProduct({ id, data }));
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    await dbApi.remove(`products/${id}`);
    dispatch(SliceActions.removeProduct(id));
  };
};

/* ------------------ CATEGORIES ------------------ */

export const addCategory = (cat) => {
  return async (dispatch) => {
    const res = await dbApi.post("categories", cat);

    dispatch(
      SliceActions.addCategory({
        ...cat,
        id: res.name,
      })
    );
  };
};

export const updateCategory = ({ id, data }) => {
  return async (dispatch) => {
    await dbApi.patch(`categories/${id}`, data);
    dispatch(SliceActions.updateCategory({ id, data }));
  };
};

export const removeCategory = (id) => {
  return async (dispatch) => {
    await dbApi.remove(`categories/${id}`);
    dispatch(SliceActions.removeCategory(id));
  };
};

export const SellerProductsActions = {
  ...SliceActions,
  addProduct,
  updateProduct,
  removeProduct,
  addCategory,
  updateCategory,
  removeCategory,
};
