import "./Modals.css";
import { useSelector, useDispatch } from "react-redux";
import { ModalActions } from "../../Redux store/ModalSlice";
import AddProductForm from "../../Components/Pages/Profile/Seller/AddProductForm";

const Modals = () => {
  const dispatch = useDispatch();
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const modalContent = useSelector((state) => state.modal.modalContent);
  const imgURL = useSelector((state) => state.profile.profileUrl);

  const renderContent = () => {
    switch (modalContent) {
      case "AddProduct":
        return <AddProductForm />;
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
      default:
        return null;
    }
  };

  const closeModalHandler = () => {
    dispatch(ModalActions.unsetModal());
  };

  return (
    <>
      {isModalVisible && (
        <div className="modal-overlay" onClick={closeModalHandler}>
          <div onClick={(e) => e.stopPropagation()}>{renderContent()}</div>
        </div>
      )}
    </>
  );
};

export default Modals;
