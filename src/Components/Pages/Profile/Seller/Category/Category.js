import Styles from "../../../../../UI/CSS/SellerCategory.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import CategoryListing from "./CategoryListing";

const Category = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.sellerProducts.category);

  const AddCategoryHandler = () => {
    dispatch(ModalActions.setModalContent("AddCategory"));
    dispatch(ModalActions.setModal());
  };

  return (
    <div className={Styles.container}>
      <button className={Styles.button} onClick={AddCategoryHandler}>
        Add Category
      </button>

      <table className={Styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {category?.length > 0 ? (
            category.map((cat) => (
              <tr key={cat.id} className={Styles.spacingRow}>
                <td colSpan="3">
                  <CategoryListing category={cat} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className={Styles.noProducts}>
                No products added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
