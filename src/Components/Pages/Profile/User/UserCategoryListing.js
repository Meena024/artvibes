import Styles from "../../../../UI/CSS/UserCategoryListing.module.css";

const UserCategoryListing = ({ category }) => {
  return (
    <div className={Styles.categoryCard}>
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
