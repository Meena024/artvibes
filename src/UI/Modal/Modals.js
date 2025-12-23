import "./Modals.css";
import { useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../../Redux store/ModalSlice";
import AddProductForm from "../../Components/Pages/Profile/Seller/Products/AddProductForm";
import AddCategoryForm from "../../Components/Pages/Profile/Seller/Category/AddCategoryForm";
import Cart from "../../Components/Pages/Profile/User/Cart/Cart";
import Checkout from "../../Components/Pages/Profile/User/Cart/Checkout";
import UserProfileForm from "../../Components/Pages/Profile/User/UserProfileForm";
import UserProductsDetailedView from "../../Components/Pages/Profile/User/UserProductsDetailedView";

const Modals = () => {
  const dispatch = useDispatch();

  const { isModalVisible, modalContent, modalData } = useSelector(
    (state) => state.modal
  );
  const imgURL = useSelector((state) => state.profile.profileUrl);

  const renderContent = useCallback(() => {
    switch (modalContent) {
      case "User Profile Form":
        return <UserProfileForm />;

      case "AddProduct":
        return <AddProductForm />;

      case "AddCategory":
        return <AddCategoryForm />;

      case "MyCart":
        return <Cart />;

      case "Checkout":
        return <Checkout />;

      case "ZoomImage":
        return (
          <img
            src={imgURL}
            alt="Profile"
            height={500}
            width={500}
            className="rounded border"
          />
        );

      case "DetailedView":
        return <UserProductsDetailedView product={modalData} />;

      default:
        return null;
    }
  }, [modalContent, modalData, imgURL]);

  const closeModalHandler = () => {
    dispatch(ModalActions.unsetModal());
  };

  if (!isModalVisible) return null;

  return (
    <div className="modal-overlay" onClick={closeModalHandler}>
      <div onClick={(e) => e.stopPropagation()}>{renderContent()}</div>
    </div>
  );
};

export default memo(Modals);
