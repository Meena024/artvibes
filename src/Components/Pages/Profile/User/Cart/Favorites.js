import { useSelector } from "react-redux";
import Styles from "../../../../../UI/CSS/Favourites.module.css";
import UserProductsListing from "../UserProductsListing";

const Favourites = () => {
  const favItems = useSelector((state) => state.cart.favItems);

  return (
    <div>
      <div className={Styles.titleWrapper}>
        <div className={Styles.title}>Favourites</div>
      </div>

      <div className={Styles.productsContainer}>
        {favItems.map((product) => {
          return <UserProductsListing key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Favourites;
