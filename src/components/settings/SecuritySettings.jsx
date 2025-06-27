// src/components/settings/SecuritySettings.jsx
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';

const SecuritySettings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Password changed successfully!');
    // In a real app, clear the form fields
    e.target.reset();
  };

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-6">Change Password</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input id="currentPassword" type="password" required className="mt-1 w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input id="newPassword" type="password" required className="mt-1 w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600" />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input id="confirmPassword" type="password" required className="mt-1 w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600" />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary">Update Password</Button>
        </div>
      </form>
    </Card>
  );
};

export default SecuritySettings;