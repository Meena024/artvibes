import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isLoggedIn, role, allowedRole, children }) => {
  const token = localStorage.getItem("token");

  // Wait until role is resolved
  if (!role || !allowedRole) {
    return null;
  }

  const isAuthorized =
    Boolean(isLoggedIn) && Boolean(token) && role === allowedRole;

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
