import React from 'react';
import clsx from 'clsx';
const SmallButton = ({ className = '', children, ...props }) => {
    const iconButtonClasses = clsx(
        'btn',
        'btn-ghost',
        'hover:bg-hover/80',
        'transition-colors',
        'duration-200',
        'text-gray-800',
        'border-0',
        'shadow-none',
        'rounded-lg'
    );
    return (
        <button className={`${iconButtonClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default SmallButton;
