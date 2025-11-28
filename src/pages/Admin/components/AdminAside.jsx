import React from 'react';
import { FaHome, FaUsers, FaThList, FaShoppingCart } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export default function AdminAside({ isOpen, onClose }) {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition ${isActive ? 'bg-[#FF5722] text-white' : 'text-gray-700 hover:bg-gray-200'
        }`;

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={onClose}></div>}
            <aside className={`w-64 bg-white border-r shadow-md p-4 space-y-3 fixed md:relative top-0 left-0 h-screen z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } md:block`}>
                <div className="flex items-center gap-3 mb-6">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt="Admin avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-gray-800">Hello, Admin</span>
                </div>

                <nav className="flex flex-col space-y-2">
                    <NavLink to="/admin" end className={linkClasses}>
                        <FaHome /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/orders" className={linkClasses}>
                        <FaShoppingCart /> Orders
                    </NavLink>
                    <NavLink to="/admin/menu" className={linkClasses}>
                        <FaUsers /> Menu Items
                    </NavLink>
                    <NavLink to="/admin/offers" className={linkClasses}>
                        <FaThList /> Offers
                    </NavLink>
                </nav>
            </aside>
        </>
    );
}
