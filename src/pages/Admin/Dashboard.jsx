import React from 'react';
import { FaUsers, FaBox, FaShoppingCart, FaPercent } from 'react-icons/fa';
export default function AdminDashboard() {
    const stats = [
        { title: 'Total Orders', value: 128, icon: <FaShoppingCart />, color: 'bg-orange-500' },
        { title: 'Customers', value: 54, icon: <FaUsers />, color: 'bg-blue-500' },
        { title: 'Menu Items', value: 24, icon: <FaBox />, color: 'bg-green-500' },
        { title: 'Active Offers', value: 5, icon: <FaPercent />, color: 'bg-purple-500' },
    ];

    const salesData = [50, 80, 60, 120, 90, 160, 130];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition"
                    >
                        <div>
                            <h2 className="text-sm text-gray-500">{item.title}</h2>
                            <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
                        </div>
                        <div className={`text-white text-xl p-3 rounded-full ${item.color}`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Sales Overview</h2>
                <div className="flex items-end gap-3 h-40">
                    {salesData.map((val, i) => (
                        <div
                            key={i}
                            className="bg-[#FF5722] w-8 rounded-md"
                            style={{ height: `${val}px` }}
                        ></div>
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </div>
        </div>
    );
}
