import React from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router";

export default function AdminNav() {
  return (
    <nav className="bg-[#2E2A2A] text-white flex justify-between items-center px-6 py-4 shadow-md">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <Link
        to="/"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
      >
        <FiLogOut />
        Logout
      </Link>
    </nav>
  );
}
