import React from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
    };

    return (
        <button
            onClick={handleClick}
            className="btn btn-ghost hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border-0 shadow-none rounded-lg text-gray-800 dark:text-gray-200"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
        >
            {theme === 'light' ? (
                <HiMoon className="h-5 w-5" />
            ) : (
                <HiSun className="h-5 w-5" />
            )}
        </button>
    );
};

export default ThemeToggle;
