import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTshirt, FaTruck, FaUserShield, FaClock } from "react-icons/fa";

const features = [
  {
    icon: <FaTshirt size={30} />,
    title: "Easy Laundry Booking",
    description: "Book your laundry with just a few clicks from anywhere.",
  },
  {
    icon: <FaTruck size={30} />,
    title: "Fast Pickup & Delivery",
    description: "Timely pickup and doorstep delivery of your clothes.",
  },
  {
    icon: <FaClock size={30} />,
    title: "Real-Time Order Tracking",
    description: "Track your orders live and stay updated.",
  },
  {
    icon: <FaUserShield size={30} />,
    title: "Secure & Reliable",
    description: "We prioritize your safety and garment care.",
  },
];

const Home = () => {
  return (
    <section className="mt-8 min-h-screen bg-gradient-to-br from-white to-white dark:from-black dark:to-black flex flex-col items-center justify-center px-4 py-12 transition-colors duration-500">
      {/* Heading Section */}
      <motion.div
        className="max-w-5xl text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-[#900000] dark:text-yellow-400">Smart Laundry Management</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Simplify your laundry chores with seamless booking, real-time tracking,
          and doorstep delivery.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            to="/register"
            className="bg-[#900000] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#590009] transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-[#219000] text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-[rgb(24,89,14)] transition dark:bg-gray-800 dark:text-white dark:hover:bg-[#219000]"
          >
            Login
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg p-6 text-center transition-colors duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="text-[#900000] dark:text-yellow-400 mb-3 flex justify-center">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Home;
