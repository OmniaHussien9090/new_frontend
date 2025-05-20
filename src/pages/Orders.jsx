import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import {api} from "../axios/axios";

function Orders() {
  const { t } = useTranslation("orders");
  const currentLang = i18n.language;

  const navigate = useNavigate();

  const [groupedOrders, setGroupedOrders] = useState({
    pending: [],
    shipped: [],
    delivered: [],
    cancelled: [],
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        setGroupedOrders(res.data.groupedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/orderitems?orderId=${orderId}`);
  };

  const renderTable = (orders, titleKey) => {
    if (orders.length === 0) return null;

    return (
      <div className="mb-10 mt-10 p-12">
        <h2 className="text-2xl mb-4">{t(titleKey)}</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>{t("orderId")}</th>
                <th>{t("date")}</th>
                <th>{t("totalPrice")}</th>
                <th>{t("quantity")}</th>
                <th>{t("status")}</th>
                <th>{t("payment")}</th>
                <th>{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="hover">
                  <th>{index + 1}</th>
                  <td className="truncate max-w-[100px]">{order._id}</td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString(currentLang)}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.products.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}
                  </td>
                  <td>
                    <span className={` ${getStatusColor(order.status)}`}>
                      {t(order.status)}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`text ${
                        order.paymentStatus === "paid"
                          ? "text-success"
                          : "text-error"
                      }`}
                    >
                      {t(order.paymentStatus)}
                    </span>
                  </td>
                  <td>
                    <button
                      aria-label={`View order ${order._id}`}
                      className="btn btn-sm bg-gray-300 hover:bg-gray-400 transition-all duration-200"
                      onClick={() => handleViewOrder(order._id)}
                    >
                      {t("view")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-warning";
      case "shipped":
        return "text-info";
      case "delivered":
        return "text-success";
      case "cancelled":
        return "text-error";
      default:
        return "text-ghost";
    }
  };

  return (
    <div className="p-6">
      {renderTable(groupedOrders.pending, "pendingOrders")}
      {renderTable(groupedOrders.shipped, "shippedOrders")}
      {renderTable(groupedOrders.delivered, "deliveredOrders")}
      {renderTable(groupedOrders.cancelled, "cancelledOrders")}
    </div>
  );
}

export default Orders;
