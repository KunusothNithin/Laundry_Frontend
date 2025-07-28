// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AuthContext } from "./context/AuthContext";

// Public Navs
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Admin Navs
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminFooter from "./components/admin/AdminFooter";

// Pages
import Landing from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrderTracking from "./pages/OrderTracking";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import UpdateProfile from "./pages/UpdateProfile";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProfile from "./pages/admin/AdminProfile";
import AllUsers from "./pages/admin/AllUsers";

function App() {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const role = user?.role || "guest";

  const isAdmin = isLoggedIn && role === "admin";
  const isUser = isLoggedIn && role === "user";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
      {/* Dynamic Navbar */}
      {isAdmin ? <AdminNavbar /> : <Navbar />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={isAdmin ? <AdminProfile /> : <Profile />} />
          <Route path="/orders" element={isAdmin ? <AdminOrders /> : <Orders />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/allusers" element={<AllUsers />} />
        </Routes>
      </main>

      {/* Dynamic Footer */}
      {isAdmin ? <AdminFooter /> : <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
