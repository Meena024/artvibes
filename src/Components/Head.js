import styles from "../UI/CSS/Head.module.css";
import logo from "../Assets/Logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AuthAction } from "../Redux store/AuthSlice";
import { ProfileActions } from "../Redux store/ProfileSlice";

const Head = () => {
  const user_name = useSelector((state) => state.profile.name);
  const role = useSelector((state) => state.profile.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(AuthAction.reset());
    dispatch(ProfileActions.reset());
    navigate("/");
  };

  return (
    <header className={styles.head}>
      <div className={styles.left}>
        <img src={logo} className={styles.logo} alt="logo" />
        <span className={styles.greet}>Hello {user_name},</span>
        <button className={styles.editBtn}>
          <span>✏️</span>
        </button>
      </div>

      {role === "seller" && (
        <nav className={styles.nav}>
          <NavLink
            to="/Profile/seller/products"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/Profile/seller/orders"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            Order Details
          </NavLink>

          <NavLink
            to="/Profile/seller/category"
            className={({ isActive }) =>
              isActive ? styles.activeNavItem : styles.navItem
            }
          >
            Category
          </NavLink>
        </nav>
      )}

      <div className={styles.rightBox}>
        {role === "user" && (
          <div className={styles.userMenu}>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchBox}
            />

            <button className={styles.iconBtn}>❤️</button>
            <button className={styles.iconBtn}>🛒</button>
            <button className={styles.iconBtn}>📦</button>
          </div>
        )}

        <button className={styles.logoutBtn} onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Head;
