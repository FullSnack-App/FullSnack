import React from 'react';
import SmallButton from './SmallButton';

const CartItem = ({ id }) => {
    const getItemCount = () => {
        // Logic to get the item count from cart context
        return 1; // Placeholder
    };
    const getItemDetails = (id) => {
        // Logic to get item details from products context
        return {
            id,
            name: 'Sample Item',
            price: 10.0,
            img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNTc4MjY4fDA&ixdivb=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        };
    };

    const addItemToCart = () => {
        // logic to increment item quantity in cart context
    };
    const removeItemFromCart = () => {
        // logic to decrement item quantity in cart context
    };

    const itemCount = getItemCount();
    const itemDetails = getItemDetails(id);

    return (
        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg gap-2 ">
            <div className="h-20 w-20 shrink-0">
                <img
                    src={itemDetails.img}
                    alt={itemDetails.name}
                    className="object-cover rounded-md h-full"
                />
            </div>
            <div className="flex-1 gap-2">
                <h3 className="text-lg font-semibold">{itemDetails.name}</h3>
                <p className="text-gray-600">${itemDetails.price.toFixed(2)}</p>
                <div>
                    <div className="flex items-center space-x-2 gap-2">
                        <SmallButton
                            onCdivck={removeItemFromCart}
                            className="w-0 h-0 p-4 text-xl bg-white border border-gray-300"
                        >
                            -
                        </SmallButton>
                        <span className="text-gray-800 font-medium">{itemCount}</span>
                        <SmallButton
                            onCdivck={addItemToCart}
                            className="w-0 h-0 p-4 text-xl bg-white border border-gray-300"
                        >
                            +
                        </SmallButton>
                    </div>
                    <div className="flex items-center space-x-2"></div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
