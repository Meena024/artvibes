import { useDispatch } from "react-redux";
import styles from "../../../../../UI/CSS/ProductListing.module.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductActions";

const ProductListing = ({ product }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  const editHandler = () => {
    dispatch(SellerProductsActions.setEditProduct(product));
    dispatch(ModalActions.setModalContent("AddProduct"));
    dispatch(ModalActions.setModal());
  };

  const deleteHandler = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.title}"?`
    );

    if (!confirmDelete) return;

    dispatch(SellerProductsActions.removeProduct(product.id));
  };

  return (
    <tr>
      <td colSpan="6" className={styles.rowWrapper}>
        <div className={styles.row}>
          <div className={styles.cell}>
            <h4>{product.title}</h4>
          </div>

          <div className={styles.cell}>{product.description}</div>
          <div className={styles.cell}>{product.category}</div>
          <div className={styles.cell}>₹{product.price}</div>

          <div className={styles.cell}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
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
      </td>
    </tr>
  );
};

export default ProductListing;
