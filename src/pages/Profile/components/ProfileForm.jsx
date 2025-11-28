import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const ProfileForm = ({ profileData, setProfileData, handleProfileUpdate }) => {
    return (
        <form onSubmit={handleProfileUpdate} className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Update Your Profile</h2>
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
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                        setProfileData({
                            ...profileData,
                            phone: e.target.value,
                        })
                    }
                    placeholder="Enter your phone number"
                />
                <Input
                    label="Age"
                    type="number"
                    id="age"
                    value={profileData.age}
                    onChange={(e) =>
                        setProfileData({
                            ...profileData,
                            age: e.target.value,
                        })
                    }
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                />
                <Button type="submit" className="w-full py-3 text-lg">
                    Update Profile
                </Button>
            </div>
        </form>
    );
};

export default ProfileForm;
