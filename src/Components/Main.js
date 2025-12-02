import { useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import Header from "./Header";
import ProtectedRoute from "./Route/ProtectedRoute";
import PublicRoute from "./Route/PublicRoute";
import ProfileMain from "./Pages/Profile/ProfileMain";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import { useAuthInitializer } from "../Components/Pages/Authentication/AuthInitializer";
import Head from "./Head";
import SellerProduct from "./Pages/Profile/Seller/Products";
import SellerCategory from "./Pages/Profile/Seller/Category";
import SellerProfile from "./Pages/Profile/SellerProfile";
import SellerOrders from "./Pages/Profile/Seller/Orders";
import Modals from "../UI/Modal/Modals";

const Main = () => {
  useAuthInitializer();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <Modals />
      {!isLoggedIn && <Header />}
      {isLoggedIn && <Head />}
      <Routes>
        <Route
          path="/UserProfile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileMain />
            </ProtectedRoute>
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
        <Route
          path="/"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/SellerProfile/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SellerProfile />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerProduct />} />
          <Route path="Products" element={<SellerProduct />} />
          <Route path="Orders" element={<SellerOrders />} />
          <Route path="Category" element={<SellerCategory />} />
        </Route>

        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </>
  );
};

export default Main;
