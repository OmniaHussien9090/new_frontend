import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { useTranslation } from "react-i18next";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist, toggleItem } from "../../redux/wishList";

const ProductGrid = ({
  hasLoaded,
  currentVariants,
  filteredVariants,
  resetFilters,
}) => {
  const { t, i18n } = useTranslation("products");
  const currentLang = i18n.language;
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleWishlistClick = (e, variant) => {
    e.preventDefault();
    const isInWishlist = wishlistItems.includes(variant._id);
    
    // Using the new reducers
    if (isInWishlist) {
      dispatch(removeFromWishlist(variant._id));
    } else {
      dispatch(addToWishlist(variant));
    }
    
    
  };

  if (!hasLoaded) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col gap-4 animate-pulse">
            <div className="h-66.5 bg-gray-200 w-full mb-2"></div>
            <div className="h-6 bg-gray-200 w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredVariants.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentVariants.map((variant) => (
          <div key={variant._id} className="flex flex-col gap-4 group">
            <Link
              to={`/shop/${variant.productId}`}
              state={{ variantId: variant._id }}
              className="relative block"
            >
              <img
                src={variant.image || "/placeholder.jpg"}
                className="h-66.5 hover:outline-3 hover:outline-orange-500 transition-all cursor-pointer w-full object-cover mb-2"
              />
              <div className="absolute inset-0 bg-white/50  bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button 
                  className="bg-white p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Add to cart", variant._id);
                  }}
                >
                  <FiShoppingCart size={20} />
                </button>
                
                <button 
                  className={`p-2 rounded-full transition-colors ${
                    wishlistItems.includes(variant._id)
                      ? "bg-orange-500 text-white" 
                      : "bg-white hover:bg-orange-500 hover:text-white cursor-pointer "
                  }`}
                  onClick={(e) => handleWishlistClick(e, variant)}
                >
                  <FiHeart size={20} />
                </button>
                
                <Link 
                  to={`/shop/${variant.productId}`}
                  state={{ variantId: variant._id }}
                  className="bg-white p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                >
                  <FiEye size={20} />
                </Link>
              </div>
            </Link>
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold font-sans text-lg">
                {variant.name?.[currentLang] || "No name"}
              </h2>
              <div className="flex items-center gap-1">
                <RatingStars averageRating={variant.averageRating} />
                <span className="text-gray-500 text-xs">
                  ({variant.ratingCount})
                </span>
              </div>
              <div className="mt-2">
                <span className="text-gray-600 font-semibold">
                  $
                  {variant.discountPrice?.toFixed(2) ||
                    variant.price?.toFixed(2) ||
                    "0.00"}
                </span>
                {variant.discountPrice && (
                  <span className="text-gray-400 line-through ml-2">
                    ${variant.price?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {t("no_products_title")}
      </h3>
      <p className="text-gray-500 text-center max-w-md">
        {t("no_products_message")}
      </p>
      <button
        onClick={resetFilters}
        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
      >
        {t("Reset Filters")}
      </button>
    </div>
  );
};

export default ProductGrid;