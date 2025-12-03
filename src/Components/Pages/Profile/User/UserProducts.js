import { useSelector } from "react-redux";
import UserProductsListing from "./UserProductsListing";
import UserCategoryListing from "./UserCategoryListing";

const UserProducts = () => {
  const products = useSelector((state) => state.sellerProducts.products);
  const categories = useSelector((state) => state.sellerProducts.category);

  return (
    <div>
      <div>
        {categories.map((c) => (
          <UserCategoryListing category={c} />
        ))}
      </div>
      {products.map((p) => (
        <UserProductsListing product={p} />
      ))}
    </div>
  );
};

export default UserProducts;
