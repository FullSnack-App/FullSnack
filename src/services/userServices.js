import apiClient from '../config/axiosConfig';

/**
 * User Services
 * Handles all user-related API calls
 */

/**
 * Get current user profile
 * @returns {Promise} User data
 */
export const getUserProfile = async () => {
    try {
        const response = await apiClient.get('/user/me');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Update user profile
 * @param {Object} userData - Updated user data (fullName, email, age, phone)
 * @returns {Promise} Updated user data
 */
export const updateUserProfile = async (userData) => {
    try {
        const response = await apiClient.patch('/user/update', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Change user password
 * @param {Object} passwords - { currentPassword, newPassword }
 * @returns {Promise} Success message
 */
export const changePassword = async (passwords) => {
    try {
        const response = await apiClient.patch('/user/change-password', passwords);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get user orders
 * @returns {Promise} Orders list
 */
export const getUserOrders = async () => {
    try {
        const response = await apiClient.get('/orders');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise} Order details
 */
export const getOrderById = async (orderId) => {
    try {
        const response = await apiClient.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
