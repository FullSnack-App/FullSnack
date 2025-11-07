import React from 'react';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'profile', label: 'Profile Information' },
        { id: 'orders', label: 'My Orders' },
    ];

    return (
        <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 px-6 font-semibold transition-all ${
                        activeTab === tab.id
                            ? 'bg-orange-600 text-white'
                            : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;
