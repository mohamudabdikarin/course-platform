// src/components/common/Header.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FiMenu, FiBell, FiSun, FiMoon, FiUser, FiLogOut } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  // Derive page title from path
  const getPageTitle = (pathname) => {
    const name = pathname.split('/').filter(Boolean)[0] || 'Dashboard';
    if (name === 'courses' && pathname.split('/').length > 2) return "Course Details";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  const pageTitle = getPageTitle(location.pathname);

  const notifications = [
    { text: "New enrollment in 'React Advanced'", time: "5m ago" },
    { text: "John Doe sent you a message", time: "1h ago" },
    { text: "Your course 'Tailwind CSS' got a 5-star review!", time: "3h ago" },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-light-card dark:bg-dark-card shadow-sm h-16 flex-shrink-0">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-light-subtext dark:text-dark-subtext mr-4">
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-light-text dark:text-dark-text">{pageTitle}</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          {theme === 'light' ? <FiMoon size={22} /> : <FiSun size={22} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => setNotificationOpen(!isNotificationOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative">
            <FiBell size={22} />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-danger ring-2 ring-light-card dark:ring-dark-card"></span>
          </button>
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-80 bg-light-card dark:bg-dark-card rounded-lg shadow-xl z-20"
              >
                <div className="p-4 font-bold border-b border-gray-200 dark:border-gray-700">Notifications</div>
                <ul className="py-2">
                  {notifications.map((notif, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <p className="text-sm">{notif.text}</p>
                      <p className="text-xs text-light-subtext dark:text-dark-subtext">{notif.time}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button onClick={() => setUserMenuOpen(!isUserMenuOpen)}>
            <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" alt="Instructor Avatar" />
          </button>
          <AnimatePresence>
            {isUserMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-light-card dark:bg-dark-card rounded-lg shadow-xl z-20"
              >
                <ul className="py-1">
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"><FiUser className="mr-2" /> Profile</li>
                  <li className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"><FiSettings className="mr-2" /> Settings</li>
                  <li className="flex items-center px-4 py-2 text-danger hover:bg-danger/10 cursor-pointer"><FiLogOut className="mr-2" /> Logout</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;