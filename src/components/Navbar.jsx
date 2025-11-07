import React, { lazy, useCallback, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import Logo from '../assets/logo.png';
import clsx from 'clsx';
import { HiMenu, HiSearch, HiUser, HiShoppingCart } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
const CartSidebar = lazy(() => import('./CartSidebar'));
const AuthModal = lazy(() => import('./AuthModal'));
import SmallButton from './SmallButton';

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const { getTotalItems, handleLogout: clearCart } = useCart();
    const navigate = useNavigate();

    const cartItemsCount = getTotalItems();

    const navClasses = clsx(
        'sticky',
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

    const closeAuth = useCallback(() => {
        setIsAuthOpen(false);
    }, []);

    const handleLogout = () => {
        clearCart(); // Clear cart from local storage and state
        logout();
        navigate('/');
    };

    return (
        <>
            <AuthModal isOpen={isAuthOpen} closeAuth={closeAuth} />
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
                            <HiMenu className="h-5 w-5" />
                        </div>
                        <ul
                            tabIndex={-1}
                            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-white"
                        >
                            {['/', '/contact', '/about'].map((path, i) => (
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
                        {['/', '/contact', '/about'].map((path, i) => (
                            <li key={i}>
                                <NavLink to={path} className={getMenuItemClasses}>
                                    {['Home', 'Contact', 'About'][i]}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
                    <SmallButton>
                        <HiSearch className="h-5 w-5" />
                    </SmallButton>

                    {isAuthenticated ? (
                        <div className="dropdown dropdown-end">
                            <SmallButton tabIndex={0}>
                                <HiUser className="h-5 w-5" />
                            </SmallButton>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white"
                            >
                                <li>
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="text-gray-800 hover:text-primary"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-800 hover:text-red-600"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <SmallButton onClick={() => setIsAuthOpen(true)}>
                            <HiUser className="h-5 w-5" />
                        </SmallButton>
                    )}

                    <SmallButton onClick={() => setIsCartOpen(true)}>
                        <div className="indicator">
                            <HiShoppingCart className="h-5 w-5" />
                            {cartItemsCount > 0 && (
                                <span className="badge badge-sm indicator-item bg-blue-600 text-white border-0">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                    </SmallButton>
                </div>
            </div>
        </>
    );
};

export default Navbar;
