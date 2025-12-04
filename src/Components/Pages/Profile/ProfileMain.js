import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuthInitializer } from "../Authentication/AuthInitializer";

const ProfileMain = () => {
  useAuthInitializer();
  const navigate = useNavigate();
  const role = useSelector((state) => state.profile.role);
  useEffect(() => {
    if (!role) return; // wait until role is fetched

    if (role === "seller") {
      navigate("/Profile/seller/products", { replace: true });
    } else {
      navigate("/Profile/user/products", { replace: true });
    }
  }, [role, navigate]);

  return null;
};

export default ProfileMain;
