import { useSelector } from "react-redux";
import { Routes, Route, Outlet } from "react-router";
import Header from "./Header";
import ProtectedRoute from "./Route/ProtectedRoute";
import PublicRoute from "./Route/PublicRoute";
import ProfileMain from "./Pages/Profile/ProfileMain";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import { useAuthInitializer } from "../Components/Pages/Authentication/AuthInitializer";
import Head from "./Head";
import SellerProduct from "./Pages/Profile/Seller/Products/Products";
import SellerCategory from "./Pages/Profile/Seller/Category/Category";
import SellerOrders from "./Pages/Profile/Seller/Orders";
import UserProducts from "./Pages/Profile/User/UserProducts";
import Modals from "../UI/Modal/Modals";
import UserOrders from "./Pages/Profile/User/Cart/UserOrders";

const Main = () => {
  useAuthInitializer();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Modals />
      {!isLoggedIn && <Header />}
      {isLoggedIn && <Head />}
      <Routes>
        {/* Redirects based on user role */}
        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileMain />
            </ProtectedRoute>
          }
        />

        {/* Public Authentication Routes */}
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
        <Route
          path="/"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login />
            </PublicRoute>
          }
        />

        {/* Unified Profile Routes */}
        <Route
          path="/Profile/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          {/* Seller Routes */}
          <Route path="seller/products" element={<SellerProduct />} />
          <Route path="seller/orders" element={<SellerOrders />} />
          <Route path="seller/category" element={<SellerCategory />} />

          {/* User Routes */}
          <Route path="user/products" element={<UserProducts />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </>
  );
};

export default Main;
