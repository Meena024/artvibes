import { Routes, Route, Outlet, useLocation, Navigate } from "react-router";
import Header from "./Header";
// import ProtectedRoute from "./Route/ProtectedRoute";
// import PublicRoute from "./Route/PublicRoute";
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

const Main = () => {
  useAuthInitializer();
  const location = useLocation();

  const authPages = ["/Login", "/SignUp", "/SellerSignUp", "/ForgotPassword"];

  const showHeader = authPages.includes(location.pathname);

  return (
    <>
      <Modals />

      {showHeader ? <Header /> : <Head />}

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/Profile/user/products" replace />}
        />

        <Route path="/UserProfile" element={<ProfileMain />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SellerSignUp" element={<SignUp />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />

        <Route path="/Profile/*" element={<Outlet />}>
          <Route path="seller/products" element={<SellerProduct />} />
          <Route path="seller/orders" element={<SellerOrders />} />
          <Route path="seller/category" element={<SellerCategory />} />

          <Route path="user/products" element={<UserProducts />} />
          <Route path="user/orders" element={<UserOrders />} />
          <Route path="user/favourites" element={<Favourites />} />
        </Route>

        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </>
  );
};

export default Main;
