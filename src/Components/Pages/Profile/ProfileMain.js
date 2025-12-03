import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMain = () => {
  const navigate = useNavigate();
  const seller = false;

  useEffect(() => {
    if (seller) {
      navigate("/SellerProfile/Products");
    } else {
      navigate("/UserProfile/Products");
    }
  }, [seller, navigate]);

  return null;
};

export default ProfileMain;
