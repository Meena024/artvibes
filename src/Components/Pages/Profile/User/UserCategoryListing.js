import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../Redux store/Seller/SellerProductActions";
import Styles from "../../../../UI/CSS/UserCategoryListing.module.css";

const UserCategoryListing = ({ category }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) =>
    category.isFavCategory
      ? state.sellerProducts.selectedCategories.includes("__FAV__")
      : state.sellerProducts.selectedCategories.includes(category.title)
  );

  const toggleCategory = () => {
    if (category.isFavCategory) {
      dispatch(SellerProductsActions.toggleSelectedCategory("__FAV__"));
    } else {
      dispatch(SellerProductsActions.toggleSelectedCategory(category.title));
    }
  };

  return (
    <div
      className={`${Styles.categoryCard} ${selected ? Styles.active : ""}`}
      onClick={toggleCategory}
    >
      <div className={Styles.categoryTitle}>{category.title}</div>

      <img
        src={category.image}
        alt={category.title}
        className={Styles.categoryImage}
      />
    </div>
  );
};

export default UserCategoryListing;
