import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation("profileuser");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 px-3 py-1 bg-blue-600 text-white rounded"
      >
        {isOpen
          ? t("hideMenu") || "إخفاء القائمة"
          : t("showMenu") || "عرض القائمة"}
      </button>

      {isOpen && (
        <aside className="bg-gray-100 shadow-md rounded-xl p-4 overflow-hidden">
          <nav className="flex flex-col space-y-4 text-sm md:text-base">
            <NavLink
              to="/profile"
              className="text-blue-600 font-semibold whitespace-nowrap"
            >
              {t("profileOverview")}
            </NavLink>
            <NavLink to="/orders" className="text-gray-600 whitespace-nowrap">
              {t("myOrders")}
            </NavLink>
            <NavLink to="/wishlist" className="text-gray-600 whitespace-nowrap">
              {t("wishlist")}
            </NavLink>
          </nav>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
