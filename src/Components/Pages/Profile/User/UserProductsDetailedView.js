import Styles from "../../../../UI/CSS/UserProductsDetailedView.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { CartActions } from "../../../../Redux store/CartActions";

const UserProductsDetailedView = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = () => {
    dispatch(CartActions.addItem({ ...product, qty }));
    dispatch(CartActions.updateCart());
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={Styles.right}>
        <span className={Styles.space_between}>
          <span className={Styles.title}>{product.title}</span>
          <span className={Styles.category}>{product.category}</span>
        </span>
        <p className={Styles.description}>{product.description}</p>

        <div className={Styles.price}>₹{product.price}</div>

        <span className={Styles.space_evenly}>
          <div className={Styles.qtyBox}>
            <button onClick={decreaseQty}>–</button>
            <span>{qty}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button className={Styles.addCartBtn} onClick={addToCart}>
            Add to Cart
          </button>
        </span>
      </div>
    </div>
  );
};

export default UserProductsDetailedView;
