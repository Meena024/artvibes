import { useSelector } from "react-redux";
import UserProductsListing from "./UserProductsListing";
import UserCategoryListing from "./UserCategoryListing";
import Styles from "../../../../UI/CSS/UserProducts.module.css";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const UserProducts = () => {
  const navigate = useNavigate();

  const role = useSelector((state) => state.profile.role);
  const products = useSelector((state) => state.sellerProducts.products);
  const categories = useSelector((state) => state.sellerProducts.category);
  const favItems = useSelector((state) => state.cart.favItems);
  const searchText = useSelector((state) => state.sellerProducts.searchText);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const selectedCategories = useSelector(
    (state) => state.sellerProducts.selectedCategories
  );

  useEffect(() => {
    if (role === "seller") {
      navigate("/seller/products");
    }
  }, [role, navigate]);

  const [sortOrder, setSortOrder] = useState("default");

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

  /* ---------------------- CATEGORY & FAV FILTER ---------------------- */
  const hasFavFilter = selectedCategories.includes("__FAV__");

  const normalCategories = selectedCategories.filter((c) => c !== "__FAV__");

  let filtered = products;

  if (normalCategories.length > 0) {
    filtered = filtered.filter((p) => normalCategories.includes(p.category));
  }

  if (hasFavFilter && isLoggedIn) {
    const favIds = favItems.map((item) => item.id);
    filtered = filtered.filter((p) => favIds.includes(p.id));
  }

  const search = searchText.toLowerCase();
  filtered = filtered.filter((p) => {
    return (
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      String(p.price).includes(search)
    );
  });

  const sortedProducts = [...filtered];

  if (sortOrder === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className={Styles.pageBackground}>
      <div className={Styles.categoryWrapper}>
        <button className={Styles.scrollBtnLeft} onClick={scrollLeft}>
          ❮
        </button>

        <div className={Styles.categoriesContainer} ref={scrollRef}>
          {isLoggedIn && <UserCategoryListing category={MyFav} />}
          {categories.map((c) => (
            <UserCategoryListing key={c.id} category={c} />
          ))}
        </div>

        <button className={Styles.scrollBtnRight} onClick={scrollRight}>
          ❯
        </button>
      </div>

      <div className={Styles.sortBar}>
        <label className={Styles.sortLabel}>Sort by Price:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={Styles.sortSelect}
        >
          <option value="default">Default</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      <div className={Styles.productsContainer}>
        {sortedProducts.map((p) => (
          <UserProductsListing key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default UserProducts;
