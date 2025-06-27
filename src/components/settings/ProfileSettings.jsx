// src/components/settings/ProfileSettings.jsx
import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';

const ProfileSettings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <img
            className="h-24 w-24 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="Instructor Avatar"
          />
          <div>
            <Button type="button" variant="secondary" className="flex items-center gap-2">
              <FiUpload /> Upload New Picture
            </Button>
            <p className="text-xs text-light-subtext dark:text-dark-subtext mt-2">
              PNG, JPG, GIF up to 10MB.
            </p>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input id="fullName" type="text" defaultValue="John Instructor" className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <input id="email" type="email" defaultValue="john.instructor@email.com" className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">Your Bio</label>
          <textarea id="bio" rows="4" placeholder="Tell us a little about yourself..." className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"></textarea>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSettings;