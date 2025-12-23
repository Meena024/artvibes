import Styles from "../../../../../UI/CSS/SellerProducts.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "./ProductListing";

const Product = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.sellerProducts.products) || [];

  const searchText =
    useSelector((state) => state.sellerProducts.searchText) || "";

  const addProductHandler = () => {
    dispatch(ModalActions.setModalContent("AddProduct"));
    dispatch(ModalActions.setModal());
  };

  const filteredProducts = products.filter((product) => {
    if (!searchText.trim()) return true;

    const query = searchText.toLowerCase();

    return (
      product.title?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    );
  });

  return (
    <div className={Styles.container}>
      <button className={Styles.button} onClick={addProductHandler}>
        Add Products
      </button>

      <table className={Styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductListing key={product.id} product={product} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className={Styles.noProducts}>
                No matching products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
