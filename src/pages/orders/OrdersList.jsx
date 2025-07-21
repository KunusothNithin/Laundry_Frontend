import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dummy Data (Replace with API call)
  const dummyOrders = [
    {
      _id: '1',
      customerName: 'Nithin',
      status: 'Pending',
      date: '2025-07-20',
      totalItems: 8,
    },
    {
      _id: '2',
      customerName: 'Karthik',
      status: 'Washing',
      date: '2025-07-19',
      totalItems: 5,
    },
  ];

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setOrders(dummyOrders); // Replace with API call
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">All Orders</h2>

      {loading ? (
        <div className="text-center py-8 text-zinc-600 dark:text-zinc-300">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center text-zinc-500 dark:text-zinc-400">No orders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-sm border dark:border-zinc-700">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr className="text-zinc-700 dark:text-zinc-300">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Items</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-zinc-800 dark:text-zinc-200">
              {orders.map((order) => (
                <tr key={order._id} className="border-t dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition">
                  <td className="p-3 font-mono text-sm">{order._id}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'Washing'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">{order.totalItems}</td>
                  <td className="p-3">
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrdersList;
