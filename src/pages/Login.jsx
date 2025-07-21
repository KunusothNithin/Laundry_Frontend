// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, form);
      const { user} = res.data;
      const token = user['token'];
      login(user, token);
      toast.success('🎉 Login successful!', { position: 'top-right' });
      navigate('/profile');
    } catch (err) {
      toast.error('❌ Invalid email or password', { position: 'top-right' });
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
              placeholder="you@rgukt.in"
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
          <div className="flex items-center border rounded-lg bg-gray-50 dark:bg-zinc-800 dark:border-zinc-600">
            <span className="px-3 text-gray-500 dark:text-gray-300">
              <FaLock />
            </span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-r-lg bg-transparent focus:outline-none dark:text-white"
            />
          </div>
        </div>

        <div className="text-right">
        </div>

        <button
          type="submit"
          className="w-full bg-[#900000] hover:bg-[#700000] text-white py-2 rounded-lg transition"
        >
          Login
        </button>
        <div className='flex justify-center aling-center'>
                    <button
            type="button"
            onClick={() => toast.info("Contact admin to reset password")}
            className="text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            Forgot password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
