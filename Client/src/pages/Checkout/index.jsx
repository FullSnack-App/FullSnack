import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

const Checkout = () => {
    // 🛒 Cart Data
    const items = [
        {
            menuItem: {
                _id: '6907151a4fd965cbdf027d75',
                name: 'Fresh Orange Juice',
                description: 'Freshly squeezed orange juice',
                price: 40,
                category: 'drink',
                rate: 4.6,
                imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
            },
            quantity: 4,
            _id: '690a7111f07a4eedc9d44fd4',
            discountApplied: 15,
            originalPrice: 40,
            priceAtAddition: 34,
        },
        {
            menuItem: {
                _id: '6907150e4fd965cbdf027d72',
                name: 'Chocolate Cake',
                description: 'Rich chocolate cake with fudge topping',
                price: 80,
                category: 'dessert',
                rate: 4.8,
                imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349',
            },
            quantity: 3,
            priceAtAddition: 72,
            originalPrice: 80,
            discountApplied: 10,
            _id: '690af34a793a8b12e1fbfb2a',
        },
    ];

    // 🧾 Flatten
    const detailedCartItems = useMemo(
        () =>
            items.map((item) => ({
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
        watch,
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            address: '',
            phone: '',
            paymentMethod: 'cash',
        },
    });

    const onSubmit = (data) => {
        console.log('✅ Order placed:', {
            customer: data,
            detailedCartItems,
        });
    };

    const selectedPayment = watch('paymentMethod');

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Checkout</h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                >
                    {/* 🧍 Customer Info Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Customer Information */}
                        <div className="bg-white shadow-md rounded-xl p-8 space-y-5">
                            <h3 className="text-2xl font-semibold text-orange-600">
                                Customer Information
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="label font-medium text-gray-600">
                                        Full Name
                                    </label>
                                    <input
                                        {...register('fullName', {
                                            required: 'Full name is required',
                                        })}
                                        className="input input-bordered w-full"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.fullName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="label font-medium text-gray-600">Email</label>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email address',
                                            },
                                        })}
                                        className="input input-bordered w-full"
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delivery Details */}
                        <div className="bg-white shadow-md rounded-xl p-8 space-y-5">
                            <h3 className="text-2xl font-semibold text-orange-600">
                                Delivery Details
                            </h3>

                            {/* Address */}
                            <div>
                                <label className="label font-medium text-gray-600">
                                    Delivery Address
                                </label>
                                <input
                                    {...register('address', { required: 'Address is required' })}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your delivery address"
                                />
                                {errors.address && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="label font-medium text-gray-600">
                                    Phone Number
                                </label>
                                <input
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[0-9]{10,15}$/,
                                            message: 'Enter a valid phone number',
                                        },
                                    })}
                                    className="input input-bordered w-full"
                                    placeholder="e.g. 01012345678"
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white shadow-md rounded-xl p-8 space-y-5">
                            <h3 className="text-2xl font-semibold text-orange-600">
                                Payment Method
                            </h3>
                            <div className="flex flex-col gap-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="cash"
                                        {...register('paymentMethod')}
                                        className="radio radio-orange"
                                    />
                                    <span>Cash on Delivery</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
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
                    <div className="bg-white shadow-md rounded-xl p-8 h-fit md:sticky md:top-24">
                        <h3 className="text-2xl font-semibold mb-6 text-orange-600">
                            Order Summary
                        </h3>

                        <ul className="divide-y divide-gray-200 mb-6">
                            {detailedCartItems.map((item) => (
                                <li key={item._id} className="flex gap-4 py-4 items-center">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                        <div className="text-sm mt-1">
                                            <span className="line-through text-gray-400 mr-2">
                                                ${item.originalPrice.toFixed(2)}
                                            </span>
                                            <span className="text-orange-600 font-semibold">
                                                ${item.priceAtAddition.toFixed(2)}
                                            </span>
                                            <span className="ml-2 text-green-600 font-medium">
                                                ({item.discountApplied}% OFF)
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <hr className="my-4" />
                        <div className="space-y-2 text-lg font-semibold">
                            <div className="flex justify-between text-gray-600">
                                <span>Total before discount</span>
                                <span>${totalBeforeDiscount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-orange-600">
                                <span>Total after discount</span>
                                <span>${totalAfterDiscount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>You saved</span>
                                <span>-${totalSaved.toFixed(2)}</span>
                            </div>
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
