import styles from "../UI/CSS/Head.module.css";
import logo from "../Assets/Logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AuthAction } from "../Redux store/AuthSlice";
import { ProfileActions } from "../Redux store/ProfileActions";
import { ModalActions } from "../Redux store/ModalSlice";
import { selectCartQty } from "../Redux store/CartSelectors";
import { SellerProductsActions } from "../Redux store/Seller/SellerProductActions";
import { CartActions } from "../Redux store/CartActions";

const Head = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user_name = useSelector((state) => state.profile.name);
  const role = useSelector((state) => state.profile.role);
  const cartQty = useSelector(selectCartQty);

  const displayName = user_name?.trim() ? user_name : "User";

  const editHandler = () => {
    dispatch(ModalActions.setModalContent("User Profile Form"));
    dispatch(ModalActions.setModal());
  };

  const cartHandler = () => {
    dispatch(ModalActions.setModalContent("MyCart"));
    dispatch(ModalActions.setModal());
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(AuthAction.reset());
    dispatch(ProfileActions.resetProfile());
    dispatch(CartActions.reset());
    dispatch(SellerProductsActions.clearFilters());
    navigate("/user/products");
  };

  return (
    <header className={styles.head}>
      <div className={styles.left}>
        <img
          src={logo}
          className={styles.logo}
          alt="logo"
          onClick={() =>
            role === "seller"
              ? navigate("/seller/products")
              : navigate("/user/products")
          }
        />
        {isLoggedIn && role === "user" && (
          <div className={styles.nameBox}>
            <span className={styles.greet}>
              Hello<strong> {displayName}</strong>,
            </span>
            <button className={styles.editBtn} onClick={editHandler}>
              ✏️
            </button>
          </div>
        )}
      </div>

      {isLoggedIn && role === "seller" && (
        <nav className={styles.nav}>
          <NavLink
            to="/seller/products"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/seller/orders"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/seller/category"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            Category
          </NavLink>
        </nav>
      )}

      <div className={styles.rightBox}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.searchBox}
          onChange={(e) =>
            dispatch(SellerProductsActions.setSearchText(e.target.value))
          }
        />

        {isLoggedIn && role === "user" && (
          <>
            <button
              className={styles.iconBtn}
              onClick={() => navigate("/user/favourites")}
            >
              ❤️
            </button>

            <button className={styles.iconBtn} onClick={cartHandler}>
              🛒
              {cartQty > 0 && (
                <span className={styles.cartBadge}>{cartQty}</span>
              )}
            </button>

            <button
              className={styles.iconBtn}
              onClick={() => navigate("/user/orders")}
            >
              📦
            </button>
          </>
        )}

        {!isLoggedIn ? (
          <button
            className={styles.logoutBtn}
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
        ) : (
          <button className={styles.logoutBtn} onClick={logoutHandler}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Head;
