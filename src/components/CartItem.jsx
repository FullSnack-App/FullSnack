import React from 'react';
import SmallButton from './SmallButton';
import { useCart } from '../hooks/useCart';

const CartItem = ({ menuItemId, quantity, priceAtAddition, menuItemDetails }) => {
    const { updateCartItem, removeFromCart } = useCart();

    // Use menuItemDetails if available (from localStorage), otherwise use defaults
    const itemName = menuItemDetails?.name || 'Menu Item';
    const itemPrice = priceAtAddition || menuItemDetails?.price || 0;
    const itemImage =
        menuItemDetails?.imageUrl || menuItemDetails?.img || 'https://via.placeholder.com/150';

    const handleIncrement = () => {
        updateCartItem(menuItemId, quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            updateCartItem(menuItemId, quantity - 1);
        } else {
            removeFromCart(menuItemId);
        }
    };

    const handleRemove = () => {
        removeFromCart(menuItemId);
    };

    return (
        <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg gap-2">
            <div className="h-20 w-20 shrink-0">
                <img
                    src={itemImage}
                    alt={itemName}
                    className="object-cover rounded-md h-full w-full"
                />
            </div>
            <div className="flex-1 gap-2">
                <h3 className="text-lg font-semibold dark:text-gray-100">{itemName}</h3>
                <p className="text-gray-600 dark:text-gray-400">${itemPrice.toFixed(2)}</p>
                <div>
                    <div className="flex items-center space-x-2 gap-2">
                        <SmallButton
                            onClick={handleDecrement}
                            className="w-0 h-0 p-4 text-xl bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500"
                        >
                            -
                        </SmallButton>
                        <span className="text-gray-800 dark:text-gray-200 font-medium">{quantity}</span>
                        <SmallButton
                            onClick={handleIncrement}
                            className="w-0 h-0 p-4 text-xl bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500"
                        >
                            +
                        </SmallButton>
                        <button
                            onClick={handleRemove}
                            className="ml-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm"
                        >
                            Remove
                        </button>
                    </div>
                    <div className="flex items-center space-x-2"></div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
