import { useState } from 'react';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ButtonComp from '../../../components/button';

function MenuItem({ name, description, price, imagesUrl, rate, offer }) {
    const discountedPrice = offer?.priceAfterDiscount ?? null;
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (quantity <= 0) {
            toast.error('Quantity must be at least 1');
            return;
        }
        toast.success(`${quantity} × ${name} added to cart`);
        console.log(`Added ${quantity} ${name} to cart`);
        setQuantity(1);
    };

    return (
        <div className="card bg-base-100 shadow-sm hover:shadow-lg transition-transform duration-300 relative overflow-hidden">
            <figure>
                <img
                    src={imagesUrl}
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
                    -{offer.discountPercent}%
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
                        >
                            <Minus size={18} />
                        </button>

                        <span className="text-lg text-gray-700 font-semibold">{quantity}</span>

                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="p-1 text-orange-600 hover:text-orange-700 transition"
                        >
                            <Plus size={18} />
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <ButtonComp
                        className="w-full rounded-xl flex items-center justify-center gap-2"
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart size={18} />  Add to Cart
                    </ButtonComp>
                </div>
            </div>
        </div>
    );
}

export default MenuItem;
