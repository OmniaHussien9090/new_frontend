import { useDispatch, useSelector } from "react-redux";
import { toggleItem } from "../../redux/wishList";
import axios from "axios";

function CustomCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWished = wishlist.includes(product._id);


  const toggleWishlist = async () => {
    try {
      await axios.post(
        "/wishlist/toggle",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(toggleItem(product._id));
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <button onClick={toggleWishlist}>
        {isWished ? (
          <i className="fa-solid fa-heart text-red-500"></i>
        ) : (
          <i className="fa-regular fa-heart text-gray-500"></i>
        )}
      </button>
    </div>
  );
}
export default CustomCard