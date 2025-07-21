// pages/Dashboard/AdminDashboard.jsx
import React from 'react';
import { FaTshirt, FaUserShield, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

const stats = [
  {
    title: 'Total Clothes',
    value: 540,
    icon: <FaTshirt className="text-blue-500 text-3xl" />,
  },
  {
    title: 'Active Users',
    value: 120,
    icon: <FaUsers className="text-green-500 text-3xl" />,
  },
  {
    title: 'Admins',
    value: 3,
    icon: <FaUserShield className="text-purple-500 text-3xl" />,
  },
  {
    title: 'Monthly Earnings',
    value: '₹24,000',
    icon: <FaMoneyBillWave className="text-yellow-500 text-3xl" />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 shadow rounded-lg p-5 flex items-center gap-4"
        >
          <div>{stat.icon}</div>
          <div>
            <h3 className="text-md font-medium">{stat.title}</h3>
            <p className="text-xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
