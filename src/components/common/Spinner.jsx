import React from 'react';
import { FiLoader } from 'react-icons/fi';

const Spinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16',
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <FiLoader className={`animate-spin text-primary ${sizeClasses[size]}`} />
        </div>
    );
};

export default Spinner;