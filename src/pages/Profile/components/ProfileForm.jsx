import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const ProfileForm = ({ profileData, setProfileData, handleProfileUpdate }) => {
    return (
        <form onSubmit={handleProfileUpdate} className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Your Profile</h2>
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
    );
};

export default ProfileForm;
