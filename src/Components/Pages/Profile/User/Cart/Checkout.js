import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../../../../UI/CSS/Checkout.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("cod");

  const items = useSelector((state) => state.cart.cartItems);
  const totalAmount = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrderHandler = () => {
    window.alert(`Order placed using: ${payment}`);
    dispatch(ModalActions.unsetModal);
  };

  const cancelHandler = () => {
    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={Styles.checkoutCard}>
      <h2 className={Styles.title}>Select Payment Method</h2>

      <div className={Styles.amountBox}>
        <h2> ₹ {totalAmount}</h2>
      </div>

      <div className={Styles.optionsBox}>
        <label className={Styles.option}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={payment === "cod"}
            onChange={() => setPayment("cod")}
          />
          <span className={Styles.radioCustom}></span>
          Cash on Delivery (COD)
        </label>

        <label className={Styles.option}>
          <input
            type="radio"
            name="payment"
            value="online"
            checked={payment === "online"}
            onChange={() => setPayment("online")}
            disabled
          />
          <span className={Styles.radioCustom}></span>
          Online Payment
        </label>
      </div>

      <div className={Styles.btnRow}>
        <button className={Styles.placeBtn} onClick={placeOrderHandler}>
          Place Order
        </button>
        <button className={Styles.cancelBtn} onClick={cancelHandler}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Checkout;
