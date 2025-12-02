import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileMain = () => {
  const navigate = useNavigate();
  const seller = true; // replace with real state later

  useEffect(() => {
    if (seller) {
      navigate("/SellerProfile");
    } else {
      navigate("/UserProfile");
    }
  }, [seller, navigate]);

  return null; // no need to render anything here
};

export default ProfileMain;
