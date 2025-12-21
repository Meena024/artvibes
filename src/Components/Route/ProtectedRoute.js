import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, role, children }) => {
  const token = localStorage.getItem("token");
  if (!isLoggedIn || !token || role !== "user") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
