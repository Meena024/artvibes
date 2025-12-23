import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../../Redux store/Seller/SellerProductActions";
import { CartActions } from "../../../../../Redux store/CartActions";
import SellerOrderListing from "./SellerOrdersListing";

const SellerOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.sellerProducts.allOrders) || [];

  const isLoading = useSelector((state) => state.sellerProducts.loading);

  useEffect(() => {
    dispatch(SellerProductsActions.fetchAllOrders());
  }, [dispatch]);

  const handleItemStatusChange = async (
    orderId,
    pur_UserId,
    itemIndex,
    newStatus
  ) => {
    await dispatch(
      CartActions.updateItemStatus(orderId, pur_UserId, itemIndex, newStatus)
    );

    // Re-fetch orders to stay in sync
    dispatch(SellerProductsActions.fetchAllOrders());
  };

  if (isLoading) {
    return (
      <p style={{ textAlign: "center", marginTop: "100px" }}>
        Loading orders...
      </p>
    );
  }

  return (
    <div>
      {orders.length > 0 ? (
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
