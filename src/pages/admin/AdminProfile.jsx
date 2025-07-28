import React, { useEffect, useState, useContext } from "react";
import { FaUserCircle, FaSignOutAlt, FaBox, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [imgSource, setImgSource] = useState("");

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  const handleProfilePicClick = (e) => {
    e.preventDefault();
    navigate('/updateprofile');
  };

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
        
        if (response.data?.image) {
          
          setImgSource(`${import.meta.env.VITE_API_BASE_URL}/uploads/${response.data.image}`);
        }

      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black px-4 py-10 relative">
      {/* Logout button (top-right on small screens) */}
      <button
        onClick={handleLogout}
        className="absolute top-2 right-2 sm:hidden bg-[#900000] hover:bg-[#7b0000] text-white px-3 py-2 rounded-full shadow-lg"
      >
        <FaSignOutAlt />
      </button>

      <div className="mt-12 max-w-3xl mx-auto bg-white dark:bg-zinc-800 shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-[#900000] dark:text-yellow-400 mb-8 text-center">
          My Profile
        </h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <label
            className="cursor-pointer relative"
            onClick={handleProfilePicClick}
          >
            {user?.image && imgSource ? (
              <img
                src={imgSource}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-[#900000]"
              />
            ) : (
              <FaUserCircle className="text-8xl text-gray-400 dark:text-white" />
            )}
            <input type="file" accept="image/*" className="hidden" disabled />
          </label>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-center text-lg dark:text-white">
          <p>
            <span className="font-semibold">Name:</span> {user?.name}
          </p>
          <p>
            <span className="font-semibold">ID:</span> {user?.id}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user?.phone}
          </p>

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
            to="/orders"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium"
          >
            <FaBox /> Go to Orders
          </Link>
        </div>

        {/* Logout button for smaller screens */}
        <div className="flex lg:hidden justify-center mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-medium"
          >
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

