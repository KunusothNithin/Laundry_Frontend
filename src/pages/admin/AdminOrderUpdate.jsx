import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function AdminOrderUpdate() {
  const { orderId } = useParams();

  // Dummy data (replace with real API call)
  const order = {
    id: orderId,
    customerName: 'Nithin Kunusoth',
    status: 'Washing',
    items: [
      { type: 'Shirt', quantity: 4 },
      { type: 'Pants', quantity: 2 },
    ],
  };

  const [newStatus, setNewStatus] = useState(order.status);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdate = () => {
    // TODO: API call to update order status
    console.log(`Updating order #${orderId} to status: ${newStatus}`);
    alert(`Order status updated to ${newStatus}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-zinc-800 dark:text-white mb-4">Update Order #{order.id}</h2>

      <div className="mb-6">
        <p className="text-zinc-600 dark:text-zinc-300">
          Customer: <span className="font-medium">{order.customerName}</span>
        </p>
        <p className="text-zinc-600 dark:text-zinc-300 mb-2">Items:</p>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-200">
          {order.items.map((item, idx) => (
            <li key={idx}>{item.type} x {item.quantity}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Change Order Status
        </label>
        <select
          id="status"
          value={newStatus}
          onChange={handleStatusChange}
          className="w-full p-2 border rounded dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
        >
          <option value="Pending">Pending</option>
          <option value="Washing">Washing</option>
          <option value="Ready">Ready</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        onClick={handleUpdate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Update Status
      </button>
    </div>
  );
}

export default AdminOrderUpdate;
