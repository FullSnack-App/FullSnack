import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Star, Plus, Minus, ShoppingCart, ArrowLeft, StarIcon } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useMenu } from '../../hooks/useMenu';
import { useAuth } from '../../hooks/useAuth';
import commentServices from '../../services/commentServices';
import apiClient from '../../config/axiosConfig';
import toast from 'react-hot-toast';

const MenuItemDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getItemQuantity, isLoading: cartLoading } = useCart();
    const { getMenuItemById, loading: menuLoading, setMenuItems, menuItems } = useMenu();
    const { isAuthenticated, user } = useAuth();

    const [quantity, setQuantity] = useState(1);
    const [menuItem, setMenuItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        content: '',
        rating: 5,
    });
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        const item = getMenuItemById(id);
        if (item) {
            setMenuItem(item);
        }
    }, [id, getMenuItemById, menuItems]); // Add menuItems dependency to update when it changes

    // Fetch reviews for this menu item
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoadingReviews(true);
                const data = await commentServices.getCommentsByMenuItem(id);

                // Check if data is an object with comments
                if (data && typeof data === 'object' && !Array.isArray(data)) {
                    // API returns object with comments array
                    setReviews(data.comments || []);
                } else if (Array.isArray(data)) {
                    // API returns array directly
                    setReviews(data);
                } else {
                    // Unknown format

                    setReviews([]);
                }
            } catch (error) {
                toast.error('Failed to load reviews');
                setReviews([]);
            } finally {
                setLoadingReviews(false);
            }
        };

        if (id && menuItem) {
            fetchReviews();
        }
    }, [id, menuItem]);

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

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('Please login to submit a review');
            return;
        }

        if (!reviewForm.content.trim()) {
            toast.error('Please write a review');
            return;
        }

        try {
            setSubmittingReview(true);
            const submitResponse = await commentServices.createComment({
                userId: user._id,
                menuItemId: id,
                content: reviewForm.content,
                rating: reviewForm.rating,
            });

            // Reset form
            setReviewForm({ content: '', rating: 5 });
            setShowReviewForm(false);

            // Add a delay to ensure backend has updated the menuItem.rate
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Refresh reviews and menuItem from backend
            try {
                // Fetch updated reviews
                const reviewsData = await commentServices.getCommentsByMenuItem(id);

                // Update reviews
                if (reviewsData && typeof reviewsData === 'object' && !Array.isArray(reviewsData)) {
                    setReviews(reviewsData.comments || []);
                } else if (Array.isArray(reviewsData)) {
                    setReviews(reviewsData);
                }

                // Fetch ALL menu items to get the updated rate
                const allMenuItemsResponse = await apiClient.get('/menu-items');

                if (allMenuItemsResponse.data && allMenuItemsResponse.data.items) {
                    const allItems = allMenuItemsResponse.data.items;

                    // Find the updated menu item
                    const updatedMenuItem = allItems.find((item) => item._id === id);

                    if (updatedMenuItem) {
                        // Update local state
                        setMenuItem({ ...updatedMenuItem });

                        // Update global context
                        if (setMenuItems) {
                            setMenuItems(allItems);
                        }
                    } else {
                    }
                } else {
                }
            } catch (refreshError) {
                // Add the new review manually if refresh fails
                const newReview = {
                    _id: submitResponse._id,
                    userId: {
                        _id: user._id,
                        fullName: user.fullName,
                    },
                    menuItemId: id,
                    content: submitResponse.content,
                    rating: submitResponse.rating,
                    createdAt: submitResponse.createdAt || new Date().toISOString(),
                };
                setReviews([newReview, ...reviews]);
            }

            toast.success('Review submitted successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmittingReview(false);
        }
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
                                    {menuItem.rate ? menuItem.rate.toFixed(1) : '0.0'}
                                </span>
                            </div>
                            <span className="text-gray-500 dark:text-gray-400">
                                ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
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
                                        ${discountedPrice.toFixed(2)}
                                    </span>
                                    <span className="text-2xl line-through text-gray-400 dark:text-gray-500">
                                        ${menuItem.price.toFixed(2)}
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
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                            Customer Reviews
                        </h2>
                        {isAuthenticated && (
                            <button
                                onClick={() => setShowReviewForm(!showReviewForm)}
                                className="btn btn-primary"
                            >
                                {showReviewForm ? 'Cancel' : 'Write a Review'}
                            </button>
                        )}
                    </div>

                    {/* Review Form */}
                    {showReviewForm && (
                        <form
                            onSubmit={handleSubmitReview}
                            className="mb-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Rating
                                </label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setReviewForm({ ...reviewForm, rating: star })
                                            }
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-8 h-8 transition-colors ${
                                                    star <= reviewForm.rating
                                                        ? 'text-yellow-500 fill-yellow-500'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    value={reviewForm.content}
                                    onChange={(e) =>
                                        setReviewForm({ ...reviewForm, content: e.target.value })
                                    }
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                    placeholder="Share your experience with this item..."
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submittingReview}
                                className="btn btn-primary"
                            >
                                {submittingReview ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </form>
                    )}

                    {/* Rating Summary */}
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {menuItem.rate ? menuItem.rate.toFixed(1) : '0.0'}
                            </div>
                            <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(menuItem.rate || 0)
                                                ? 'text-yellow-500 fill-yellow-500'
                                                : 'text-gray-300 dark:text-gray-600'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </p>
                        </div>
                    </div>

                    {/* Reviews List */}
                    {loadingReviews ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Loading reviews...
                            </p>
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">
                                No reviews yet. Be the first to review this item!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                                                {review.userId?.fullName || 'Anonymous User'}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(review.createdAt).toLocaleDateString(
                                                    'en-US',
                                                    {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    }
                                                )}
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
                                        {review.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuItemDetails;
