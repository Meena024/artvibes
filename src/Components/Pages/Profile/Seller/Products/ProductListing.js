import styles from "../../../../../UI/CSS/ProductListing.module.css";
import { MdEdit, MdDelete } from "react-icons/md";

const ProductListing = ({ product }) => {
  console.log(styles, "styles");
  return (
    <tr>
      <td colSpan="6" className={styles.rowWrapper}>
        <div className={styles.row}>
          <div className={styles.cell}>{product.title}</div>
          <div className={styles.cell}>{product.description}</div>
          <div className={styles.cell}>{product.category}</div>
          <div className={styles.cell}>${product.price}</div>
          <div className={styles.cell}>
            <img src={product.image} alt="p1" className={styles.productImage} />
          </div>
          <div className={styles.actionBtns}>
            <button className={styles.editBtn}>
              <MdEdit />
            </button>
            <button className={styles.deleteBtn}>
              <MdDelete />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default ProductListing;
