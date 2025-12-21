import { Routes, Route, Outlet, useLocation, Navigate } from "react-router";
import Header from "./Header";
import ProtectedRoute from "./Route/ProtectedRoute";
import PublicRoute from "./Route/PublicRoute";
import SellerProtectedRoute from "./Route/SellerProtectedRoute";
import ProfileMain from "./Pages/Profile/ProfileMain";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import { useAuthInitializer } from "../Components/Pages/Authentication/AuthInitializer";
import Head from "./Head";
import SellerProduct from "./Pages/Profile/Seller/Products/Products";
import SellerCategory from "./Pages/Profile/Seller/Category/Category";
import SellerOrders from "./Pages/Profile/Seller/Orders/SellerOrders";
import UserProducts from "./Pages/Profile/User/UserProducts";
import Modals from "../UI/Modal/Modals";
import UserOrders from "./Pages/Profile/User/Cart/UserOrders";
import Favourites from "./Pages/Profile/User/Cart/Favorites";
import { useSelector } from "react-redux";

const Main = () => {
  useAuthInitializer();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.profile.role);
  const authPages = ["/Login", "/SignUp", "/SellerSignUp", "/ForgotPassword"];

  const showHeader = authPages.includes(location.pathname);

  return (
    <>
      <Modals />

      {showHeader ? <Header /> : <Head />}

      <Routes>
        <Route path="/Profile" element={<ProfileMain />} />

        <Route
          path="/Login"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/SignUp"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/SellerSignUp"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/ForgotPassword"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route path="/Profile/*" element={<Outlet />}>
          <Route
            path="seller/products"
            element={
              <SellerProtectedRoute
                isLoggedIn={isLoggedIn}
                role={role}
                allowedRole={"seller"}
              >
                <SellerProduct />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="seller/orders"
            element={
              <SellerProtectedRoute
                isLoggedIn={isLoggedIn}
                role={role}
                allowedRole={"seller"}
              >
                <SellerOrders />
              </SellerProtectedRoute>
            }
          />

          <Route
            path="seller/category"
            element={
              <SellerProtectedRoute
                isLoggedIn={isLoggedIn}
                role={role}
                allowedRole={"seller"}
              >
                <SellerCategory />
              </SellerProtectedRoute>
            }
          />

          <Route path="user/products" element={<UserProducts />} />

          <Route
            path="user/orders"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                role={role}
                allowedRole={"user"}
              >
                <UserOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/favourites"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                role={role}
                allowedRole={"user"}
              >
                <Favourites />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/*"
            element={<Navigate to="/Profile/user/products" replace />}
          />

          <Route
            path="seller/*"
            element={<Navigate to="/Profile/seller/products" replace />}
          />
        </Route>

        <Route
          path="/"
          element={<Navigate to="/Profile/user/products" replace />}
        />

        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </>
  );
};

export default Main;
