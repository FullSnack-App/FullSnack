import React from 'react';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useOrder } from '../../../../hooks/useOrder';

export default function AdminOrders() {
    const { orders, loading } = useOrder();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <FaSpinner className="animate-spin text-3xl text-[#FF5722]" />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Orders</h2>
            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-xl">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-4">Customer</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Total</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Payment</th>
                            <th className="py-3 px-4">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!orders || orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                                >
                                    No orders found
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order._id}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">
                                        {order.customerFullName}
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                        {order.customerEmail}
                                    </td>
                                    <td className="py-3 px-4 text-[#FF5722] font-semibold">
                                        ${order.totalAmount.toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4">
                                        {order.status === 'confirmed' ? (
                                            <span className="flex items-center gap-1 text-green-600">
                                                <FaCheckCircle /> Confirmed
                                            </span>
                                        ) : order.status === 'cancelled' ? (
                                            <span className="flex items-center gap-1 text-red-600">
                                                <FaTimesCircle /> Cancelled
                                            </span>
                                        ) : (
                                            <span className="text-yellow-500">Pending</span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 capitalize text-gray-700 dark:text-gray-300">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
