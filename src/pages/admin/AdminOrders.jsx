import React, { useEffect, useState } from "react";
import axios from "axios";

const statuses = ["Received", "Sorting", "Washing", "Drying", "Ready", "Delivered"];

const statusColorMap = {
  Received: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Sorting: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Washing: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Drying: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  Ready: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Delivered: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = JSON.parse(localStorage.getItem("appUser"))?.token;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/allOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/updateStatus/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchOrders(); // Refresh after successful update
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-[#900000] dark:text-yellow-400">
        📋 Manage Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-300 dark:border-gray-700">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-[#900000] text-white dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Current Status</th>
                <th className="px-4 py-3 text-left">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="px-4 py-3 font-mono">{order._id}</td>
                  <td className="px-4 py-3">{order.user?.name || order.user}</td>
                  <td className="px-4 py-3 font-semibold text-[#219000] dark:text-green-400">
                    ₹{order.totalAmount}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[order.status] || ""}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      className="border rounded px-3 py-1 bg-white dark:bg-gray-700 dark:text-white"
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
