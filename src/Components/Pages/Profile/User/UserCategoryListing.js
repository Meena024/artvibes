import { useDispatch, useSelector } from "react-redux";
import { SellerProductsActions } from "../../../../Redux store/Seller/SellerProductActions";
import Styles from "../../../../UI/CSS/UserCategoryListing.module.css";

const UserCategoryListing = ({ category }) => {
  const dispatch = useDispatch();

  const selectedCategories = useSelector(
    (state) => state.sellerProducts.selectedCategories
  );

  if (!category) return null;

  const selected = category.isFavCategory
    ? selectedCategories.includes("__FAV__")
    : selectedCategories.includes(category.title);

  const toggleCategory = () => {
    dispatch(
      SellerProductsActions.toggleSelectedCategory(
        category.isFavCategory ? "__FAV__" : category.title
      )
    );
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
