import CartItem from './CartItem';
import Button from './Button';
import { Link } from 'react-router';
import { useCart } from '../hooks/useCart';

const CartSidebar = ({ isOpen, closeCart }) => {
    const { items, getSubtotal } = useCart();

    const subtotal = getSubtotal();
    const deliveryFee = subtotal > 50 ? 0 : 5.0;
    const total = subtotal + deliveryFee;

    return (
        <div className="drawer drawer-end">
            <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle"
                checked={isOpen}
                readOnly
            />
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-1" className="drawer-overlay" onClick={closeCart} />
                <div
                    className="bg-white h-full w-full md:max-w-md lg:max-w-lg flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-2xl font-bold text-gray-900">Cart</h2>
                        <button
                            onClick={closeCart}
                            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
                            aria-label="Close cart"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <svg
                                    className="w-16 h-16 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                <p className="text-lg font-medium">Your cart is empty</p>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {items.map((item) => (
                                    <CartItem key={item.menuItemId} {...item} />
                                ))}
                            </ul>
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="border-t bg-white p-6 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center text-gray-700">
                                    <span>Delivery Fee</span>
                                    <span
                                        className={`font-semibold ${
                                            deliveryFee === 0 ? 'text-green-600' : ''
                                        }`}
                                    >
                                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-lg font-bold pt-3 border-t">
                                    <span className="text-gray-900">Total</span>
                                    <span className="text-blue-600">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link to="/checkout" onClick={closeCart}>
                                <Button className="w-full">Proceed to Checkout</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartSidebar;
