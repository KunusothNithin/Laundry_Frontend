import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaUser, FaIdBadge, FaTshirt, FaListOl, FaStickyNote, FaArrowLeft } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import { useNavigate, Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const laundryItems = [
  'Shirt',
  'Pant',
  'Kurti',
  'Bedsheet',
  'Towel',
  'Saree',
  'Blanket',
];

const NewOrder = () => {
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    hostelId: '',
    selectedItems: [],
    quantity: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (item) => {
    setForm((prev) => {
      const alreadySelected = prev.selectedItems.includes(item);
      return {
        ...prev,
        selectedItems: alreadySelected
          ? prev.selectedItems.filter((i) => i !== item)
          : [...prev.selectedItems, item],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.hostelId || !form.selectedItems.length || !form.quantity) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const newOrder = {
      ...form,
        id: `${form.hostelId}`,
        date: new Date().toISOString().split('T')[0],
        items: form.selectedItems,
        status: 'Received',
        total: `₹${Math.floor(Math.random() * (100 - 50 + 1)) + 50}`,
        timestamp: new Date().toLocaleString(),
    };

    addOrder(newOrder);
    toast.success('Order placed successfully!');

    setTimeout(() => {
      navigate('/orders');
    }, 2000);

    setForm({
      name: '',
      hostelId: '',
      selectedItems: [],
      quantity: '',
      notes: '',
    });
  };

  return (
    <div className=" min-h-screen py-10 px-4 mt-8 sm:px-8 bg-white dark:bg-black">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="max-w-2xl mx-auto bg-gray-100 dark:bg-zinc-800 p-6 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#900000] dark:text-yellow-400 dark:hover:text-[#109000]">
          🧺 Place a New Laundry Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="mb-1 font-semibold flex items-center gap-2 dark:text-yellow-400">
              <FaUser className="text-[#900000] dark:text-yellow-400" /> Name<p className='text-[#900000]'> *</p> 
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Hostel ID*/}
          <div>
            <label className="mb-1 font-semibold dark:text-yellow-400 flex items-center gap-2">
              <FaIdBadge className="text-[#900000] dark:text-yellow-400" /> Hostel ID<p className='text-[#900000]'> *</p>
            </label>
            <input
              type="text"
              name="hostelId"
              value={form.hostelId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-zinc-600 rounded dark:bg-zinc-700 dark:text-white"
              placeholder="e.g., RGUKT123"
              required
            />
          </div>

          {/* Laundry Items*/}
          <div>
            <label className="mb-2 font-semibold  dark:text-yellow-400 flex items-center gap-2">
              <FaTshirt className="text-[#900000] dark:text-yellow-400" /> Select Items<p className='text-[#900000]'> *</p>
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

          {/* Quantity*/}
          <div>
            <label className="mb-1 font-semibold dark:text-yellow-400 flex items-center gap-2">
              <FaListOl className="text-[#900000] dark:text-yellow-400" /> Total Quantity<p className='text-[#900000]'> *</p>
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
              <FaStickyNote className="text-[#900000] dark:text-yellow-400" /> Special Notes
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
