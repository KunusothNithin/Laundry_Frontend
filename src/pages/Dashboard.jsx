// pages/Dashboard.jsx
import React from 'react';
import UserDashboard from './Dashboard/UserDashboard';
import AdminDashboard from './Dashboard/AdminDashboard';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'user';

  return (
    <div className="mt-16 min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-yellow-400 dark:hover:text-[#109000] ">
        {role === 'admin' ? 'Admin' : 'User'} Laundry Dashboard
      </h1>
      {role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
};

export default Dashboard;
