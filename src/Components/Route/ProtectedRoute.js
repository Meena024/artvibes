import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, role, children }) => {
  const token = localStorage.getItem("token");

  // Wait until role is resolved
  if (!role) {
    return null;
  }

  const isAuthorized = Boolean(isLoggedIn) && Boolean(token) && role === "user";

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
