import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';

const dummyOrders = [
  {
    id: 'RGUKT123',
    date: '2025-07-18',
    items: ['Shirt', 'Pants'],
    status: 'Washing',
    total: '₹60',
  },
  {
    id: 'RGUKT456',
    date: '2025-07-14',
    items: ['Bedsheet', 'Kurti'],
    status: 'Delivered',
    total: '₹100',
  },
];

const Orders = () => {
  const { orders } = useOrder();

  // Merge dummy orders with context orders (avoiding duplicate IDs)
  const allOrders = [
    ...dummyOrders,
    ...orders.filter(
      (order) => !dummyOrders.some((dummy) => dummy.id === order.id)
    ),
  ];

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
                  key={order.id}
                  className="border border-gray-300 dark:border-zinc-700 rounded p-4 bg-white dark:bg-zinc-900 transition-all"
                >
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <div>
                      <p className="text-lg font-bold text-[#900000] dark:text-yellow-400">
                        Order ID: {order.id}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📅 Date: {order.date}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        🧼 Items: {order.items?.join(', ')}
                      </p>
                    </div>
                    <div className="text-right min-w-[120px]">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        📦 Status: <span className="font-semibold">{order.status}</span>
                      </p>
                      <p className="text-sm font-bold text-green-600 dark:text-green-400">
                        💰 Total: {order.total}
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
