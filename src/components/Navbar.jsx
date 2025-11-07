import React, { lazy, useCallback, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import Logo from '../assets/logo.png';
import clsx from 'clsx';
import { HiMenu, HiSearch, HiUser, HiShoppingCart } from 'react-icons/hi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import ThemeToggle from './ThemeToggle';
const CartSidebar = lazy(() => import('./CartSidebar'));
const AuthModal = lazy(() => import('./AuthModal'));
import SmallButton from './SmallButton';

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { isAuthenticated, logout, role } = useAuth();
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
        'dark:bg-gray-900/70',
        'text-gray-800',
        'dark:text-gray-100',
        'text-lg',
        'backdrop-blur-md',
        'backdrop-filter',
        'border-b',
        'border-gray-200',
        'dark:border-gray-700',
        'transition-colors',
        'duration-200'
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
        'dark:hover:bg-gray-700',
        'transition-colors',
        'duration-200',
        'text-gray-800',
        'dark:text-gray-200',
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

    const scrollToMenu = () => {
        // If not on home page, navigate to home first
        if (window.location.pathname !== '/') {
            navigate('/', { state: { scrollToMenu: true } });
            // Wait for navigation then scroll
            setTimeout(() => {
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // If on home page, scroll to menu section
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const routesLinks = ['/', '/contact', '/about'];
    const routes = ['Home', 'Contact', 'About'];
    if (role === 'admin') {
        routesLinks.push('/admin');
        routes.push('Dashboard');
    }

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
                            className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow bg-white dark:bg-gray-800"
                        >
                            <li>
                                <NavLink to={routesLinks[0]} className={getMenuItemClasses}>
                                    {routes[0]}
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={scrollToMenu}
                                    className="hover:text-primary transition-colors duration-200"
                                >
                                    Menu
                                </button>
                            </li>
                            {routesLinks.slice(1).map((path, i) => (
                                <li key={i + 1}>
                                    <NavLink to={path} className={getMenuItemClasses}>
                                        {routes[i + 1]}
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
                        <li>
                            <NavLink to={routesLinks[0]} className={getMenuItemClasses}>
                                {routes[0]}
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={scrollToMenu}
                                className="hover:text-primary transition-colors duration-200 text-xl"
                            >
                                Menu
                            </button>
                        </li>
                        {routesLinks.slice(1).map((path, i) => (
                            <li key={i + 1}>
                                <NavLink to={path} className={getMenuItemClasses}>
                                    {routes[i + 1]}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end">
                    {isAuthenticated ? (
                        <div className="dropdown dropdown-end">
                            <SmallButton tabIndex={0}>
                                <HiUser className="h-5 w-5" />
                            </SmallButton>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow bg-white dark:bg-gray-800"
                            >
                                <li>
                                    <button
                                        onClick={() => navigate('/profile')}
                                        className="text-gray-800 dark:text-gray-200 hover:text-primary"
                                    >
                                        Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-gray-800 dark:text-gray-200 hover:text-red-600"
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

                    <ThemeToggle />

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
