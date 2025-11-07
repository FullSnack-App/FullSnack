import React from 'react';

const OrderCard = ({ order }) => {
    const getStatusColor = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            preparing: 'bg-purple-100 text-purple-800',
            delivering: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                        Order #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                            order.status
                        )}`}
                    >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-orange-600">
                        ${order.totalAmount?.toFixed(2) || '0.00'}
                    </span>
                </div>
            </div>

            {/* Order Items */}
            {order.items && order.items.length > 0 && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Items:</p>
                    <div className="grid gap-2">
                        {order.items.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                            >
                                {item.menuItem?.imageUrl && (
                                    <img
                                        src={item.menuItem.imageUrl}
                                        alt={item.menuItem.name || 'Item'}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                )}
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {item.menuItem?.name || 'Unknown Item'}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Delivery Info */}
            {order.deliveryAddress && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Delivery to:</span> {order.deliveryAddress}
                    </p>
                    {order.phoneNumber && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <span className="font-semibold">Phone:</span> {order.phoneNumber}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderCard;
