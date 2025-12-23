import { SellerProductsActions as SliceActions } from "./SellerProductsSlice";
import { dbApi } from "../../Components/Hooks/DbApi";

/* ------------------ FETCH PRODUCTS ------------------ */

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const data = await dbApi.get("products");

      const productsArray = Object.entries(data || {}).map(([id, item]) => ({
        ...item,
        id,
      }));

      dispatch(SliceActions.setProducts(productsArray));
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };
};

/* ------------------ PRODUCTS ------------------ */

export const addProduct = (productData) => {
  return async (dispatch) => {
    try {
      const res = await dbApi.post("products", productData);
      dispatch(SliceActions.addProduct({ ...productData, id: res?.name }));
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };
};

export const updateProduct = ({ id, data }) => {
  return async (dispatch) => {
    try {
      await dbApi.patch(`products/${id}`, data);
      dispatch(SliceActions.updateProduct({ id, data }));
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };
};

export const removeProduct = (id) => {
  return async (dispatch) => {
    try {
      await dbApi.remove(`products/${id}`);
      dispatch(SliceActions.removeProduct(id));
    } catch (err) {
      console.error("Failed to remove product:", err);
    }
  };
};

/* ------------------ FETCH CATEGORIES ------------------ */

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const data = await dbApi.get("categories");

      const categoriesArray = Object.entries(data || {}).map(([id, item]) => ({
        ...item,
        id,
      }));

      dispatch(SliceActions.setCategories(categoriesArray));
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };
};

/* ------------------ CATEGORIES ------------------ */

export const addCategory = (cat) => {
  return async (dispatch) => {
    try {
      const res = await dbApi.post("categories", cat);
      dispatch(SliceActions.addCategory({ ...cat, id: res?.name }));
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };
};

export const updateCategory = ({ id, data }) => {
  return async (dispatch) => {
    try {
      await dbApi.patch(`categories/${id}`, data);
      dispatch(SliceActions.updateCategory({ id, data }));
    } catch (err) {
      console.error("Failed to update category:", err);
    }
  };
};

export const removeCategory = (id) => {
  return async (dispatch) => {
    try {
      await dbApi.remove(`categories/${id}`);
      dispatch(SliceActions.removeCategory(id));
    } catch (err) {
      console.error("Failed to remove category:", err);
    }
  };
};

/* ------------------ FETCH ALL ORDERS ------------------ */

export const fetchAllOrders = () => {
  return async (dispatch) => {
    try {
      const data = await dbApi.get("orders");
      if (!data || typeof data !== "object") {
        dispatch(SliceActions.setAllOrders([]));
        return [];
      }

      const allOrders = [];

      for (const userId in data) {
        const userOrders = data[userId] || {};

        for (const orderId in userOrders) {
          allOrders.push({
            userId,
            orderId,
            ...userOrders[orderId],
          });
        }
      }

      allOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      dispatch(SliceActions.setAllOrders(allOrders));
      return allOrders;
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      dispatch(SliceActions.setAllOrders([]));
      return [];
    }
  };
};

/* ------------------ EXPORT AGGREGATE ------------------ */

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
  fetchAllOrders,
};
