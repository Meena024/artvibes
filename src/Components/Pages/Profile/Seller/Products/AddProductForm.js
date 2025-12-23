import { useState, useEffect } from "react";
import styles from "../../../../../UI/CSS/Form.module.css";
import Card from "../../../../../UI/Card/Card";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductActions";

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  category: "",
  image: "",
};

const AddProductForm = () => {
  const dispatch = useDispatch();

  const editProduct = useSelector((state) => state.sellerProducts.edit_product);
  const categoriesState = useSelector((state) => state.sellerProducts.category);

  const isEdit = Boolean(editProduct);

  const [formData, setFormData] = useState(EMPTY_FORM);

  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title ?? "",
        description: editProduct.description ?? "",
        price: editProduct.price ?? "",
        category: editProduct.category ?? "",
        image: editProduct.image ?? "",
      });
    } else {
      setFormData(EMPTY_FORM);
    }
  }, [editProduct]);

  const categories = Array.isArray(categoriesState)
    ? categoriesState.map((cat) => cat.title)
    : [];

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "title" || name === "description") {
      newValue = capitalize(newValue);
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (isEdit) {
      dispatch(
        SellerProductsActions.updateProduct({
          id: editProduct.id,
          data: formData,
        })
      );
    } else {
      dispatch(SellerProductsActions.addProduct(formData));
    }

    dispatch(SellerProductsActions.resetEditProduct());
    dispatch(ModalActions.unsetModal());
  };

  const handleCancel = () => {
    dispatch(SellerProductsActions.resetEditProduct());
    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={styles.authFormCenter}>
      <Card>
        <h1 className={styles.title}>
          {isEdit ? "Edit Product" : "Add Product"}
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Product Title */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {/* Description */}
          <div className={styles.inputWrapper}>
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              required
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>

          {/* Price */}
          <div className={styles.inputWrapper}>
            <input
              type="number"
              name="price"
              placeholder="Price (INR)"
              value={formData.price}
              onChange={handleChange}
              required
              className={styles.input}
              min="1"
            />
          </div>

          {/* Category */}
          <div className={styles.inputWrapper}>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={`${styles.input} ${styles.select}`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          {/* Buttons */}
          <div>
            <button type="submit">
              {isEdit ? "Edit Product" : "Add Product"}
            </button>

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProductForm;
