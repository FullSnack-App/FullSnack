import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
    getUserProfile,
    updateUserProfile,
    changePassword,
    getUserOrders,
} from '../../services/userServices';
import Input from '../../components/Input';
import Button from '../../components/Button';
import toast from 'react-hot-toast';

const Profile = () => {
    const { setUser, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    // Profile form state
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

    // Password form state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Load user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                const userData = data.user || data;
                setProfileData({
                    fullName: userData.fullName || '',
                    email: userData.email || '',
                    phoneNumber: userData.phoneNumber || '',
                    address: userData.address || '',
                });
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setUser]);

    // Load orders when orders tab is active
    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const fetchOrders = async () => {
        setOrdersLoading(true);
        try {
            const data = await getUserOrders();
            setOrders(data.orders || []);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to load orders');
        } finally {
            setOrdersLoading(false);
        }
    };

    // Handle profile update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Updating profile...');

        try {
            const response = await updateUserProfile(profileData);
            setUser(response.user || response);
            toast.dismiss(loadingToast);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to update profile');
        }
    };

    // Handle password change
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        const loadingToast = toast.loading('Changing password...');

        try {
            await changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            toast.dismiss(loadingToast);
            toast.success('Password changed successfully!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to change password');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
        } catch {
            toast.error('Failed to logout');
        }
    };

    // Get order status badge color
    const getStatusColor = (status) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-blue-100 text-blue-800',
            preparing: 'bg-purple-100 text-purple-800',
            delivering: 'bg-indigo-100 text-indigo-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {profileData.fullName
                                    ? profileData.fullName.charAt(0).toUpperCase()
                                    : 'U'}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">
                                    {profileData.fullName || 'User'}
                                </h1>
                                <p className="text-gray-500 mt-1">{profileData.email}</p>
                            </div>
                        </div>
                        <Button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 px-6 py-2"
                        >
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`flex-1 py-4 px-6 font-semibold transition-all ${
                                activeTab === 'profile'
                                    ? 'bg-orange-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Profile Information
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex-1 py-4 px-6 font-semibold transition-all ${
                                activeTab === 'security'
                                    ? 'bg-orange-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            Security
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`flex-1 py-4 px-6 font-semibold transition-all ${
                                activeTab === 'orders'
                                    ? 'bg-orange-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            My Orders
                        </button>
                    </div>

                    <div className="p-8">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <form onSubmit={handleProfileUpdate} className="max-w-2xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Update Your Profile
                                </h2>
                                <div className="space-y-6">
                                    <Input
                                        label="Full Name"
                                        type="text"
                                        id="fullName"
                                        value={profileData.fullName}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                fullName: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    <Input
                                        label="Email"
                                        type="email"
                                        id="email"
                                        value={profileData.email}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <Input
                                        label="Phone Number"
                                        type="tel"
                                        id="phoneNumber"
                                        value={profileData.phoneNumber}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                phoneNumber: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your phone number"
                                    />
                                    <Input
                                        label="Address"
                                        type="text"
                                        id="address"
                                        value={profileData.address}
                                        onChange={(e) =>
                                            setProfileData({
                                                ...profileData,
                                                address: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your address"
                                    />
                                    <Button type="submit" className="w-full py-3 text-lg">
                                        Update Profile
                                    </Button>
                                </div>
                            </form>
                        )}

                        {/* Security Tab */}
                        {activeTab === 'security' && (
                            <form onSubmit={handlePasswordChange} className="max-w-2xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Change Password
                                </h2>
                                <div className="space-y-6">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        id="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter current password"
                                        required
                                    />
                                    <Input
                                        label="New Password"
                                        type="password"
                                        id="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        id="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordData({
                                                ...passwordData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Password Requirements:</strong>
                                            <ul className="list-disc list-inside mt-2 space-y-1">
                                                <li>Minimum 6 characters</li>
                                                <li>Mix of letters and numbers recommended</li>
                                            </ul>
                                        </p>
                                    </div>
                                    <Button type="submit" className="w-full py-3 text-lg">
                                        Change Password
                                    </Button>
                                </div>
                            </form>
                        )}

                        {activeTab === 'orders' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Order History
                                </h2>
                                {ordersLoading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                                        <p className="mt-4 text-gray-600">Loading orders...</p>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-12">
                                        <svg
                                            className="mx-auto h-24 w-24 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        <p className="mt-4 text-xl text-gray-600">No orders yet</p>
                                        <p className="mt-2 text-gray-500">
                                            Start ordering to see your history here
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div
                                                key={order._id}
                                                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                                    <div>
                                                        <h3 className="font-semibold text-lg text-gray-800">
                                                            Order #
                                                            {order._id.slice(-8).toUpperCase()}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {new Date(
                                                                order.createdAt
                                                            ).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            })}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span
                                                            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                                                                order.status
                                                            )}`}
                                                        >
                                                            {order.status.charAt(0).toUpperCase() +
                                                                order.status.slice(1)}
                                                        </span>
                                                        <span className="text-lg font-bold text-orange-600">
                                                            $
                                                            {order.totalAmount?.toFixed(2) ||
                                                                '0.00'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Order Items */}
                                                {order.items && order.items.length > 0 && (
                                                    <div className="mt-4 space-y-2">
                                                        <p className="text-sm font-semibold text-gray-700">
                                                            Items:
                                                        </p>
                                                        <div className="grid gap-2">
                                                            {order.items.map((item, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                                                                >
                                                                    {item.menuItem?.imageUrl && (
                                                                        <img
                                                                            src={
                                                                                item.menuItem
                                                                                    .imageUrl
                                                                            }
                                                                            alt={
                                                                                item.menuItem
                                                                                    .name || 'Item'
                                                                            }
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                    )}
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-gray-800">
                                                                            {item.menuItem?.name ||
                                                                                'Unknown Item'}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            Quantity:{' '}
                                                                            {item.quantity}
                                                                        </p>
                                                                    </div>
                                                                    <p className="font-semibold text-gray-800">
                                                                        $
                                                                        {(
                                                                            item.priceAtPurchase *
                                                                            item.quantity
                                                                        ).toFixed(2)}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Delivery Info */}
                                                {order.deliveryAddress && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-semibold">
                                                                Delivery to:
                                                            </span>{' '}
                                                            {order.deliveryAddress}
                                                        </p>
                                                        {order.phoneNumber && (
                                                            <p className="text-sm text-gray-600 mt-1">
                                                                <span className="font-semibold">
                                                                    Phone:
                                                                </span>{' '}
                                                                {order.phoneNumber}
                                                            </p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
