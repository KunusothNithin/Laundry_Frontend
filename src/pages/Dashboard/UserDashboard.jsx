// pages/Dashboard/UserDashboard.jsx
import React from 'react';
import { FaTshirt, FaClock, FaCheckCircle, FaWallet } from 'react-icons/fa';

const laundryStatus = [
  {
    label: 'Clothes in Queue',
    value: 3,
    icon: <FaClock className="text-orange-500 text-2xl" />,
  },
  {
    label: 'Washed & Ready',
    value: 2,
    icon: <FaCheckCircle className="text-green-500 text-2xl" />,
  },
  {
    label: 'Total Orders',
    value: 12,
    icon: <FaTshirt className="text-blue-500 text-2xl" />,
  },
  {
    label: 'Total Paid',
    value: '₹750',
    icon: <FaWallet className="text-yellow-500 text-2xl" />,
  },
];

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {laundryStatus.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-5 flex items-center gap-4"
        >
          <div>{item.icon}</div>
          <div>
            <h4 className="text-md font-semibold">{item.label}</h4>
            <p className="text-lg font-bold">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
