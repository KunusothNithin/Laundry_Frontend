import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaTshirt,
  FaUserCircle,
  FaSignOutAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { toast } from "react-toastify";

const AdminNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!user;

  const authLinks = [
    { name: "Profile", path: "/profile", icon: <FaUserCircle /> },
    { name: "Dashboard", path: "/dashboard", icon: <FaTshirt /> },
    { name: "Pricing", path: "/pricing", icon: <FaUserCircle /> },
    { name: "Orders", path: "/orders", icon: <FaMoneyBillAlt /> },
    { name: "All Users", path: "/allusers", icon: <FaUserCircle /> },
  ];

  const navBg = theme === "light" ? "bg-[#900000]" : "bg-black";
  const textColor = theme === "light" ? "text-white" : "text-white dark:text-yellow-400";

  const handleLogout = () => {
    logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <nav className={`${navBg} ${textColor} flex justify-between shadow-md fixed w-full top-0 z-50 border-b`}>
      <div className="w-full px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <FaTshirt className="text-3xl text-white dark:text-yellow-400" />
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="text-2xl font-bold text-white dark:text-yellow-400 hover:text-[#109000] dark:hover:text-[#109000] transition"
          >
            Laundry Admin
          </Link>
        </div>

        {/* Desktop Links (only if logged in) */}
        {isLoggedIn && (
          <div className="hidden md:flex gap-6 items-center">
            {authLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg flex items-center gap-2 transition ${
                    isActive
                      ? "text-[#109000]"
                      : "text-white dark:text-yellow-400 hover:text-[#109000] dark:hover:text-[#109000]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              );
            })}

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaSignOutAlt /> Logout
            </button>

            <button onClick={toggleTheme} className="text-xl ml-2">
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu (only if logged in) */}
      {menuOpen && isLoggedIn && (
        <div className={`absolute top-full left-0 w-full ${navBg} ${textColor} md:hidden px-6 pb-4 z-50 shadow-lg`}>
          <ul className="flex flex-col gap-4 py-4">
            {authLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2 flex items-center gap-2 transition ${
                    location.pathname === link.path
                      ? "text-[#109000]"
                      : theme === "dark"
                      ? "dark:text-yellow-400 hover:text-[#109000]"
                      : "text-white hover:text-[#109000]"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left text-red-400 hover:text-red-500 flex items-center gap-2 py-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>

            <li>
              <button onClick={toggleTheme} className="text-xl flex items-center gap-2">
                {theme === "light" ? <FaMoon /> : <FaSun />} Theme
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
