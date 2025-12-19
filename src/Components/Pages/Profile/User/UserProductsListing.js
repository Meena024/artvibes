import { useState } from "react";
import Styles from "../../../../UI/CSS/UserProductsListing.module.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../../../../Redux store/CartActions";
import { ModalActions } from "../../../../Redux store/ModalSlice";

const UserProductsListing = ({ product }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const favItems = useSelector((state) => state.cart.favItems);
  const isFav = favItems.some((item) => item.id === product.id);

  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((prev) => prev + 1);
  const decreaseQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleFavorite = () => {
    if (!isLoggedIn) {
      alert("You are not Logged In");
      return;
    }
    if (isFav) {
      dispatch(CartActions.removeFromFav(product.id));
    } else {
      dispatch(
        CartActions.addToFav({
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          category: product.category,
          description: product.description,
        })
      );
    }
  };

  const detailedViewHandler = () => {
    dispatch(ModalActions.setModalContent("DetailedView"));
    dispatch(ModalActions.setModalData(product));
    dispatch(ModalActions.setModal());
  };

  const handleAddToCart = () => {
    dispatch(CartActions.addItem({ ...product, qty, status: "pending" }));
    dispatch(CartActions.updateCart());
    setQty(1);
  };

  return (
    <div
      className={`${Styles.productCard} ${isLoggedIn ? Styles.loggedIn : ""}`}
    >
      <div className={Styles.favoriteIcon} onClick={toggleFavorite}>
        {isFav ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>

      <span className={Styles.categoryTop}>{product.category}</span>

      <img
        src={product.image}
        alt={product.title}
        className={Styles.productImage}
        onClick={detailedViewHandler}
      />

      <div className={Styles.productInfo}>
        <div className={Styles.bottomRow}>
          <h3 className={Styles.title}>{product.title}</h3>
          <span className={Styles.price}>₹{product.price}</span>
        </div>

        <p className={Styles.description}>{product.description}</p>
      </div>

      {isLoggedIn && (
        <div className={Styles.cartControls}>
          <div className={Styles.qtyBox}>
            <button onClick={decreaseQty}>–</button>
            <span>{qty}</span>
            <button onClick={increaseQty}>+</button>
          </div>

          <button className={Styles.addCartBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProductsListing;
