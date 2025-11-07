import React, { useMemo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import apiClient from '../../config/axiosConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Checkout = () => {
    // 🛒 Cart Data from backend
      const navigate = useNavigate();

    const [items, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await apiClient.get('/cart');
                console.log(response.data.cart.items);
                setCartItems(response.data.cart.items || []);
            } catch (error) {
                console.error('❌ Failed to fetch cart:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    // 🧾 Flatten cart items for rendering
    const detailedCartItems = useMemo(
        () =>
            (items || []).map((item) => ({
                ...item.menuItem,
                quantity: item.quantity,
                discountApplied: item.discountApplied,
                priceAtAddition: item.priceAtAddition,
                originalPrice: item.originalPrice,
            })),
        [items]
    );

    // 💰 Totals
    const totalBeforeDiscount = detailedCartItems.reduce(
        (acc, item) => acc + item.originalPrice * item.quantity,
        0
    );
    const totalAfterDiscount = detailedCartItems.reduce(
        (acc, item) => acc + item.priceAtAddition * item.quantity,
        0
    );
    const totalSaved = totalBeforeDiscount - totalAfterDiscount;

    // 🧾 React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            customerFullName: '',
            customerEmail: '',
            deliveryAddress: '',
            phoneNumber: '',
            paymentMethod: 'cash',
        },
    });

    const onSubmit = async (data) => {
        const loadingToast = toast.loading('Processing your order...');
        try {
            const response = await apiClient.post('orders/checkout', {
                ...data,
            });
            toast.dismiss(loadingToast);
            console.log(response);
            if (response.data.checkoutUrl) {
                toast.loading('Redirecting to Stripe checkout...');

                window.location.href = response.data.checkoutUrl;
            } else {
                toast.success('Order placed successfully!');
                setTimeout(() => {
                    navigate(`/order-success/${response.data.order._id}`);
                }, 500);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Checkout failed. Please try again.');
            console.error('❌ Checkout failed:', error);
        }
    };

    if (loading) return <div className="h-83 text-center py-20">Loading your cart...</div>;
    if (items.length === 0)
        return <div className="h-83 text-center py-20 text-gray-600 dark:text-gray-400">🛒 Your cart is empty.</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-10 text-gray-800 dark:text-gray-100 text-center">Checkout</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* 🧍 Customer Info Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Information */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-5">
                            <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
                                Customer Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="label font-medium text-gray-600 dark:text-gray-300">
                                        Full Name
                                    </label>
                                    <input
                                        {...register('customerFullName', {
                                            required: 'Full name is required',
                                        })}
                                        className="input input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.customerFullName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.customerFullName.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="label font-medium text-gray-600 dark:text-gray-300">Email</label>
                                    <input
                                        {...register('customerEmail', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className="input input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                                        placeholder="you@example.com"
                                    />
                                    {errors.customerEmail && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.customerEmail.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-5">
                            <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
                                Delivery Details
                            </h3>
                            <div>
                                <label className="label font-medium text-gray-600 dark:text-gray-300">
                                    Delivery Address
                                </label>
                                <input
                                    {...register('deliveryAddress', {
                                        required: 'Address is required',
                                    })}
                                    className="input input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                                    placeholder="Enter your delivery address"
                                />
                                {errors.deliveryAddress && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.deliveryAddress.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="label font-medium text-gray-600 dark:text-gray-300">
                                    Phone Number
                                </label>
                                <input
                                    {...register('phoneNumber', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9]{10,15}$/,
                                            message: 'Enter a valid phone number',
                                        },
                                    })}
                                    className="input input-bordered w-full bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                                    placeholder="e.g. 01012345678"
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.phoneNumber.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-5">
                            <h3 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
                                Payment Method
                            </h3>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-2 cursor-pointer dark:text-gray-200">
                                    <input
                                        type="radio"
                                        value="cash"
                                        {...register('paymentMethod')}
                                        className="radio radio-orange"
                                    />
                                    <span>Cash on Delivery</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer dark:text-gray-200">
                                    <input
                                        type="radio"
                                        value="card"
                                        {...register('paymentMethod')}
                                        className="radio radio-orange"
                                    />
                                    <span>Credit / Debit Card</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* 🧾 Order Summary Section */}
                    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 h-fit md:sticky md:top-24">
                        <h3 className="text-2xl font-semibold mb-6 text-orange-600 dark:text-orange-400">
                            Order Summary
                        </h3>

                        <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-6">
                            {detailedCartItems.map((item) => {
                                const hasDiscount =
                                    item.discountApplied &&
                                    item.discountApplied > 0 &&
                                    item.priceAtAddition < item.originalPrice;

                                return (
                                    <li key={item._id} className="flex gap-4 py-4 items-center">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                                {item.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Qty: {item.quantity}
                                            </p>

                                            <div className="text-sm mt-1 dark:text-gray-300">
                                                {hasDiscount ? (
                                                    <>
                                                        <span className="line-through text-gray-400 dark:text-gray-500 mr-2">
                                                            ${item.originalPrice.toFixed(2)}
                                                        </span>
                                                        <span className="text-orange-600 dark:text-orange-400 font-semibold">
                                                            ${item.priceAtAddition.toFixed(2)}
                                                        </span>
                                                        <span className="ml-2 text-green-600 dark:text-green-400 font-medium">
                                                            ({item.discountApplied}% OFF)
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-800 dark:text-gray-200 font-semibold">
                                                        ${item.priceAtAddition.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>

                        <hr className="my-4 dark:border-gray-700" />
                        <div className="space-y-2 text-lg font-semibold">
                            {totalSaved > 0 && (
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Total before discount</span>
                                    <span>${totalBeforeDiscount.toFixed(2)}</span>
                                </div>
                            )}

                            <div
                                className={`flex justify-between ${
                                    totalSaved > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-gray-800 dark:text-gray-200'
                                }`}
                            >
                                <span>Total</span>
                                <span>${totalAfterDiscount.toFixed(2)}</span>
                            </div>

                            {totalSaved > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>You saved</span>
                                    <span>-${totalSaved.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block mt-6 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold"
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
