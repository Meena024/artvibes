import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAllOrders,
  updateItemStatus,
} from "../../../../../Redux store/CartActions";
import SellerOrderListing from "./SellerOrdersListing";

const SellerOrders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await dispatch(fetchAllOrders());
      setOrders(result);
    };
    load();
  }, [dispatch]);

  const handleItemStatusChange = async (
    orderId,
    pur_UserId,
    itemIndex,
    newStatus
  ) => {
    await dispatch(updateItemStatus(orderId, pur_UserId, itemIndex, newStatus));

    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              items: order.items.map((item, index) =>
                index === itemIndex ? { ...item, status: newStatus } : item
              ),
            }
          : order
      )
    );
  };

  return (
    <div>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <SellerOrderListing
            key={order.orderId}
            order={order}
            onItemStatusChange={handleItemStatusChange}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "100px" }}>
          No orders found.
        </p>
      )}
    </div>
  );
};

export default SellerOrders;
