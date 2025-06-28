// src/components/common/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiBell, FiSun, FiMoon, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ setSidebarOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Derive page title from path
  const getPageTitle = (pathname) => {
    const name = pathname.split('/').filter(Boolean)[0] || 'Dashboard';
    if (name === 'courses' && pathname.split('/').length > 2) return "Course Details";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  
  const pageTitle = getPageTitle(location.pathname);

  const notifications = [
    { text: "New enrollment in 'React Advanced'", time: "5m ago", type: "enrollment" },
    { text: "John Doe sent you a message", time: "1h ago", type: "message" },
    { text: "Your course 'Tailwind CSS' got a 5-star review!", time: "3h ago", type: "review" },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/login');
  };

  const handleProfileClick = () => {
    setUserMenuOpen(false);
    navigate('/settings');
  };

  const handleSettingsClick = () => {
    setUserMenuOpen(false);
    navigate('/settings');
  };

  const handleNotificationClick = (notification) => {
    setNotificationOpen(false);
    if (notification.type === 'message') {
      navigate('/messages');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'enrollment':
        return '👨‍🎓';
      case 'message':
        return '💬';
      case 'review':
        return '⭐';
      default:
        return '🔔';
    }
  };

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
        <div className="relative" ref={notificationRef}>
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
                className="absolute right-0 mt-2 w-80 bg-light-card dark:bg-dark-card rounded-lg shadow-xl z-20 max-h-96 overflow-y-auto"
              >
                <div className="p-4 font-bold border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <span>Notifications</span>
                  <button 
                    onClick={() => navigate('/messages')}
                    className="text-sm text-primary hover:underline"
                  >
                    View All Messages
                  </button>
                </div>
                <ul className="py-2">
                  {notifications.map((notif, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                      onClick={() => handleNotificationClick(notif)}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{getNotificationIcon(notif.type)}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notif.text}</p>
                          <p className="text-xs text-light-subtext dark:text-dark-subtext">{notif.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
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
                  <li 
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={handleProfileClick}
                  >
                    <FiUser className="mr-2" /> Profile
                  </li>
                  <li 
                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={handleSettingsClick}
                  >
                    <FiSettings className="mr-2" /> Settings
                  </li>
                  <li 
                    className="flex items-center px-4 py-2 text-danger hover:bg-danger/10 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="mr-2" /> Logout
                  </li>
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