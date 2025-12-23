import { useState, useEffect } from "react";
import styles from "../../../../../UI/CSS/Form.module.css";
import Card from "../../../../../UI/Card/Card";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductActions";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const editCategory = useSelector(
    (state) => state.sellerProducts.edit_category
  );

  const isEdit = Boolean(editCategory);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
  });

  useEffect(() => {
    if (editCategory) {
      setFormData({
        title: editCategory.title ?? "",
        image: editCategory.image ?? "",
      });
    }
  }, [editCategory]);

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "title" ? capitalize(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedData = {
      title: formData.title.trim(),
      image: formData.image.trim(),
    };

    if (isEdit) {
      dispatch(
        SellerProductsActions.updateCategory({
          id: editCategory.id,
          data: cleanedData,
        })
      );
    } else {
      dispatch(SellerProductsActions.addCategory(cleanedData));
    }

    dispatch(SellerProductsActions.resetEditCategory());
    dispatch(ModalActions.unsetModal());
  };

  const handleCancel = () => {
    setFormData({ title: "", image: "" });
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
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Category Name"
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Category Image URL"
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
