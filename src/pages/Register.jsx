import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {
  FaUser, FaIdBadge, FaEnvelope, FaPhone, FaLock, FaHashtag, FaEye, FaEyeSlash
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

  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!form.email.endsWith('@rgukt.ac.in')) {
      toast.error('Only @rgukt.ac.in emails are allowed');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');

      toast.success('OTP sent to your email');
      setOtpSent(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'OTP verification failed');

      toast.success('OTP Verified!');
      setIsOtpVerified(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      toast.error('Please verify OTP before registering');
      return;
    }

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
    <div className="mt-10 min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6 border mt-8">
        <h2 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={<FaUser />} label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
          <InputField icon={<FaIdBadge />} label="Student ID" name="id" value={form.id} onChange={handleChange} placeholder="Enter your student ID" />
          <InputField icon={<FaEnvelope />} label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your RGUKT email" />

          {!otpSent ? (
            <button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-300"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          ) : !isOtpVerified ? (
            <>
              <InputField
                icon={<FaHashtag />}
                label="OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button
                type="button"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-300"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
            </>
          ) : (
            <p className="text-green-600 text-sm font-medium">✅ OTP Verified</p>
          )}

          <InputField icon={<FaPhone />} label="Phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number" />
          <InputField
            icon={<FaLock />}
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
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

const InputField = ({
  icon,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  showPassword,
  setShowPassword
}) => {
  const isPasswordField = name === 'password';

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">{label}</label>
      <div className="flex items-center mt-1 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl relative">
        {icon}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="ml-2 bg-transparent focus:outline-none w-full text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 pr-8"
        />
        {isPasswordField && (
          <span
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 cursor-pointer text-zinc-500 dark:text-zinc-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Register;
