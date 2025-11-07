import React from 'react';
import Button from '../../../components/Button';

const ProfileHeader = ({ profileData, handleLogout }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-linear-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {profileData.fullName || 'User'}
                        </h1>
                        <p className="text-gray-500 mt-1">{profileData.email}</p>
                    </div>
                </div>
                <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-6 py-2">
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default ProfileHeader;
