import Styles from "../../../../UI/CSS/SellerProfile.module.css";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { useDispatch } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();

  const AddProductHandler = () => {
    dispatch(ModalActions.setModalContent("AddProduct"));
    dispatch(ModalActions.setModal());
  };
  return (
    <div>
      <button className={Styles.button} onClick={AddProductHandler}>
        Add Products
      </button>
    </div>
  );
};

export default Product;
