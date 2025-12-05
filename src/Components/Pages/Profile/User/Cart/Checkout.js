import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../../../../UI/CSS/Checkout.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { CartActions } from "../../../../../Redux store/CartActions";
import { selectTotalQty } from "../../../../../Redux store/CartSelectors";
import { selectTotalAmount } from "../../../../../Redux store/CartSelectors";

const Checkout = () => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("cod");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState("");

  const items = useSelector((state) => state.cart.cartItems ?? []);
  const totalQty = useSelector(selectTotalQty);
  const totalAmount = useSelector(selectTotalAmount);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter full name.");
      return false;
    }
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return false;
    }
    if (!address.trim()) {
      setError("Please enter shipping address.");
      return false;
    }
    setError("");
    return true;
  };

  const placeOrderHandler = () => {
    if (!validateForm()) return;

    const order = {
      orderId: "order-" + Date.now(),
      items,
      totalQty,
      totalAmount,
      paymentMethod: payment,
      shipping: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
      },
      createdAt: new Date().toISOString(),
    };
    console.log(order);
    dispatch(CartActions.PlaceOrder(order));

    window.alert(`Order placed using: ${payment}\nAmount: ₹${totalAmount}`);
    dispatch(CartActions.clearCart());
    dispatch(CartActions.updateCart());
    dispatch(ModalActions.unsetModal());
    setName("");
    setPhone("");
    setAddress("");
  };

  const cancelHandler = () => {
    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={Styles.checkoutCard}>
      <h2 className={Styles.title}>Select Payment Method</h2>

      <div className={Styles.formRow}>
        <label className={Styles.label}>Full name</label>
        <input
          className={Styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
      </div>

      <div className={Styles.formRow}>
        <label className={Styles.label}>Phone</label>
        <input
          className={Styles.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile number"
          inputMode="tel"
        />
      </div>

      <div className={Styles.formRow}>
        <label className={Styles.label}>Address</label>
        <textarea
          className={Styles.textarea}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street, city, postal code..."
          rows={3}
        />
      </div>

      <div className={Styles.amountBox}>
        <h2> ₹ {totalAmount}</h2>
      </div>

      {error && <div className={Styles.formError}>{error}</div>}

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
