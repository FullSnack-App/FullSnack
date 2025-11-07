import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Star, Plus, Minus, ShoppingCart, ArrowLeft, StarIcon } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useMenu } from '../../hooks/useMenu';
import toast from 'react-hot-toast';

const MenuItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getItemQuantity, isLoading: cartLoading } = useCart();
    const { getMenuItemById, loading: menuLoading } = useMenu();
    
    const [quantity, setQuantity] = useState(1);
    const [menuItem, setMenuItem] = useState(null);
    const [reviews] = useState([
        {
            id: 1,
            userName: 'John Doe',
            rating: 5,
            comment: 'Absolutely delicious! The best I\'ve ever had.',
            date: '2025-11-05',
        },
        {
            id: 2,
            userName: 'Sarah Smith',
            rating: 4,
            comment: 'Great taste and quality. Highly recommend!',
            date: '2025-11-03',
        },
        {
            id: 3,
            userName: 'Mike Johnson',
            rating: 5,
            comment: 'Perfect portion size and amazing flavor.',
            date: '2025-11-01',
        },
    ]);

    useEffect(() => {
        const item = getMenuItemById(id);
        if (item) {
            setMenuItem(item);
        }
    }, [id, getMenuItemById]);

    const cartQuantity = getItemQuantity(id);

    const handleAddToCart = async () => {
        if (quantity <= 0) {
            toast.error('Quantity must be at least 1');
            return;
        }

        const menuItemDetails = {
            _id: menuItem._id,
            name: menuItem.name,
            description: menuItem.description,
            price: menuItem.offer?.priceAfterDiscount || menuItem.price,
            imageUrl: menuItem.imageUrl,
            rate: menuItem.rate,
            offer: menuItem.offer,
        };

        await addToCart(menuItem._id, quantity, menuItemDetails);
        setQuantity(1);
    };

    if (menuLoading || !menuItem) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading item details...</p>
                </div>
            </div>
        );
    }

    const discountedPrice = menuItem.offer?.priceAfterDiscount ?? null;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Menu</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Image Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                        <div className="relative">
                            <img
                                src={menuItem.imageUrl}
                                alt={menuItem.name}
                                className="w-full h-96 object-cover"
                            />
                            {menuItem.offer && (
                                <div className="absolute top-4 left-4 bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                                    -{menuItem.offer.discountPercent} OFF
                                </div>
                            )}
                            {cartQuantity > 0 && (
                                <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                                    {cartQuantity} in cart
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                        <div className="mb-4">
                            <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-medium capitalize">
                                {menuItem.category}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            {menuItem.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    {menuItem.rate}
                                </span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                                ({reviews.length} reviews)
                            </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-6 leading-relaxed">
                            {menuItem.description}
                        </p>

                        {/* Price */}
                        <div className="mb-8">
                            {discountedPrice ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                                        ${discountedPrice}
                                    </span>
                                    <span className="text-2xl line-through text-gray-400 dark:text-gray-500">
                                        ${menuItem.price}
                                    </span>
                                </div>
                            ) : (
                                <span className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                                    ${menuItem.price}
                                </span>
                            )}
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 px-6 py-3 rounded-xl w-fit">
                                <button
                                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                    className="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition"
                                    disabled={cartLoading}
                                >
                                    <Minus size={20} />
                                </button>
                                <span className="text-2xl font-semibold text-gray-900 dark:text-gray-100 min-w-[40px] text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity((q) => q + 1)}
                                    className="p-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition"
                                    disabled={cartLoading}
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={cartLoading || !menuItem.isAvailable}
                            className={`w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                                menuItem.isAvailable
                                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]'
                                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {cartLoading ? (
                                'Adding...'
                            ) : !menuItem.isAvailable ? (
                                'Currently Unavailable'
                            ) : (
                                <>
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                        Customer Reviews
                    </h2>

                    {/* Rating Summary */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {menuItem.rate}
                            </div>
                            <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(menuItem.rate)
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {reviews.length} reviews
                            </p>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                            {review.userName}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(review.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${
                                                    i < review.rating
                                                        ? 'text-yellow-500 fill-yellow-500'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {review.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemDetails;
