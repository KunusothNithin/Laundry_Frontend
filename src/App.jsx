import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Landing from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import OrderTracking from './pages/OrderTracking';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Orders from './pages/Orders';
import NewOrder from './pages/NewOrder';

function App() {
  return (
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/orders" element={<Orders />}/>
            <Route path="/new-order" element={<NewOrder />} />
            {/* <Route path="/orders/:orderId" element={<OrderDetails />} /> */}
          {/* <Route path="/admin/update-order/:orderId" element={<AdminOrderUpdate />} /> */}
          {/* <Route path="/orders" element={<OrdersList />} /> */}

          </Routes>
        </main>
        <Footer />
       <ToastContainer position="top-right" autoClose={3000} />
      </div>
  );
}

export default App;
