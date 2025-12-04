import { useState } from "react";
import Styles from "../../../../UI/CSS/UserProductsListing.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const UserProductsListing = ({ product }) => {
  const [favorite, setFavorite] = useState(false);
  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={Styles.productCard}>
      <div
        className={Styles.favoriteIcon}
        onClick={() => setFavorite(!favorite)}
      >
        {favorite ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      <span className={Styles.categoryTop}>{product.category}</span>

      <img
        src={product.image}
        alt={product.title}
        className={Styles.productImage}
      />

      <div className={Styles.productInfo}>
        <div className={Styles.bottomRow}>
          <h3 className={Styles.title}>{product.title}</h3>
          <span className={Styles.price}>₹{product.price}</span>
        </div>

        <p className={Styles.description}>{product.description}</p>
      </div>

      <div className={Styles.cartControls}>
        <div className={Styles.qtyBox}>
          <button onClick={decreaseQty}>–</button>
          <span>{qty}</span>
          <button onClick={increaseQty}>+</button>
        </div>

        <button className={Styles.addCartBtn}>Add to Cart</button>
      </div>
    </div>
  );
};

export default UserProductsListing;
