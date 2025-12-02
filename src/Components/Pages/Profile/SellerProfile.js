import { useState } from "react";
import AddProductForm from "./Seller/AddProductForm";
import Styles from "../../../UI/CSS/SellerProfile.module.css";

const SellerProfile = () => {
  const [form, setForm] = useState(true);
  return (
    <div>
      <button className={Styles.button} onClick={() => setForm(!form)}>
        Add Products
      </button>
      {form && <AddProductForm />}
    </div>
  );
};

export default SellerProfile;
