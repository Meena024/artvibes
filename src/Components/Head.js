import styles from "../UI/CSS/Head.module.css";
import logo from "../Assets/Logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AuthAction } from "../Redux store/AuthSlice";
import { ProfileActions } from "../Redux store/ProfileSlice";

const Head = () => {
  const user_name = useSelector((state) => state.profile.name);
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
        <span>Hello {user_name},</span>
      </div>

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

      <button className={styles.logoutBtn} onClick={logoutHandler}>
        Logout
      </button>
    </header>
  );
};

export default Head;
