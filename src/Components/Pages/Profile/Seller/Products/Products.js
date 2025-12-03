import Styles from "../../../../../UI/CSS/SellerProducts.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductListing from "./ProductListing";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.sellerProducts.products);
  console.log(products);
  const product_list = products.map((product) => (
    <ProductListing product={product} />
  ));
  const AddProductHandler = () => {
    dispatch(ModalActions.setModalContent("AddProduct"));
    dispatch(ModalActions.setModal());
  };
  return (
    <div>
      <button className={Styles.button} onClick={AddProductHandler}>
        Add Products
      </button>
      <div>{product_list}</div>
    </div>
  );
};

export default Product;
