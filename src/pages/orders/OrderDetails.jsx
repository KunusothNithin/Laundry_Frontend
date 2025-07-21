import React from 'react';
import { useParams } from 'react-router-dom';

function OrderDetails() {
  const { orderId } = useParams();

  // Dummy order details (Replace this with real API call later)
  const order = {
    id: orderId,
    customerName: 'Nithin Kunusoth',
    email: 'nithin@rgukt.in',
    phone: '+91-9876543210',
    address: 'RGUKT Campus, Andhra Pradesh',
    status: 'Washing',
    items: [
      { type: 'Shirt', quantity: 4, price: 120 },
      { type: 'Jeans', quantity: 2, price: 200 },
      { type: 'Bedsheet', quantity: 1, price: 150 },
    ],
    total: 470,
    orderedAt: '2025-07-15',
    updatedAt: '2025-07-19',
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-zinc-900 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-zinc-800 dark:text-white">Order #{order.id}</h2>

      <div className="mb-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Customer: <span className="font-medium">{order.customerName}</span></p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Email: <span className="font-medium">{order.email}</span></p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Phone: <span className="font-medium">{order.phone}</span></p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Address: <span className="font-medium">{order.address}</span></p>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Status: <span className="font-bold text-blue-600">{order.status}</span></p>
      </div>

      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2 text-zinc-700 dark:text-white">Items</h3>
        <ul className="divide-y divide-zinc-300 dark:divide-zinc-700">
          {order.items.map((item, idx) => (
            <li key={idx} className="py-2 flex justify-between">
              <span>{item.type} x {item.quantity}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right font-bold text-lg text-green-600">Total: ₹{order.total}</div>
      </div>

      <div className="text-sm text-zinc-500 dark:text-zinc-400">
        <p>Ordered At: {order.orderedAt}</p>
        <p>Last Updated: {order.updatedAt}</p>
      </div>
    </div>
  );
}

export default OrderDetails;
