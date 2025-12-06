import { useSelector } from "react-redux";
import UserProductsListing from "./UserProductsListing";
import UserCategoryListing from "./UserCategoryListing";
import Styles from "../../../../UI/CSS/UserProducts.module.css";
import { useRef } from "react";

const UserProducts = () => {
  const products = useSelector((state) => state.sellerProducts.products);
  const categories = useSelector((state) => state.sellerProducts.category);
  const favItems = useSelector((state) => state.cart.favItems);
  const searchText = useSelector((state) => state.sellerProducts.searchText);

  const selectedCategories = useSelector(
    (state) => state.sellerProducts.selectedCategories
  );

  const MyFav = {
    title: "My Favourites",
    image:
      "https://blog.mobiscroll.com/wp-content/uploads/2016/06/favorites.png",
    isFavCategory: true,
  };

  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  const hasFavFilter = selectedCategories.includes("__FAV__");

  const normalCategories = selectedCategories.filter((c) => c !== "__FAV__");

  let filtered = products;

  if (normalCategories.length > 0) {
    filtered = filtered.filter((p) => normalCategories.includes(p.category));
  }

  if (hasFavFilter) {
    const favIds = favItems.map((item) => item.id);
    filtered = filtered.filter((p) => favIds.includes(p.id));
  }

  const search = searchText.toLowerCase();

  const finalFiltered = filtered.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(search);
    const descMatch = p.description.toLowerCase().includes(search);
    const priceMatch = String(p.price).includes(search);

    return titleMatch || descMatch || priceMatch;
  });

  return (
    <div>
      <div>
        <div className={Styles.categoryWrapper}>
          <button className={Styles.scrollBtnLeft} onClick={scrollLeft}>
            ❮
          </button>

          <div className={Styles.categoriesContainer} ref={scrollRef}>
            <UserCategoryListing category={MyFav} />
            {categories.map((c) => (
              <UserCategoryListing key={c.id} category={c} />
            ))}
          </div>

          <button className={Styles.scrollBtnRight} onClick={scrollRight}>
            ❯
          </button>
        </div>

        <div className={Styles.productsContainer}>
          {finalFiltered.map((p) => (
            <UserProductsListing key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProducts;
