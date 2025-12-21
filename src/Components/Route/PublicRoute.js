import { Navigate } from "react-router-dom";

const PublicRoute = ({ isLoggedIn, children }) => {
  const token = localStorage.getItem("token");
  if (isLoggedIn && token) {
    return <Navigate to="/Profile" replace />;
  }
  return children;
};

export default PublicRoute;
