import Styles from "../../../../../UI/CSS/SellerProducts.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "./ProductListing";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sellerProducts.products) || [];

  const addProductHandler = () => {
    dispatch(ModalActions.setModalContent("AddProduct"));
    dispatch(ModalActions.setModal());
  };

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
          {products.length > 0 ? (
            products.map((product) => (
              <ProductListing key={product.id} product={product} />
            ))
          ) : (
            <tr>
              <td colSpan="6" className={Styles.noProducts}>
                No products added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
