// src/components/settings/AppearanceSettings.jsx
import React from 'react';
import Card from '../common/Card';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const AppearanceSettings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-6">Appearance</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium">Theme</h4>
          <p className="text-sm text-light-subtext dark:text-dark-subtext mb-3">
            Choose how MyCourses.io looks to you. Select a theme below.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex-1 p-4 rounded-lg border-2 ${
                theme === 'light' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <FiSun className="mx-auto mb-2" size={24} />
              <span className="font-semibold">Light</span>
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex-1 p-4 rounded-lg border-2 ${
                theme === 'dark' ? 'border-primary' : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <FiMoon className="mx-auto mb-2" size={24} />
              <span className="font-semibold">Dark</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppearanceSettings;