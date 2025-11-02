import React from "react";
import {
  FaHome,
  FaUsers,
  FaThList,
  FaBox,
  FaShoppingCart,
  FaRulerCombined,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";


export default function AdminAside() {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition ${isActive ? "bg-[#FF5722] text-white" : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <aside className="w-64 bg-white border-r shadow-md p-4 space-y-3">
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
        <NavLink to="/admin/menu" className={linkClasses}>
          <FaUsers /> MenuItem
        </NavLink>
        <NavLink to="/admin/offers" className={linkClasses}>
          <FaThList /> Offers
        </NavLink>

      </nav>
    </aside>
  );
}
