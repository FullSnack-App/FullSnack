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
        phone: '',
        age: '',
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
                    phone: userData.phone || '',
                    age: userData.age || '',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Only run once on mount

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
            // Prepare data according to backend API spec
            const updateData = {
                fullName: profileData.fullName,
                email: profileData.email,
                phone: profileData.phone,
                age: profileData.age ? parseInt(profileData.age) : undefined,
            };
            
            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === undefined || updateData[key] === '') {
                    delete updateData[key];
                }
            });
            
            const response = await updateUserProfile(updateData);
            const updatedUser = response.user || response;
            setUser(updatedUser);
            
            // Update local state with response
            setProfileData({
                fullName: updatedUser.fullName || '',
                email: updatedUser.email || '',
                phone: updatedUser.phone || '',
                age: updatedUser.age || '',
                address: updatedUser.address || '',
            });
            
            toast.dismiss(loadingToast);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Update profile error:', error);
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
