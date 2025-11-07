import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserProfile, updateUserProfile, getUserOrders } from '../../services/userServices';
import toast from 'react-hot-toast';
import LoadingSpinner from './components/LoadingSpinner';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import ProfileForm from './components/ProfileForm';
import OrderHistory from './components/OrderHistory';

const Profile = () => {
    const { setUser, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
    });

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

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully!');
        } catch {
            toast.error('Failed to logout');
        }
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <ProfileHeader profileData={profileData} handleLogout={handleLogout} />

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="p-8">
                        {activeTab === 'profile' && (
                            <ProfileForm
                                profileData={profileData}
                                setProfileData={setProfileData}
                                handleProfileUpdate={handleProfileUpdate}
                            />
                        )}

                        {activeTab === 'orders' && (
                            <OrderHistory orders={orders} ordersLoading={ordersLoading} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
