import { CartActions } from "../../../../../Redux store/CartActions";

export const handleLocalIntent = ({
  question,
  products,
  categories,
  favItems,
  navigate,
  dispatch,
  SellerProductsActions,
}) => {
  const query = question.toLowerCase().trim();

  /* -------------------- FAVOURITES PAGE -------------------- */

  if (
    query.includes("show favourites") ||
    query.includes("show favorite") ||
    query === "favourites" ||
    query === "favorites"
  ) {
    navigate("/user/favourites");

    return {
      handled: true,
      response: `Opening your favourites ❤️ (${favItems.length} items).`,
    };
  }

  /* -------------------- ORDERS PAGE -------------------- */

  if (
    query.includes("show orders") ||
    query.includes("my orders") ||
    query === "orders"
  ) {
    navigate("/user/orders");

    return {
      handled: true,
      response: "Opening your orders 📦",
    };
  }

  /* -------------------- SHOW ALL PRODUCTS -------------------- */

  if (
    query.includes("show all") ||
    query.includes("all products") ||
    query.includes("clear filters")
  ) {
    navigate("/user/products");
    dispatch(SellerProductsActions.clearSelectedCategories());

    dispatch(SellerProductsActions.setSearchText(""));

    return {
      handled: true,
      response: "Showing all available products.",
    };
  }

  /* -------------------- PRODUCT SEARCH -------------------- */

  if (query.startsWith("search ")) {
    const searchText = query.replace("search ", "").trim();
    console.log(searchText);
    navigate("/user/products");
    dispatch(SellerProductsActions.clearSelectedCategories());
    dispatch(SellerProductsActions.setSearchText(searchText));

    return {
      handled: true,
      response: `Searching for "${searchText}" 🔍`,
    };
  }

  /* -------------------- CATEGORY FILTER -------------------- */

  const matchedCategory = categories.find((category) =>
    query.includes(category.title.toLowerCase()),
  );

  navigate("/user/products");
  if (matchedCategory) {
    dispatch(SellerProductsActions.clearSelectedCategories());

    dispatch(
      SellerProductsActions.toggleSelectedCategory(matchedCategory.title),
    );

    return {
      handled: true,
      response: `Showing ${matchedCategory.title} products.`,
    };
  }

  /* -------------------- PRODUCTS UNDER PRICE -------------------- */

  if (query.includes("under") || query.includes("below")) {
    const amount = Number(query.match(/\d+/)?.[0]);

    if (!isNaN(amount)) {
      navigate("/user/products");

      dispatch(SellerProductsActions.clearSelectedCategories());

      dispatch(SellerProductsActions.setSearchText(""));

      dispatch(SellerProductsActions.setPriceFilter(amount));

      return {
        handled: true,
        response: `Showing products under ₹${amount}`,
      };
    }
  }

  /* -------------------- CHEAPEST PRODUCTS -------------------- */

  if (
    query.includes("cheap") ||
    query.includes("cheapest") ||
    query.includes("affordable")
  ) {
    const cheapest = [...products]
      .sort((a, b) => Number(a.price) - Number(b.price))
      .slice(0, 5);

    return {
      handled: true,
      response:
        "Most affordable products:\n\n" +
        cheapest
          .map((product) => `• ${product.title} - ₹${product.price}`)
          .join("\n"),
    };
  }

  /* -------------------- ADD TO FAVOURITES -------------------- */

  if (
    query.includes("add") &&
    (query.includes("favourite") || query.includes("favorite"))
  ) {
    const product = products.find((p) => query.includes(p.title.toLowerCase()));

    if (!product) {
      return {
        handled: true,
        response: "I couldn't find that product.",
      };
    }

    const alreadyFav = favItems.some((item) => item.id === product.id);

    if (alreadyFav) {
      return {
        handled: true,
        response: `${product.title} is already in favourites ❤️`,
      };
    }

    dispatch(
      CartActions.addToFav({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
        description: product.description,
      }),
    );

    return {
      handled: true,
      response: `${product.title} added to favourites ❤️`,
    };
  }

  /* -------------------- REMOVE FROM FAVOURITES -------------------- */

  if (
    query.includes("remove") &&
    (query.includes("favourite") || query.includes("favorite"))
  ) {
    const product = products.find((p) => query.includes(p.title.toLowerCase()));

    if (!product) {
      return {
        handled: true,
        response: "I couldn't find that product.",
      };
    }

    dispatch(CartActions.removeFromFav(product.id));

    return {
      handled: true,
      response: `${product.title} removed from favourites.`,
    };
  }

  /* -------------------- ADD TO CART -------------------- */

  if (query.includes("add") && query.includes("cart")) {
    const product = products.find((p) => query.includes(p.title.toLowerCase()));

    if (!product) {
      return {
        handled: true,
        response: "I couldn't find that product.",
      };
    }

    dispatch(
      CartActions.addItem({
        ...product,
        qty: 1,
        status: "Pending",
      }),
    );

    dispatch(CartActions.updateCart());

    return {
      handled: true,
      response: `${product.title} added to cart 🛒`,
    };
  }

  /* -------------------- PRODUCT LOOKUP -------------------- */

  const matchingProducts = products.filter(
    (product) =>
      query.includes(product.title.toLowerCase()) ||
      product.title.toLowerCase().includes(query),
  );

  if (matchingProducts.length > 0) {
    navigate("/user/products");

    dispatch(SellerProductsActions.clearSelectedCategories());

    dispatch(SellerProductsActions.clearPriceFilter());

    dispatch(SellerProductsActions.setSearchText(query));

    return {
      handled: true,
      response: `Showing ${matchingProducts.length} matching products.`,
    };
  }

  /* -------------------- NO LOCAL MATCH -------------------- */

  return {
    handled: false,
  };
};
