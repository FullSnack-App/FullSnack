import React, { useState } from 'react';
import CartItem from './CartItem';

const CartSidebar = ({ isOpen, closeCart }) => {
    const [items, setItems] = useState([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
    ]); // Placeholder items from cart context

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-1" type="checkbox" className="drawer-toggle" checked={isOpen} />
            <div className="drawer-side">
                <label htmlFor="my-drawer-1" className="drawer-overlay" onClick={closeCart}></label>
                <div className=" p-4 w-full sm:w-100  bg-white h-full  text-gray-800">
                    <div
                        className="flex items-center justify-between mb-8 "
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-6">Cart</h2>
                        <button
                            onClick={closeCart}
                            className="mb-4 cursor-pointer text-gray-600 hover:text-gray-800"
                        >
                            Close
                        </button>
                    </div>
                    <ul className="space-y-4" onClick={(e) => e.stopPropagation()}>
                        {items.map((item) => (
                            <CartItem key={item.id} id={item.id} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
