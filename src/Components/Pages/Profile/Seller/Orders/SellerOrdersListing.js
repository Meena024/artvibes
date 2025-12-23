import styles from "../../../../../UI/CSS/SellerOrders.module.css";

const SellerOrderListing = ({ order, onItemStatusChange }) => {
  if (!order) return null;

  const {
    orderId,
    userId,
    createdAt,
    items = [],
    totalAmount = 0,
    paymentMethod = "",
    shipping = {},
  } = order;

  const date = createdAt ? new Date(createdAt).toLocaleString() : "N/A";

  const handleStatusChange = (index, value) => {
    if (typeof onItemStatusChange === "function") {
      onItemStatusChange(orderId, userId, index, value);
    }
  };

  return (
    <div className={styles.orderCard}>
      {/* ORDER HEADER */}
      <div className={styles.orderHeader}>
        <div>
          <p className={styles.orderId}>Order Id: #{orderId}</p>
          <p className={styles.date}>Date: {date}</p>
          <p className={styles.payment}>
            Payment: {paymentMethod.toUpperCase() || "N/A"}
          </p>
        </div>

        <div className={styles.amountBox}>
          <h3>₹{totalAmount}</h3>
        </div>
      </div>

      {/* ITEMS LIST */}
      <div className={styles.itemsWrapper}>
        {items.length === 0 && (
          <p className={styles.noItems}>No items in this order.</p>
        )}

        {items.map((item, index) => (
          <div key={item.id ?? index} className={styles.itemCard}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.itemImage}
            />

            <div className={styles.itemInfo}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.qty}>Qty: {item.qty}</p>
            </div>

            <p className={styles.itemPrice}>₹{item.price}</p>

            {/* INDIVIDUAL ITEM STATUS UPDATE */}
            <select
              className={styles.statusSelect}
              value={item.status}
              onChange={(e) => handleStatusChange(index, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>

      {/* SHIPPING DETAILS */}
      <div className={styles.shippingBox}>
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
  );
};

export default SellerOrderListing;
