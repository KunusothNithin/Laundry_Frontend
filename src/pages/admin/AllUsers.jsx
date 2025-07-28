import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const AllUsers = () => {
  const [admins, setAdmins] = useState([]);
  const [normalUsers, setNormalUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/allUsers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const allUsers = res.data;
      const adminsList = allUsers.filter((user) => user.role === "admin");
      const usersList = allUsers.filter((user) => user.role !== "admin");

      setAdmins(adminsList);
      setNormalUsers(usersList);
    } catch (err) {
      setError("Failed to fetch users. You might not have access.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderUserCard = (user) => (
    <div
      key={user._id}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center"
    >
      {user.image ? (
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${user.image}`}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border-4 border-[#900000] mb-3"
        />
      ) : (
        <FaUserCircle className="text-7xl text-gray-400 dark:text-white mb-3" />
      )}
      <h2 className="text-xl font-semibold text-[#900000] dark:text-white">
        {user.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
        <FaEnvelope className="mr-2" /> {user.email}
      </p>
      {user.phone && (
        <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
          <FaPhone className="mr-2" /> {user.phone}
        </p>
      )}
      {user.address && (
        <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
          <FaMapMarkerAlt className="mr-2" /> {user.address}
        </p>
      )}
      <p className="text-sm mt-2 text-green-700 font-medium dark:text-green-400">
        Role: {user.role || "user"}
      </p>
    </div>
  );

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-[#900000] mb-6">All Registered Users</h1>
      {error && <p className="text-red-600 text-center">{error}</p>}

      {/* Admins Section */}
      {admins.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-[#900000] mb-4">Admin Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {admins.map(renderUserCard)}
          </div>
        </>
      )}

      {/* Separator */}
      {admins.length > 0 && normalUsers.length > 0 && (
        <hr className="border-t-2 border-[#900000] my-6" />
      )}

      {/* Normal Users Section */}
      {normalUsers.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-[#900000] mb-4">Regular Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {normalUsers.map(renderUserCard)}
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
