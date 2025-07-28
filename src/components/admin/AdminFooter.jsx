import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from "../../context/AuthContext";

const AdminFooter = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const isLoggedIn = !!user;
  const bgColor = theme === 'light' ? 'bg-[#900000]' : 'bg-black';
  const textColor = theme === 'light' ? 'text-white' : 'text-yellow-400';
  const linkHoverColor = theme === 'light' ? 'hover:text-black' : 'hover:text-[#109000]';
  const descriptionText = theme === 'light' ? 'text-gray-100' : 'text-gray-400';
  const copyright =
    theme === 'light' ? 'text-gray-200 border-gray-300' : 'text-gray-400 border-gray-700';

  return (
    <footer className={`${bgColor} ${textColor} py-8 w-full transition-colors duration-300 border-t`}>
      <div className="max-w-7xl mx-auto px-4 flex align-center justify-between gap-10">
        {/* Section 1: Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-white hover:text-[#209000] dark:text-yellow-400 dark:hover:text-[#209000]">LaundryApp</h2>
          <p className={`mt-2 text-sm ${descriptionText}`}>
            Your trusted solution for all laundry services. Easy, affordable, and fast!
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2 hover:text-[#209000]">Quick Links</h3>
          <ul className={`space-y-2 text-sm ${descriptionText}`}>
            {/* <li><Link to="/" className={`${linkHoverColor}`}>Home</Link></li> */}
            <li><Link to="/pricing" className={`${linkHoverColor}`}>Pricing</Link></li>
           {isLoggedIn &&  <li><Link to="/allusers" className={`${linkHoverColor}`}>All Users</Link></li>}
            {isLoggedIn && <li><Link to="/dashboard" className={`${linkHoverColor}`}>Dashboard</Link></li>}
          </ul>
        </div>

        {/* Section 3: Account */}
        <div>
          <h3 className="text-lg font-semibold mb-2 hover:text-[#209000]">Account</h3>
          <ul className={`space-y-2 text-sm ${descriptionText}`}>
            {isLoggedIn ? (
              <>
                <li><Link to="/profile" className={`${linkHoverColor}`}>Profile</Link></li>
                <li><Link to="/dashboard" className={`${linkHoverColor}`}>Dashboard</Link></li>
                <li>
                  <Link
                    to='/'
                    onClick={logout}
                    className={`bg-transparent p-0 m-0 ${linkHoverColor}`}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" className={`${linkHoverColor}`}>Login</Link></li>
                <li><Link to="/register" className={`${linkHoverColor}`}>Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>

      <div className={`mt-8 text-center text-sm border-t pt-4 ${copyright}`}>
        &copy; {new Date().getFullYear()} LaundryApp. All rights reserved.
      </div>
    </footer>
  );
};

export default AdminFooter;
