import { Navigate } from "react-router-dom";

const PublicRoute = ({ isLoggedIn, children }) => {
  const token = localStorage.getItem("token");

  const isAuthenticated = Boolean(isLoggedIn) && Boolean(token);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
