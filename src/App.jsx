import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navbar from "./components/navbar/navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import OrderItems from "./pages/OrderItems.jsx";
import SignIn from "./components/SignUp/signIn.jsx";
import SignUp from "./components/SignUp/signUp.jsx";
import ProfileUser from "./pages/ProfileUser.jsx";
import ChangePassword from "./pages/ChangePassword";
import Products from "./components/products/products.jsx";
import { fetchCart } from "./redux/cartActions";
import ProductDetails from "./components/products/ProductDetails/ProductDetails.jsx";
import Blog from "./components/blog/BlogPosts/Blog.jsx";
import PostDetails from "./components/blog/PostDetailsPage/PostDetails.jsx";
import "./i18n";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./searchContext/SearchContext.jsx";
import ForgetPass from "./components/SignUp/forgetPass.jsx";
import NotFound from "./components/NotFound/notFound.jsx";
import WishlistPage from "./components/wishList/WishlistPage.jsx"

const LayoutWithNavFooter = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const LayoutWithoutNavFooter = ({ children }) => <>{children}</>;

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ToastContainer position="top-right" autoClose={3000} />
      <SearchProvider>
        <BrowserRouter>
          <Routes>
            {/* Routes without Navbar/Footer */}
            <Route
              path="/checkout"
              element={
                <LayoutWithoutNavFooter>
                  <Checkout />
                </LayoutWithoutNavFooter>
              }
            />
            <Route
              path="/login"
              element={
                <LayoutWithoutNavFooter>
                  <SignIn />
                </LayoutWithoutNavFooter>
              }
            />
            <Route
              path="/signup"
              element={
                <LayoutWithoutNavFooter>
                  <SignUp />
                </LayoutWithoutNavFooter>
              }
            />
            <Route
              path="/changepassword"
              element={
                <LayoutWithNavFooter>
                  <ChangePassword />
                </LayoutWithNavFooter>
              }
            />

            {/* Routes with Navbar/Footer */}
            <Route
              path="/"
              element={
                <LayoutWithNavFooter>
                  <Home />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/shop"
              element={
                <LayoutWithNavFooter>
                  <Products />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/shop/:id"
              element={
                <LayoutWithNavFooter>
                  <ProductDetails />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/blog"
              element={
                <LayoutWithNavFooter>
                  <Blog />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <LayoutWithNavFooter>
                  <PostDetails />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/about"
              element={
                <LayoutWithNavFooter>
                  <About />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/contactus"
              element={
                <LayoutWithNavFooter>
                  <ContactUs />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/cart"
              element={
                <LayoutWithNavFooter>
                  <Cart />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/orders"
              element={
                <LayoutWithNavFooter>
                  <Orders />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/orderitems"
              element={
                <LayoutWithNavFooter>
                  <OrderItems />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/profile"
              element={
                <LayoutWithNavFooter>
                  <ProfileUser />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/forgetpassword"
              element={
                <LayoutWithNavFooter>
                  <ForgetPass />
                </LayoutWithNavFooter>
              }
            />
            <Route
              path="/wishlist"
              element={
                <LayoutWithNavFooter>
                  <WishlistPage />
                </LayoutWithNavFooter>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SearchProvider>
    </>
  );
}

export default App;
