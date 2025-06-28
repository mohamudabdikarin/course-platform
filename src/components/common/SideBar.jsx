// src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiGrid, FiBookOpen, FiMessageSquare, FiSettings, FiLogOut, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: FiGrid, label: 'Dashboard', path: '/' },
  { icon: FiBookOpen, label: 'Courses', path: '/courses' },
  { icon: FiMessageSquare, label: 'Messages', path: '/messages' },
  { icon: FiSettings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const baseLinkClasses = "flex items-center px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200";
  const inactiveLinkClasses = "text-light-subtext hover:bg-gray-200 dark:text-dark-subtext dark:hover:bg-gray-700";
  const activeLinkClasses = "bg-primary text-white shadow-md";

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside className={`fixed lg:relative inset-y-0 left-0 bg-light-card dark:bg-dark-card w-64 p-6 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-lg`}>
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold text-primary">MyCourses.io</h1>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-light-subtext dark:text-dark-subtext">
            <FiX size={24} />
          </button>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                  onClick={() => setSidebarOpen(false)} // Close sidebar on mobile after click
                >
                  <item.icon className="mr-4" size={22} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-lg font-medium rounded-lg text-danger hover:bg-danger/10 transition-colors duration-200"
          >
            <FiLogOut className="mr-4" size={22} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;