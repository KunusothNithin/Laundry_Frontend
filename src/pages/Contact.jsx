import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="flex align-center justify-center bg-white  dark:bg-black">
          <div className="min-h-screen w-3/4 mt-8 bg-[#fefefe] dark:bg-black flex items-center justify-center px-4 py-10">
      <motion.div
        className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl px-6 py-8 shadow-2xl border border-gray-200 dark:border-zinc-700"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#900000] dark:text-yellow-400 flex items-center justify-center gap-2">
          <FaEnvelope /> Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className=" text-gray-800 dark:text-gray-300 mb-1 flex items-center gap-2">
              <FaUser /> Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full p-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#900000]"
            />
          </div>

          <div>
            <label className="text-gray-800 dark:text-gray-300 mb-1 flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#900000]"
            />
          </div>

          <div>
            <label className="text-gray-800 dark:text-gray-300 mb-1 flex items-center gap-2">
              <FaCommentDots /> Message
            </label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows="4"
              className="w-full p-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-[#900000]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#900000] hover:bg-[#700000] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaPaperPlane /> Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
    </div>
  );
};

export default Contact;
