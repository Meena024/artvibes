import { useState } from "react";
import Styles from "../../../../UI/CSS/UserProductsListing.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const UserProductsListing = ({ product }) => {
  const [favorite, setFavorite] = useState(false);

  return (
    <div className={Styles.productCard}>
      <div
        className={Styles.favoriteIcon}
        onClick={() => setFavorite(!favorite)}
      >
        {favorite ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      <img
        src={product.image}
        alt={product.title}
        className={Styles.productImage}
      />

      <div className={Styles.productInfo}>
        <h3 className={Styles.title}>{product.title}</h3>
        <p className={Styles.description}>{product.description}</p>

        <div className={Styles.bottomRow}>
          <span className={Styles.price}>₹{product.price}</span>
          <span className={Styles.category}>{product.category}</span>
        </div>
      </div>

      <button className={Styles.addCartBtn}>Add to Cart</button>
    </div>
  );
};

export default UserProductsListing;
