import { Routes, Route, Outlet, useLocation, Navigate } from "react-router";
import { useSelector } from "react-redux";
import { useAuthInitializer } from "../Components/Pages/Authentication/AuthInitializer";

import Header from "./Header";
import Head from "./Head";
import Modals from "../UI/Modal/Modals";

import ProtectedRoute from "./Route/ProtectedRoute";
import PublicRoute from "./Route/PublicRoute";
import SellerProtectedRoute from "./Route/SellerProtectedRoute";

import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";

import SellerProduct from "./Pages/Profile/Seller/Products/Products";
import SellerCategory from "./Pages/Profile/Seller/Category/Category";
import SellerOrders from "./Pages/Profile/Seller/Orders/SellerOrders";

import UserProducts from "./Pages/Profile/User/UserProducts";
import UserOrders from "./Pages/Profile/User/Cart/UserOrders";
import Favourites from "./Pages/Profile/User/Cart/Favorites";

const Main = () => {
  useAuthInitializer();

  const location = useLocation();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.profile.role);
  const isLoading = useSelector((state) => state.auth.loading);

  const authPages = ["/Login", "/SignUp", "/SellerSignUp", "/ForgotPassword"];

  const showHeader = authPages.includes(location.pathname);

  if (isLoggedIn && isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Modals />

      {showHeader ? <Header /> : <Head />}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              role === "seller" ? (
                <Navigate to="/seller/products" replace />
              ) : (
                <Navigate to="/user/products" replace />
              )
            ) : (
              <Navigate to="/user/products" replace />
            )
          }
        />

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

        <Route path="/" element={<Outlet />}>
          <Route
            path="seller/products"
            element={
              <SellerProtectedRoute
                isLoggedIn={isLoggedIn}
                role={role}
                allowedRole="seller"
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
                allowedRole="seller"
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
                allowedRole="seller"
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
                allowedRole="user"
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
                allowedRole="user"
              >
                <Favourites />
              </ProtectedRoute>
            }
          />

          <Route
            path="user/*"
            element={<Navigate to="/user/products" replace />}
          />

          <Route
            path="seller/*"
            element={<Navigate to="/seller/products" replace />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default Main;
