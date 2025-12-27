import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isLoggedIn, role, allowedRole, children }) => {
  const token = localStorage.getItem("token");

  const isAuthorized =
    Boolean(isLoggedIn) && Boolean(token) && role === allowedRole;

  if (!isAuthorized) {
    return <Navigate to="/user/products" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
