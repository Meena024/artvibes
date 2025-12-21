import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ isLoggedIn, role, allowedRole, children }) => {
  const token = localStorage.getItem("token");
  if (!isLoggedIn || !token || role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default SellerProtectedRoute;
