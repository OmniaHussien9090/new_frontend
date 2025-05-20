import React from "react";
import RatingStars from "../../RatingStars";
import ProductTabs from "./ProductTabs";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../../../redux/cartActions";
import { addToWishlist, removeFromWishlist } from "../../../../redux/wishList";
import { useTranslation } from "react-i18next";
import i18n from "../../../../i18n";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiHeart } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const ProductInfo = ({
  product,
  selectedVariant,
  quantity,
  handleQuantityChange,
  handleVariantChange,
  addToCart,
}) => {
  const { t } = useTranslation("productdetails");
  const currentLang = i18n.language;
  const variant = product.variants[selectedVariant];
  const maxQuantity = variant.inStock || 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(variant._id);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error(t("productInfo.mustLoginFirst"));
      navigate("/login");
      return;
    }

    dispatch(addCartItem({ product, quantity }))
      .unwrap()
      .then(() => {
        toast.success(t("productInfo.addedToCart"));
      })
      .catch((error) => {
        toast.error(error.message || "Failed to add to cart");
      });
  };

  const handleWishlistClick = (e, variant) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   toast.error(t("productInfo.mustLoginFirst"));
    //   navigate("/login");
    //   return;
    // }

    if (isWishlisted) {
      dispatch(removeFromWishlist(variant._id));
      toast.success(t("productInfo.removedFromWishlist"));
    } else {
      dispatch(addToWishlist({
        _id: variant._id,
        productId: product._id,
        name: variant.name,
        price: variant.price,
        discountPrice: variant.discountPrice,
        image: variant.images?.[0] || product.images?.[0],
        color: variant.color,
      }));
      toast.success(t("productInfo.addedToWishlist"));
    }
  };

  return (
    <div className="md:w-1/2">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {variant.name?.[currentLang] || t("productInfo.defaultName")}
      </h1>

      <div className="flex items-center mb-4">
        <RatingStars averageRating={variant.averageRating || 0} />
        <span className="ml-2 text-sm text-gray-500">
          ({t("productInfo.reviews", { count: variant.ratingCount || 0 })})
        </span>
      </div>

      <div className="flex gap-2 items-center mb-6">
        <span className="text-2xl font-semibold">
          ${variant.discountPrice?.toFixed(2) || variant.price?.toFixed(2)}
        </span>
        {variant.discountPrice && (
          <span className="ml-2 text-gray-500 line-through">
            ${variant.price?.toFixed(2)}
          </span>
        )}
      </div>

      {product.variants.length > 1 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">{t("productInfo.variants")}</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v, index) => (
              <button
                key={v._id}
                onClick={() => handleVariantChange(index)}
                className={`px-4 py-2 border rounded-full ${
                  selectedVariant === index
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
              >
                {v.color?.[currentLang] ||
                  t("productInfo.variant", { number: index + 1 })}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex items-center border border-gray-300">
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button
            className="px-3 py-2 text-lg cursor-pointer"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= maxQuantity}
          >
            +
          </button>
        </div>
        <button
          className="bg-black w-40 text-white py-3 px-6 cursor-pointer transition-colors"
          onClick={handleAddToCart}
          disabled={variant.inStock <= 0}
        >
          {variant.inStock > 0
            ? t("productInfo.addToCart")
            : t("productInfo.outOfStock")}
        </button>
      </div>

      <div className="mt-4">
        <button
          className={`p-2 flex items-center gap-2 rounded-full transition-colors ${
            isWishlisted
              ? "text-red-500"
              : "cursor-pointer"
          }`}
          onClick={(e) => handleWishlistClick(e, variant)}
        >
          <FiHeart 
            size={20} 
            fill={isWishlisted ? "currentColor" : "none"} 
            stroke="currentColor"
          />
          {isWishlisted ? t("productInfo.wishlisted") : t("productInfo.addToWishlist")}
        </button>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex gap-2">
          <h3 className="font-semibold">{t("productInfo.color")}:</h3>
          <p className="text-gray-500">
            {variant.color?.[currentLang] || t("productInfo.noColor")}
          </p>
        </div>

        <div className="mb-4 flex gap-2">
          <h3 className="font-semibold">{t("productInfo.material")}:</h3>
          <p className="text-gray-500">
            {product.material?.[currentLang] || t("productInfo.noMaterial")}
          </p>
        </div>

        {product.categories?.sub?.tags &&
          product.categories.sub.tags.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Tags: </h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.sub.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 hover:underline cursor-pointer transition-all duration-300 text-gray-800 text-sm px-3 py-1 capitalize font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

        <div className="mb-4 flex gap-2">
          <h3 className="font-semibold">Availability: </h3>
          <p className="text-gray-500">
            {variant.inStock > 0
              ? `In Stock (${variant.inStock} available)`
              : t("productInfo.outOfStock")}
          </p>
        </div>

        <div>
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;