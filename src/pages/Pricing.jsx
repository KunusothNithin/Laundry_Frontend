import React from "react";
import {
  FaTshirt,
  FaRegSun,
  FaRegCalendarAlt,
  FaBed,
  FaSocks,
  FaUserTie,
  FaUserAlt,
  FaUserGraduate,
  FaUserNurse,
  FaShower,
} from "react-icons/fa";
import {
  GiArmoredPants,
  GiTShirt,
  GiTowel,
  GiCape,
  GiUnderwearShorts,
  GiSleevelessJacket,
  GiClothes,
  GiSkirt,
  GiLargeDress,
} from "react-icons/gi";
import { MdBed } from "react-icons/md";

const monthlyYearlyPlans = [
  {
    title: "Monthly Plan",
    price: "₹399/month",
    description: "Ideal for regular weekly washing",
    features: [
      "25 Clothes/week",
      "Washing + Ironing + Folding",
      "Priority Pickup & Delivery",
    ],
    icon: <FaRegCalendarAlt size={32} />,
  },
  {
    title: "Yearly Plan",
    price: "₹3999/year",
    description: "Best value for long-term savings",
    features: [
      "Same as monthly",
      "2 Free Express Services/month",
      "Exclusive Discounts",
    ],
    icon: <FaRegSun size={32} />,
  },
];

const boysClothing = [
  { type: "Shirt", price: "₹10", icon: <FaTshirt size={66} /> },
  { type: "Pant", price: "₹12", icon: <GiArmoredPants size={66} /> },
  { type: "T-Shirt", price: "₹8", icon: <GiTShirt size={66} /> },
  { type: "Jeans", price: "₹15", icon: <GiArmoredPants size={66} /> },
  { type: "Kurta", price: "₹10", icon: <GiCape size={66} /> },
  { type: "Coat/Blazer", price: "₹25", icon: <FaUserTie size={66} /> },
  { type: "Jacket", price: "₹20", icon: <GiSleevelessJacket size={66} /> },
  { type: "Shorts", price: "₹10", icon: <GiUnderwearShorts size={66} /> },
  { type: "Undergarments", price: "₹5", icon: <FaUserAlt size={66} /> },
  { type: "Socks", price: "₹5", icon: <FaSocks size={66} /> },
];

const girlsClothing = [
  { type: "Kurti", price: "₹10", icon: <GiCape size={66} /> },
  { type: "Leggings", price: "₹8", icon: <GiArmoredPants size={66} /> },
  { type: "Tops", price: "₹10", icon: <FaTshirt size={66} /> },
  { type: "Palazzo", price: "₹12", icon: <GiClothes size={66} /> },
  { type: "Saree", price: "₹18", icon: <GiLargeDress size={66} /> },
  { type: "Blouse", price: "₹8", icon: <GiClothes size={66} /> },
  { type: "Salwar Kameez", price: "₹20", icon: <GiCape size={66} /> },
  { type: "Dupatta", price: "₹6", icon: <GiTowel size={66} /> },
  { type: "Skirt", price: "₹12", icon: <GiSkirt size={66} /> },
  { type: "Undergarments", price: "₹5", icon: <FaUserNurse size={66} /> },
];

const commonItems = [
  { type: "Bed Sheet (Single)", price: "₹25", icon: <FaBed size={66} /> },
  { type: "Bed Sheet (Double)", price: "₹35", icon: <MdBed size={66} /> },
  { type: "Blanket", price: "₹50", icon: <FaBed size={66} /> },
  { type: "Towel", price: "₹7", icon: <GiTowel size={66} /> },
];

const Pricing = () => {
  return (
    <div className="mt-8 min-h-screen bg-gray-100 dark:bg-black py-16 px-4">
      {/* Header */}
      <h2 className="text-4xl font-bold text-center text-[#900000] dark:text-yellow-400 mb-12">
        Our Pricing Plans
      </h2>

      {/* Plans */}
      <div className="grid gap-10 max-w-5xl mx-auto sm:grid-cols-2 mb-16">
        {monthlyYearlyPlans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-6 rounded-2xl shadow-md hover:scale-105 transition"
          >
            <div className="text-[#219000] mb-4">{plan.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-[#900000] dark:text-yellow-400">
              {plan.title}
            </h3>
            <p className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
              {plan.price}
            </p>
            <p className="text-md mb-4 text-gray-600 dark:text-gray-300">
              {plan.description}
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Boys Clothing */}
      <h3 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400 mb-6">
        Boys Clothing
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {boysClothing.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-5 rounded-xl shadow-md flex items-center gap-4 hover:scale-105 transition"
          >
            <div className="text-[#219000]">{item.icon}</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.type}
              </h4>
              <p className="text-[#900000] dark:text-yellow-400 font-bold">
                {item.price} / wash
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Girls Clothing */}
      <h3 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400 mb-6">
        Girls Clothing
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
        {girlsClothing.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-5 rounded-xl shadow-md flex items-center gap-4 hover:scale-105 transition"
          >
            <div className="text-[#219000]">{item.icon}</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.type}
              </h4>
              <p className="text-[#900000] dark:text-yellow-400 font-bold">
                {item.price} / wash
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Common Items */}
      <h3 className="text-3xl font-bold text-center text-[#900000] dark:text-yellow-400 mb-6">
        Bedding & Common Items
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {commonItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 p-5 rounded-xl shadow-md flex items-center gap-4 hover:scale-105 transition"
          >
            <div className="text-[#219000]">{item.icon}</div>
            <div>
              <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                {item.type}
              </h4>
              <p className="text-[#900000] dark:text-yellow-400 font-bold">
                {item.price} / wash
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
