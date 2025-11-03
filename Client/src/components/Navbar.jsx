import React, { useCallback } from 'react';
import { NavLink, Link } from 'react-router';
import Logo from '../assets/logo.png';
import clsx from 'clsx';
import CartSidebar from './CartSidebar';
import SmallButton from './SmallButton';

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = React.useState(false);
    const navClasses = clsx(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'z-50',
        'px-4',
        'md:px-8',
        'lg:px-16',
        'h-16',
        'flex',
        'items-center',
        'justify-between',
        'navbar',
        'shadow-sm',
        'bg-white/70',
        'text-gray-800',
        'text-lg',
        'backdrop-blur-md',
        'backdrop-filter',
        'border-b',
        'border-gray-200'
    );

    const getMenuItemClasses = ({ isActive }) =>
        clsx(
            'hover:text-primary',
            'transition-colors',
            'duration-200',
            'active:bg-transparent',
            'focus:bg-transparent',
            'rounded-lg',
            isActive && 'text-primary font-semibold',
            'text-xl'
        );

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
    const closeCart = useCallback(() => {
        console.log('hi');
        setIsCartOpen(false);
    }, []);

    return (
        <div>
            <div className={navClasses} onClick={isCartOpen ? closeCart : undefined}>
                <div className="absolute">
                    <CartSidebar isOpen={isCartOpen} closeCart={closeCart} />
                </div>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className={`${iconButtonClasses} lg:hidden`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-white"
                        >
                            {['/', '/menu', '/about', '/contact'].map((path, i) => (
                                <li key={i}>
                                    <NavLink to={path} className={getMenuItemClasses}>
                                        {['Home', 'Menu', 'About', 'Contact'][i]}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link to="/" className="flex items-center">
                        <img src={Logo} alt="Logo" className="h-10 object-fill rounded-md" />
                        <p className="font-bold text-xl ml-2 text-primary">FullSnack</p>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        {['/', '/menu', '/about', '/contact'].map((path, i) => (
                            <li key={i}>
                                <NavLink to={path} className={getMenuItemClasses}>
                                    {['Home', 'Menu', 'About', 'Contact'][i]}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
                    <SmallButton>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </SmallButton>

                    <SmallButton>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </SmallButton>

                    <SmallButton onClick={() => setIsCartOpen(true)}>
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                    </SmallButton>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
