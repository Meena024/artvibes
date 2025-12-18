import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "../../../../../UI/CSS/Checkout.module.css";
import { ModalActions } from "../../../../../Redux store/ModalSlice";
import { CartActions } from "../../../../../Redux store/CartActions";
import {
  selectTotalQty,
  selectTotalAmount,
} from "../../../../../Redux store/CartSelectors";

const Checkout = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile);
  const items = useSelector((state) => state.cart.cartItems ?? []);
  const totalQty = useSelector(selectTotalQty);
  const totalAmount = useSelector(selectTotalAmount);

  const [payment, setPayment] = useState("cod");

  const savedName = profile.name ?? "";
  const savedPhone = profile.phone ?? "";
  const savedAddresses = profile.address?.length ? profile.address : [];

  const [name, setName] = useState(savedName);
  const [phone, setPhone] = useState(savedPhone);

  // Address now comes from address.place
  const [address, setAddress] = useState(savedAddresses[0]?.place ?? "");

  const [error, setError] = useState("");
  const [orderingForOthers, setOrderingForOthers] = useState(false);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const toggleOrderingForOthers = () => {
    setOrderingForOthers(!orderingForOthers);

    if (!orderingForOthers) {
      setName("");
      setPhone("");
      setAddress("");
    } else {
      setName(savedName);
      setPhone(savedPhone);
      setAddress(savedAddresses[0]?.place ?? "");
      setSelectedAddressIndex(0);
    }
  };

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);

    if (index === -1) {
      setAddress("");
    } else {
      setAddress(savedAddresses[index].place);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("Please enter full name.");
      return false;
    }
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return false;
    }
    if (!address.trim()) {
      setError("Please select or enter an address.");
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

    dispatch(CartActions.PlaceOrder(order));
    window.alert(`Order placed using: ${payment}\nAmount: ₹${totalAmount}`);

    dispatch(CartActions.clearCart());
    dispatch(CartActions.updateCart());
    dispatch(ModalActions.unsetModal());
  };

  const cancelHandler = () => {
    dispatch(ModalActions.unsetModal());
  };

  return (
    <div className={Styles.checkoutCard}>
      <h2 className={Styles.title}>Checkout</h2>

      <label className={Styles.checkboxRow}>
        <input
          type="checkbox"
          checked={orderingForOthers}
          onChange={toggleOrderingForOthers}
        />
        Ordering for someone else?
      </label>

      <div className={Styles.formRow}>
        <label className={Styles.label}>Full name</label>
        <input
          className={Styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
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

      {!orderingForOthers && savedAddresses.length > 0 && (
        <div className={Styles.formRow}>
          <label className={Styles.label}>Select Address</label>

          <select
            className={Styles.input}
            value={selectedAddressIndex}
            onChange={(e) => handleAddressSelect(Number(e.target.value))}
          >
            {savedAddresses.map((addr, i) => (
              <option key={i} value={i}>
                {addr.title || `Address ${i + 1}`}
              </option>
            ))}
            <option value={-1}>Custom Address</option>
          </select>
        </div>
      )}

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
      <h3 className={Styles.subTitle}>Select Payment Method</h3>

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
