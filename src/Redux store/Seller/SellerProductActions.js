import { SellerProductsActions as SliceActions } from "./SellerProductsSlice";
import { dbApi } from "../../Components/Hooks/DbApi";

/* ------------------ FETCH PRODUCTS ------------------ */

export const fetchProducts = () => {
  return async (dispatch) => {
    const data = await dbApi.get("products");

    const productsArray = Object.entries(data || {}).map(([id, item]) => ({
      ...item,
      id,
    }));

    dispatch(SliceActions.setProducts(productsArray));
  };
};

/* ------------------ PRODUCTS ------------------ */

export const addProduct = (productData) => {
  return async (dispatch) => {
    const res = await dbApi.post("products", productData);
    const firebaseID = res.name;

    dispatch(SliceActions.addProduct({ ...productData, id: firebaseID }));
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

/* ------------------ CATEGORIES FETCH ------------------ */

export const fetchCategories = () => {
  return async (dispatch) => {
    const data = await dbApi.get("categories");

    const categoriesArray = Object.entries(data || {}).map(([id, item]) => ({
      ...item,
      id,
    }));

    dispatch(SliceActions.setCategories(categoriesArray));
  };
};

/* ------------------ CATEGORIES ------------------ */

export const addCategory = (cat) => {
  return async (dispatch) => {
    const res = await dbApi.post("categories", cat);
    dispatch(SliceActions.addCategory({ ...cat, id: res.name }));
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
  fetchProducts,
  fetchCategories,
  addProduct,
  updateProduct,
  removeProduct,
  addCategory,
  updateCategory,
  removeCategory,
};
