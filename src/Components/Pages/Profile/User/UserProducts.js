import { useSelector } from "react-redux";
import UserProductsListing from "./UserProductsListing";
import UserCategoryListing from "./UserCategoryListing";
import Styles from "../../../../UI/CSS/UserProducts.module.css";
import { useRef } from "react";

const UserProducts = () => {
  const products = useSelector((state) => state.sellerProducts.products);
  const categories = useSelector((state) => state.sellerProducts.category);

  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        <div className={Styles.categoryWrapper}>
          <button className={Styles.scrollBtnLeft} onClick={scrollLeft}>
            ❮
          </button>

          <div className={Styles.categoriesContainer} ref={scrollRef}>
            {categories.map((c) => (
              <UserCategoryListing category={c} />
            ))}
          </div>

          <button className={Styles.scrollBtnRight} onClick={scrollRight}>
            ❯
          </button>
        </div>

        <div className={Styles.productsContainer}>
          {products.map((p) => (
            <UserProductsListing product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
