import { useState, useEffect } from "react";
import styles from "../../../../../UI/CSS/Form.module.css";
import Card from "../../../../../UI/Card/Card";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductsSlice";

const AddCategoryForm = () => {
  const dispatch = useDispatch();

  const editCategory = useSelector(
    (state) => state.sellerProducts.edit_category
  );

  const isEdit = Boolean(editCategory);

  const [formData, setFormData] = useState({
    id: Date.now(),
    title: "",
    image: "",
  });

  // Load data when editing
  useEffect(() => {
    if (editCategory) {
      setFormData(editCategory);
    }
  }, [editCategory]);

  // Capitalize title
  const capitalize = (text) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let val = value;
    if (name === "title") val = capitalize(value);

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        SellerProductsActions.updateCategory({
          id: formData.id,
          data: formData,
        })
      );
    } else {
      dispatch(
        SellerProductsActions.addCategory({
          id: formData.id,
          title: formData.title,
          image: formData.image,
        })
      );
    }

    dispatch(SellerProductsActions.resetEditCategory());
    dispatch(ModalActions.unsetModal());
  };

  const handleCancel = () => {
    dispatch(SellerProductsActions.resetEditCategory());
    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={styles.authFormCenter}>
      <Card>
        <h1 className={styles.title}>
          {isEdit ? "Edit Category" : "Add Category"}
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Category Title */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="title"
              placeholder="Category Name"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {/* Category Image */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="image"
              placeholder="Category Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div>
            <button type="submit">{isEdit ? "Save" : "Add"}</button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddCategoryForm;
