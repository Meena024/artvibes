import { useSelector } from "react-redux";
import Styles from "../../../../../UI/CSS/Orders.module.css";

const UserOrders = () => {
  const orders = useSelector((state) => state.cart.orders) || [];

  return (
    <div className={Styles.ordersContainerGrid}>
      <h2 className={Styles.heading}>My Orders</h2>

      {orders.length === 0 && (
        <div className={Styles.noOrders}>No orders yet 😊</div>
      )}

      {orders.map((order) => {
        const shipping = order.shipping || {};
        const items = order.items || [];
        const createdAt = order.createdAt
          ? new Date(order.createdAt).toLocaleString()
          : "N/A";

        return (
          <div key={order.orderId} className={Styles.orderCardWide}>
            {/* ---------- LEFT COLUMN ---------- */}
            <div className={Styles.leftColumn}>
              <div className={Styles.orderHeader}>
                <span className={Styles.orderId}>
                  <strong>Order Id:</strong> #{order.orderId}
                </span>

                <p>
                  <strong>Date:</strong> {createdAt}
                </p>

                {/* Payment + Amount on same row */}
                <div className={Styles.paymentRow}>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {(order.paymentMethod || "").toUpperCase()}
                  </p>
                  <strong className={Styles.amountRight}>
                    ₹{order.totalAmount ?? 0}
                  </strong>
                </div>
              </div>

              {/* ---------- SHIPPING ---------- */}
              <div className={Styles.shippingCard}>
                <h4>Shipping Details</h4>
                <p>
                  <strong>Name:</strong> {shipping.name || "N/A"}
                </p>
                <p>
                  <strong>Phone:</strong> {shipping.phone || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {shipping.address || "N/A"}
                </p>
              </div>
            </div>

            {/* ---------- RIGHT COLUMN (ITEMS) ---------- */}
            <div className={Styles.rightColumn}>
              {items.map((item) => (
                <div key={item.id} className={Styles.itemRow}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={Styles.itemImageLarge}
                  />

                  <div className={Styles.itemDetails}>
                    <h4>{item.title}</h4>
                    <p>Qty: {item.qty}</p>
                  </div>

                  {/* Item-specific status */}
                  <span
                    className={`${Styles.itemStatus} ${
                      Styles[item.status] || ""
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* Price */}
                  <div className={Styles.itemPriceLarge}>
                    ₹{item.price ?? 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserOrders;
