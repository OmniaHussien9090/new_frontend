import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import searchLight from "../../assets/icons/search.png";
import bagLight from "../../assets/icons/bag.png";
import searchDark from "../../assets/icons/search-black.png";
import bagDark from "../../assets/icons/bag-black.png";
import { FaRegUser, FaGlobe } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { SearchContext } from "../../searchContext/SearchContext.jsx";

function Navbar() {
  const { t, i18n } = useTranslation("navbar");
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const wishlistItemsCount = useSelector((state) => state.wishlist.items.length);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false); // New state for mobile search

  const isHome = pathname === "/";

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("shop") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contactus", label: t("contact") },
  ];

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const hideSearchOn = ["/shop", "/contactus", "/blog"];
  const shouldHideSearchIcon = hideSearchOn.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navbarEffect = scrolled
    ? "backdrop-blur-md bg-white/70 shadow-md text-black"
    : isHome
    ? "text-white"
    : "text-black";

  const searchIcon = scrolled || !isHome ? searchDark : searchLight;
  const bagIcon = scrolled || !isHome ? bagDark : bagLight;

  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const handleUserIconClick = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${searchQuery}`);
    }
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-6 transition-all duration-300 ${navbarEffect}`}
    >
      <div className="navbar justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 ${
                scrolled || !isHome
                  ? "bg-white text-black"
                  : "bg-black/90 text-white"
              }`}
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <a className="text-2xl font-semibold">FurniITI</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-medium text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${
                    pathname === link.href ? "font-bold underline" : ""
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {!shouldHideSearchIcon && (
            <>
              {/* Mobile search icon (always visible on small screens) */}
              <div className="lg:hidden flex items-center">
                <img
                  src={searchIcon}
                  alt={t("search") || "Search"}
                  className="w-5 h-5 cursor-pointer"
                  onClick={toggleMobileSearch}
                />
              </div>

              {/* Mobile search input (hidden by default, shown when icon clicked) */}
              {showMobileSearch && (
                <div className="absolute top-full left-0 w-full  p-2  lg:hidden">
                  <div className="flex items-center gap-2">
                    <input
                      type="search"
                      className="no-scrollbar border rounded px-2 py-1 text-sm w-full"
                      placeholder={t("search") || "Search"}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch();
                          setShowMobileSearch(false);
                        }
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        handleSearch();
                        setShowMobileSearch(false);
                      }}
                      className="bg-gray-500 px-2 rounded py-1.5 text-sm text-white/90"
                    >
                      {t("Search") || "Search"}
                    </button>
                  </div>
                </div>
              )}

              {/* Desktop search (hidden on mobile) */}
              <div className="hidden lg:flex items-center gap-2">
                <img
                  src={searchIcon}
                  alt={t("search") || "Search"}
                  className="w-5 h-5 cursor-pointer"
                  onClick={handleSearch}
                />
                <input
                  type="search"
                  className="no-scrollbar border rounded px-2 py-1 text-sm"
                  placeholder={t("search") || "Search"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  style={{ minWidth: 100 }}
                />
              </div>
            </>
          )}

          <div className="relative">
            <FiHeart
              className="w-5 h-5 cursor-pointer hover:text-red-500"
              onClick={() => navigate("/wishlist")}
            />
            {wishlistItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistItemsCount}
              </span>
            )}
          </div>

          <div className="relative">
            <img
              src={bagIcon}
              alt="Bag"
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/cart")}
            />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </div>

          <div className="relative">
            <FaGlobe
              className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setShowLangMenu(!showLangMenu)}
            />
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-20 bg-white border border-gray-300 rounded shadow-md z-50">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className="block w-full px-2 bg-gray-300 py-1 text-left hover:bg-gray-400"
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("ar")}
                  className="block w-full px-2 py-1 text-left hover:bg-gray-400 bg-gray-300"
                >
                  AR
                </button>
              </div>
            )}
          </div>

          <FaRegUser
            className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600"
            onClick={handleUserIconClick}
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;