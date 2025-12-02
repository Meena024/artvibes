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

const Main = () => {
  useAuthInitializer();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {!isLoggedIn && <Header />}
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
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Routes>
    </>
  );
};

export default Main;
