import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaBox, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  // Show toast instead of letting user update profile picture
  const handleProfilePicClick = (e) => {
    e.preventDefault();
    toast.info("Please contact admin to update your profile.");
  };

  // Fetch user from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("appUser"));
        const id = storedUser?.id;
        const token = storedUser?.token;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black px-4 py-10">
      <div className="mt-12 max-w-3xl mx-auto bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#900000] dark:text-yellow-400 mb-8 text-center">
          My Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer relative" onClick={handleProfilePicClick}>
            {profilePic || user.profilePic ? (
              <img
                src={profilePic || user.profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#900000]"
              />
            ) : (
              <FaUserCircle className="text-8xl text-gray-400 dark:text-white" />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled // Upload disabled
            />
          </label>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-center text-lg dark:text-white">
          <p>
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-semibold">ID:</span> {user.id}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>

          {/* Show/hide password */}
          
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setShowPassword(true)}
                className="text-gray-600 dark:text-yellow-400 text-xl"
              >
                <FaEye />
              </button>
            </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
          <label
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold cursor-pointer transition"
            onClick={handleProfilePicClick}
          >
            <FaUserCircle />
            Update Profile
            <input type="file" accept="image/*" className="hidden" disabled />
          </label>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-4 py-2 bg-[#900000] hover:bg-[#7b0000] text-white rounded font-medium"
          >
            <FaSignOutAlt /> Contact Admin
          </Link>

          <Link
            to="/orders"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
          >
            <FaBox /> Go to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
