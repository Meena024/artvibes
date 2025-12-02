import { useState } from "react";
import styles from "../../../../UI/CSS/Form.module.css";
import Card from "../../../../UI/Card/Card";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
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
    console.log("Product Details:", formData);
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
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
              className={`${styles.input} ${styles.fileInput}`}
            />
          </div>

          <button type="submit">Submit Product</button>
        </form>
      </Card>
    </div>
  );
};

export default AddProductForm;
