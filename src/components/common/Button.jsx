import React from 'react';

const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '', disabled = false }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-gray-200 text-light-text hover:bg-gray-300 dark:bg-gray-700 dark:text-dark-text dark:hover:bg-gray-600 focus:ring-gray-500',
    danger: 'bg-danger text-white hover:bg-red-700 focus:ring-danger',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;