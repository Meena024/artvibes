import styles from "../UI/CSS/Head.module.css";
import logo from "../Assets/Logo.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AuthAction } from "../Redux store/AuthSlice";
import { ProfileActions } from "../Redux store/ProfileActions";
import { useState } from "react";
import { ModalActions } from "../Redux store/ModalSlice";

const Head = () => {
  const user_name = useSelector((state) => state.profile.name);
  const userId = useSelector((state) => state.auth.userId);
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(user_name);

  const role = useSelector((state) => state.profile.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editHandler = () => {
    const finalName =
      typeof newName === "string" && newName.trim().length > 0
        ? newName.trim()
        : "User";

    dispatch(ProfileActions.updateName(userId, { name: finalName }));
    setIsEdit(false);
  };

  const favHandler = () => {
    dispatch(ModalActions.setModalContent("MyFav"));
    dispatch(ModalActions.setModal());
  };

  const cartHandler = () => {
    dispatch(ModalActions.setModalContent("MyCart"));
    dispatch(ModalActions.setModal());
  };

  const ordersHandler = () => {
    dispatch(ModalActions.setModalContent("MyOrders"));
    dispatch(ModalActions.setModal());
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(AuthAction.reset());
    dispatch(ProfileActions.resetProfile());
    navigate("/");
  };

  return (
    <header className={styles.head}>
      <div className={styles.left}>
        <img src={logo} className={styles.logo} alt="logo" />

        {!isEdit && (
          <div className={styles.nameBox}>
            <span className={styles.greet}>
              Hello<strong> {user_name}</strong>,
            </span>
            <button className={styles.editBtn} onClick={() => setIsEdit(true)}>
              ✏️
            </button>
          </div>
        )}

        {isEdit && (
          <div className={styles.editBox}>
            <input
              type="text"
              placeholder="Enter name"
              value={newName}
              onChange={(e) => {
                let value = e.target.value;
                value = value.replace(/\s+/g, " ").trim();

                const updated =
                  value.length > 0
                    ? value.charAt(0).toUpperCase() + value.slice(1)
                    : "";

                setNewName(updated);
              }}
              className={styles.nameInput}
            />

            <button onClick={editHandler} className={styles.saveBtn}>
              Save
            </button>
          </div>
        )}
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

            <button className={styles.iconBtn} onClick={favHandler}>
              ❤️
            </button>
            <button className={styles.iconBtn} onClick={cartHandler}>
              🛒
            </button>
            <button className={styles.iconBtn} onClick={ordersHandler}>
              📦
            </button>
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
