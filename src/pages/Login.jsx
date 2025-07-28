// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/login`,
        form
      );
      const { user } = res.data;
      const token = user["token"];
      login(user, token);
      toast.success("🎉 Login successful!", { position: "top-right" });
      navigate("/profile");
    } catch (err) {
      toast.error("❌ Invalid email or password", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-xl shadow-md border border-gray-200 dark:border-zinc-700 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400">
          Login to Your Account
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <div className="flex items-center border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-600">
            <span className="px-3 text-gray-500 dark:text-gray-300">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              placeholder="you@rgukt.ac.in"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-r-lg bg-transparent focus:outline-none dark:text-white"
            />
          </div>
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
    Password
  </label>
  <div className="flex items-center border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-600 relative">
    <span className="px-3 text-gray-500 dark:text-gray-300">
      <FaLock />
    </span>
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="••••••••"
      value={form.password}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 rounded-r-lg bg-transparent focus:outline-none dark:text-white pr-10"
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute right-3 text-gray-500 dark:text-gray-300 focus:outline-none"
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>


        <div className="text-right"></div>
        <div className="flex aling-center justify-between ">
          <button
            type="submit"
            className="w-1/4 bg-[#900000] hover:bg-[#700000] text-white py-2 rounded-lg transition"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => toast.info("Contact admin to reset password")}
            className="w-1/2/4 bg-[#007BFF] hover:bg-[#66B2FF] text-white px-4 rounded-lg transition"
          >
            Forgot password
          </button>
        </div>

        <div className="flex justify-center aling-center">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#900000] dark:text-yellow-400 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
