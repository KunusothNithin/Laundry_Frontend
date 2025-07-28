import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";

const UpdateProfile = () => {
  const { user, setUser, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (profilePic) {
        data.append("profilePic", profilePic);
      }

      const id = user?._id || user?.id;

      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/updateprofile/${id}`,
        data,
        config
      );
      if (res.data && res.data.user) {
        setUser(res.data.user);
        toast.success("Profile updated successfully");
        navigate("/profile");
      } else {
        toast.error("Unexpected server response");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-[10%] dark:bg-black">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg dark:bg-zinc-900 rounded-lg mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-yellow-400">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#901000] hover:bg-[#903009] text-white font-medium py-2 px-4 rounded"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <div className="flex align-center justify-center">
          <Link
            to="/profile"
            className="bg-[#990000] mt-8 dark:bg-yellow-400 hover:bg-gray-400 text-white font-semibold py-2 px-5 rounded transition flex items-center gap-2"
          >
            <FaArrowLeft /> Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
