import SellerProfile from "./SellerProfile";
import UserProfile from "./UserProfile";

const ProfileMain = () => {
  const seller = true;
  return (
    <div>
      {seller && <SellerProfile />}
      {!seller && <UserProfile />}
    </div>
  );
};

export default ProfileMain;
