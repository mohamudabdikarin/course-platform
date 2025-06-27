import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-light-card dark:bg-dark-card p-6 rounded-xl shadow-card ${className}`}>
      {children}
    </div>
  );
};

export default Card;