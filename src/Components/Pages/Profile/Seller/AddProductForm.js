import { useState } from "react";
import styles from "../../../../UI/CSS/Form.module.css";
import Card from "../../../../UI/Card/Card";
import { ModalActions } from "../../../../Redux store/ModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../Redux store/Seller/SellerProductsSlice";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const sellerId = useSelector((state) => state.auth.userId);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
    sellerId,
  });

  const categories = [
    "Art",
    "Painting",
    "Digital Print",
    "Handmade Craft",
    "Photography",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SellerProductsActions.addProduct(formData));

    console.log("Product Added:", formData);

    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={styles.authFormCenter}>
      <Card>
        <h1 className={styles.title}>Add Product</h1>

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
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className={styles.input}
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
          <div>
            <button type="submit">Add Product</button>
            <button
              type="button"
              onClick={() => dispatch(ModalActions.unsetModal())}
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddProductForm;
