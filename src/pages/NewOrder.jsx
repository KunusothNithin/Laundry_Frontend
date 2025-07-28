import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  FaIdBadge,
  FaTshirt,
  FaListOl,
  FaStickyNote,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const laundryItems = ["Shirt", "Pant", "Kurti", "Bedsheet", "Towel", "Saree", "Blanket"];

const PRICES = {
  Shirt: 10,
  Pant: 12,
  Kurti: 15,
  Bedsheet: 20,
  Towel: 8,
  Saree: 25,
  Blanket: 30,
};

const NewOrder = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  const [form, setForm] = useState({
    selectedItems: [],
    quantity: "",
    notes: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("appUser"));
    if (user?.id) {
      setUserId(user.id);
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (item) => {
    setForm((prev) => {
      const selected = prev.selectedItems.includes(item)
        ? prev.selectedItems.filter((i) => i !== item)
        : [...prev.selectedItems, item];
      return { ...prev, selectedItems: selected };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.selectedItems.length || !form.quantity) {
      toast.error("Please select items and quantity");
      return;
    }

    const quantityPerItem = Math.floor(form.quantity / form.selectedItems.length);
    const items = form.selectedItems.map((clothType) => ({
      clothType,
      quantity: quantityPerItem || 1,
    }));

    const totalAmount = items.reduce((sum, item) => {
      const price = PRICES[item.clothType] || 10;
      return sum + price * item.quantity;
    }, 0);

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("appUser"));
      const token = user.token;

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders/placeOrder`,
        { items, totalAmount, notes: form.notes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("✅ Order placed successfully!");
      setForm({ selectedItems: [], quantity: "", notes: "" });

      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error(
        error.response?.data?.message || "❌ Failed to place order. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen py-10 px-4 mt-16 sm:px-8 bg-white dark:bg-black">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-zinc-800 p-6 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#900000] dark:text-yellow-400">
          🧺 Place a New Laundry Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-1 font-semibold dark:text-yellow-400 flex items-center gap-2">
              <FaIdBadge className="text-[#900000] dark:text-yellow-400" />
              User ID: <span className="text-sm">{userId}</span>
            </label>
          </div>

          {/* Laundry Items */}
          <div>
            <label className="mb-2 font-semibold dark:text-yellow-400 flex items-center gap-2">
              <FaTshirt className="text-[#900000] dark:text-yellow-400" />
              Select Items<span className="text-[#900000]">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {laundryItems.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm dark:text-white">
                  <input
                    type="checkbox"
                    value={item}
                    checked={form.selectedItems.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    className="accent-[#900000]"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="mb-1 font-semibold dark:text-yellow-400 flex items-center gap-2">
              <FaListOl className="text-[#900000] dark:text-yellow-400" />
              Total Quantity<span className="text-[#900000]">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white"
              placeholder="e.g., 5"
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 font-semibold dark:text-yellow-400 flex items-center gap-2">
              <FaStickyNote className="text-[#900000] dark:text-yellow-400" />
              Special Notes
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white"
              rows="3"
              placeholder="Any specific instructions..."
            />
          </div>

          {/* Submit & Back */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="submit"
              className="bg-[#900000] hover:bg-[#7b0000] text-white font-bold py-2 px-5 rounded transition"
            >
              Place Order
            </button>
            <Link
              to="/orders"
              className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-5 rounded transition flex items-center gap-2"
            >
              <FaArrowLeft /> Back to Orders
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
