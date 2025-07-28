import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import { useOrder } from "../context/OrderContext";
import axios from "axios";
import Loader from "../components/Loader";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const { orders } = useOrder();

  useEffect(() => {
    const appUser = JSON.parse(localStorage.getItem("appUser"));
    const token = appUser?.token;
    const id = appUser?._id;

    if (id && token) {
      setUserId(id);

      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/orders/orderByUser/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setAllOrders(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      console.error("User not found in localStorage");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(allOrders) && allOrders.length > 0) {
      console.log("First Order:", allOrders[0]);
    }
  }, [allOrders]);

  if (loading) return <Loader />;

  return (
    <div className="mt-16 min-h-screen bg-white dark:bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#900000] dark:text-yellow-400 mb-6 dark:hover:text-[#109000] text-center">
          🧺 Orders
        </h2>

        {/* Previous Orders List */}
        <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-lg shadow">
          <h3 className="text-3xl font-semibold mb-4 text-center text-zinc-800 dark:text-yellow-400 dark:hover:text-[#109000]">
            Previous Orders
          </h3>

          {allOrders.length > 0 ? (
            <ul className="space-y-4">
              {allOrders.map((order) => (
                <li
                  key={order._id}
                  className="border border-gray-300 dark:border-zinc-700 rounded p-4 bg-white dark:bg-zinc-900 transition-all"
                >
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <div>
                      <p className="text-lg font-bold text-[#900000] dark:text-yellow-400">
                        Order ID: {order._id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📅 Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        🧼 Items:{" "}
                        {order.items
                          ?.map(
                            (item) =>
                              `${item.clothType}`
                          )
                          .join(", ") || "No items"}
                      </p>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        📦 Status:{" "}
                        <span className="font-semibold">{order.status}</span>
                      </p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">
                        💰 Total: ₹{order.totalAmount}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-300 text-center py-4">
              No previous orders found.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/new-order"
            className="flex items-center justify-center gap-2 bg-[#900000] hover:bg-[#7b0000] text-white font-semibold px-6 py-2 rounded w-full sm:w-auto"
          >
            <FaPlusCircle className="text-white" />
            Make New Order
          </Link>
          <Link
            to="/order-tracking"
            className="flex items-center justify-center gap-2 bg-[#900000] hover:bg-[#7b0000] text-white font-semibold px-6 py-2 rounded w-full sm:w-auto"
          >
            <FaSearch className="text-white" />
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Orders;
