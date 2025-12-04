import { useSelector, useDispatch } from "react-redux";
import Styles from "../../../../../UI/CSS/Cart.module.css";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { CartActions } from "../../../../../Redux store/CartActions";
import { ModalActions } from "../../../../../Redux store/ModalSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);
  const items = useSelector((state) => state.cart.cartItems ?? []);
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const increaseQty = (id, qty) => {
    dispatch(
      CartActions.updateQty({
        id,
        qty: Number(qty) + 1,
      })
    );
    console.log(CartActions.updateCart);
    dispatch(CartActions.updateCart(userId));
  };

  const decreaseQty = (id, qty) => {
    if (qty > 1) {
      dispatch(
        CartActions.updateQty({
          id,
          qty: qty - 1,
        })
      );
      dispatch(CartActions.updateCart(userId));
    }
  };

  const removeItem = (id) => {
    dispatch(CartActions.removeItem(id));
    dispatch(CartActions.updateCart(userId));
  };

  const checkoutHandler = () => {
    dispatch(ModalActions.setModalContent("Checkout"));
    dispatch(ModalActions.setModal());
  };

  return (
    <div className={Styles.cartBox}>
      <h2 className={Styles.cartTitle}>Your Cart</h2>

      {items.length === 0 && (
        <div className={Styles.emptyState}>Your cart is empty 😊</div>
      )}

      {items.map((item) => (
        <div key={item.id} className={Styles.cartItem}>
          <img src={item.image} alt={item.title} className={Styles.itemImage} />

          <div className={Styles.itemDetails}>
            <h3 className={Styles.itemTitle}>{item.title}</h3>
            <p className={Styles.itemPrice}>₹{item.price}</p>

            <div className={Styles.qtyControls}>
              <button onClick={() => decreaseQty(item.id, item.qty)}>
                <FaMinus />
              </button>
              <span>{item.qty}</span>
              <button onClick={() => increaseQty(item.id, item.qty)}>
                <FaPlus />
              </button>
            </div>
          </div>

          <button
            className={Styles.removeBtn}
            onClick={() => removeItem(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      ))}

      {items.length > 0 && (
        <div className={Styles.summaryBox}>
          <div className={Styles.summaryRowTotal}>
            <span>Total</span>
            <span> [Qty: {totalQty}]</span>
            <span>₹{totalAmount}</span>
          </div>

          <button className={Styles.checkoutBtn} onClick={checkoutHandler}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
