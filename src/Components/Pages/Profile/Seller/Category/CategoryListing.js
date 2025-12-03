import { useDispatch } from "react-redux";
import styles from "../../../../../UI/CSS/CategoryListing.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductsSlice";

const CategoryListing = ({ category }) => {
  const dispatch = useDispatch();

  const editHandler = () => {
    dispatch(SellerProductsActions.setEditCategory(category));
    dispatch(ModalActions.setModalContent("AddCategory"));
    dispatch(ModalActions.setModal());
  };

  const deleteHandler = () => {
    dispatch(SellerProductsActions.removeCategory(category.id));
  };

  return (
    <div className={styles.row}>
      <div className={styles.cell}>
        <h4>{category.title}</h4>
      </div>

      <div className={styles.cell}>
        <img src={category.image} alt="" className={styles.productImage} />
      </div>

      <div className={styles.actionBtns}>
        <button className={styles.editBtn} onClick={editHandler}>
          <MdEdit />
        </button>

        <button className={styles.deleteBtn} onClick={deleteHandler}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default CategoryListing;
