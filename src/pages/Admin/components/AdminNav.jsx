import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../../../components/Button';

export default function AdminNav() {
    const { logout } = useAuth();
    return (
        <nav className="bg-[#2E2A2A] text-white flex justify-between items-center px-6 py-4 shadow-md">
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>

            <Button
                onClick={logout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
                <FiLogOut />
                Logout
            </Button>
        </nav>
    );
}
