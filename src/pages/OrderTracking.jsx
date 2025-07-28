import React, { useState, useContext } from "react";
import { useOrder } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  FaCheckCircle,
  FaTshirt,
  FaWater,
  FaSun,
  FaBoxes,
  FaTruck,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";

const OrderTracking = () => {
  const { token } = useContext(AuthContext);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);

  const handleTrackOrder = async () => {
    const id = orderId.trim();
    if (!id) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/orderStatus/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const order = response.data;
      console.log("Order fetched:", order);

      const validStages = [
        "Received",
        "Sorting",
        "Washing",
        "Drying",
        "Ready",
        "Delivered",
      ];

      // Validate status
      const currentStatus = validStages.includes(order.status)
        ? order.status
        : "Received";

      setOrderStatus({
        status: currentStatus,
        stages: validStages,
      });
    } catch (error) {
      console.error("Order tracking failed:", error);
      setOrderStatus({ status: "Not Found", stages: [] });
    }
  };

  const getStageClass = (stage) => {
    if (!orderStatus) return "bg-gray-200 dark:bg-zinc-700";
    const currentIndex = orderStatus.stages.indexOf(orderStatus.status);
    const stageIndex = orderStatus.stages.indexOf(stage);

    if (stageIndex < currentIndex) return "bg-green-600 text-white";
    if (stageIndex === currentIndex) return "bg-yellow-500 text-white";
    return "bg-gray-300 dark:bg-zinc-600 text-gray-800 dark:text-white";
  };

  const getStageIcon = (stage) => {
    switch (stage) {
      case "Received":
        return <FaCheckCircle />;
      case "Sorting":
        return <FaTshirt />;
      case "Washing":
        return <FaWater />;
      case "Drying":
        return <FaSun />;
      case "Ready":
        return <FaBoxes />;
      case "Delivered":
        return <FaTruck />;
      default:
        return <FaCheckCircle />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400 mb-6">
          Laundry Order Tracking
        </h2>

        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          className="w-full p-3 border text-black border-gray-300 dark:border-zinc-600 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#900000]"
        />

        <button
          onClick={handleTrackOrder}
          className="w-full bg-[#900000] hover:bg-[#7b0000] text-white font-semibold py-2 rounded-md transition"
        >
          Track Order
        </button>

        {orderStatus && (
          <div className="mt-6">
            {orderStatus.status === "Not Found" ? (
              <p className="text-red-600 dark:text-red-400 text-center text-lg font-semibold">
                <FaTimesCircle className="inline mr-2" />
                Order ID not found. Please check and try again.
              </p>
            ) : (
              <>
                <p className="text-center text-lg font-semibold mb-4 text-gray-800 dark:text-white">
                  Current Status:
                  <span className="text-[#900000] dark:text-yellow-400 ml-2">
                    {orderStatus.status}
                  </span>
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {orderStatus.stages.map((stage, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full shadow transition-all ${getStageClass(
                        stage
                      )}`}
                    >
                      {getStageIcon(stage)}
                      <span className="text-sm font-medium">{stage}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <Link
        to="/orders"
        className="bg-[#990000] mt-8 dark:bg-yellow-400 hover:bg-gray-400 text-white font-semibold py-2 px-5 rounded transition flex items-center gap-2"
      >
        <FaArrowLeft /> Back to Orders
      </Link>
    </div>
  );
};

export default OrderTracking;
