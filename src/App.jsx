import React,{useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//admin components

import AdminNavbar from "./components/admin/AdminNavbar";
import AdminFooter from "./components/admin/AdminFooter";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProfile from "./pages/admin/AdminProfile"
import AllUsers from "./pages/admin/AllUsers"

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

function App() {
  const [role, setRole] = useState('user');

  useEffect(() => {
    const fetchRole = async (req, res) => {
          const user = JSON.parse(localStorage.getItem('appUser'));
          setRole(user.role);
    };
    fetchRole();
  },[]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-white">
      {role == 'admin'? (<AdminNavbar/>):(<Navbar />) }

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/profile" element={role == 'admin'? (<AdminProfile />):(<Profile />) } />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={role == 'admin'? (<AdminOrders />):(<Orders />) } />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/allusers" element={<AllUsers/>} />
          
        </Routes>
      </main>
      
       {role == 'admin'? (<AdminFooter />):(<Footer />) }
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
