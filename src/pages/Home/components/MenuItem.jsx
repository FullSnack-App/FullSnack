import { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../../../components/Button';
import { useCart } from '../../../hooks/useCart';
function MenuItem({ _id, name, description, price, imageUrl, rate, offer }) {
    const { addToCart, getItemQuantity, isLoading } = useCart();
    const discountedPrice = offer?.priceAfterDiscount ?? null;
    const [quantity, setQuantity] = useState(1);

    // Get current quantity in cart
    const cartQuantity = getItemQuantity(_id);

    const handleAddToCart = async () => {
        if (quantity <= 0) {
            toast.error('Quantity must be at least 1');
            return;
        }

        // Prepare menu item details for local storage (guest users)
        const menuItemDetails = {
            _id,
            name,
            description,
            price: discountedPrice || price,
            imageUrl,
            rate,
            offer,
        };

        await addToCart(_id, quantity, menuItemDetails);
        setQuantity(1);
    };

    return (
        <div
            className={`card bg-base-100 shadow-sm hover:shadow-lg transition-transform duration-300 relative overflow-hidden ${
                isLoading ? 'opacity-60 pointer-events-none' : ''
            }`}
        >
            <figure>
                <img
                    src={imageUrl}
                    alt={name}
                    className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                />
            </figure>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full absolute right-2 top-3 shadow-sm">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{rate}</span>
            </div>

            {offer && (
                <div className="absolute left-3 top-3 bg-orange-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    -{offer.discountPercent}
                </div>
            )}

            {/* Cart Count Badge */}
            {cartQuantity > 0 && (
                <div className="absolute right-3 bottom-3 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg z-10">
                    {cartQuantity} in cart
                </div>
            )}

            <div className="card-body mt-5 p-5">
                <h3 className="card-title text-lg mb-2">{name}</h3>
                <p className="text-sm text-gray-600 mb-3">{description}</p>

                <p className="text-xl text-orange-600 mb-3">
                    {offer ? (
                        <>
                            <span className="line-through text-gray-400 mr-2">${price}</span>
                            <span>${discountedPrice}</span>
                        </>
                    ) : (
                        <>${price}</>
                    )}
                </p>

                {/* Quantity + Add to Cart */}
                <div className="card-actions flex flex-col items-center gap-3 mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center gap-3 bg-orange-50 px-4 py-2 rounded-full">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="p-1 text-orange-600 hover:text-orange-700 transition"
                            disabled={isLoading}
                        >
                            <Minus size={18} />
                        </button>

                        <span className="text-lg text-gray-700 font-semibold">{quantity}</span>

                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="p-1 text-orange-600 hover:text-orange-700 transition"
                            disabled={isLoading}
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        className={`w-full rounded-xl flex items-center justify-center gap-2 `}
                        onClick={handleAddToCart}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            'Adding...'
                        ) : (
                            <>
                                <ShoppingCart size={16} />
                                Add to Cart
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
