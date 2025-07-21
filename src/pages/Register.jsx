// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  FaUser, FaIdBadge, FaEnvelope, FaPhone, FaLock
} from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    id: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      toast.success('Registered successfully!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center mt-8 justify-center bg-white dark:bg-black px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6 border mt-8">
        <h2 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={<FaUser className="text-zinc-400" />}
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <InputField
            icon={<FaIdBadge className="text-zinc-400" />}
            label="Student ID"
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="Enter your student ID"
          />
          <InputField
            icon={<FaEnvelope className="text-zinc-400" />}
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <InputField
            icon={<FaPhone className="text-zinc-400" />}
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          <InputField
            icon={<FaLock className="text-zinc-400" />}
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#900000] hover:bg-[#7a0000] text-white font-semibold py-2 rounded-xl transition duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="loader border-white border-t-transparent w-5 h-5 border-2 rounded-full animate-spin"></span>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
          Already have an account?{' '}
          <Link to="/login" className="text-[#900000] dark:text-yellow-400 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ icon, label, name, type = 'text', value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">{label}</label>
    <div className="flex items-center mt-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="ml-2 bg-transparent focus:outline-none w-full text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500"
      />
    </div>
  </div>
);

export default Register;
