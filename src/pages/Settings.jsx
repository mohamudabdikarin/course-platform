// src/pages/Settings.jsx
import React, { useState } from 'react';
import { FiUser, FiShield } from 'react-icons/fi';
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';

const TABS = {
  PROFILE: 'Profile',
  SECURITY: 'Security',
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState(TABS.PROFILE);

  const tabsConfig = [
    { id: TABS.PROFILE, icon: FiUser, label: 'Profile' },
    { id: TABS.SECURITY, icon: FiShield, label: 'Security' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case TABS.SECURITY:
        return <SecuritySettings />;
      case TABS.PROFILE:
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Settings</h2>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="lg:w-1/4">
          <nav className="space-y-2">
            {tabsConfig.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white font-semibold'
                    : 'text-light-subtext hover:bg-gray-200 dark:text-dark-subtext dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Settings Content */}
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;