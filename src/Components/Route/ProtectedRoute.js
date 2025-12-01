import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const token = localStorage.getItem("token");
  if (!isLoggedIn && !token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
