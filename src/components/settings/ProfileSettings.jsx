// src/components/settings/ProfileSettings.jsx
import React, { useState, useRef } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { toast } from 'react-hot-toast';
import { FiUpload, FiX } from 'react-icons/fi';

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde');
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (PNG, JPG, GIF)');
      return;
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsUploading(false);
      toast.success('Image uploaded successfully!');
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast.error('Failed to upload image');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Image removed');
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call
    const toastId = toast.loading('Updating profile...');
    
    setTimeout(() => {
      // Update the profile image if a new one was uploaded
      if (imagePreview) {
        setProfileImage(imagePreview);
        setImagePreview(null);
      }
      
      toast.success('Profile updated successfully!', { id: toastId });
    }, 1500);
  };

  const currentImage = imagePreview || profileImage;

  return (
    <Card>
      <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              src={currentImage}
              alt="Instructor Avatar"
            />
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
            {imagePreview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <FiX size={12} />
              </button>
            )}
          </div>
          <div className="space-y-2">
            <Button 
              type="button" 
              variant="secondary" 
              className="flex items-center gap-2"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              <FiUpload /> 
              {isUploading ? 'Uploading...' : 'Upload New Picture'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <p className="text-xs text-light-subtext dark:text-dark-subtext">
              PNG, JPG, GIF up to 10MB.
            </p>
            {imagePreview && (
              <p className="text-xs text-green-600 dark:text-green-400">
                ✓ New image ready to save
              </p>
            )}
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
              <input 
                id="fullName" 
                type="text" 
                defaultValue="John Instructor" 
                className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
              <input 
                id="email" 
                type="email" 
                defaultValue="john.instructor@email.com" 
                className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" 
              />
            </div>
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">Your Bio</label>
          <textarea 
            id="bio" 
            rows="4" 
            placeholder="Tell us a little about yourself..." 
            className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
          ></textarea>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            type="submit" 
            variant="primary"
            disabled={isUploading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileSettings;