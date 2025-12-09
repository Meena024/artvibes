import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllOrders } from "../../../../Redux store/CartActions";

const SellerOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadOrders = async () => {
      const orders = await dispatch(fetchAllOrders());
      console.log("FINAL ORDER LIST VISIBLE IN SELLER PAGE:", orders);
    };

    loadOrders();
  }, [dispatch]);

  return <div>Orders</div>;
};

export default SellerOrders;
