import apiClient from '../config/axiosConfig';

/**
 * Cart Services
 * Handles all cart-related API calls to the backend
 */

export const cartServices = {
    /**
     * Get user's cart from backend
     */
    getCart: async () => {
        const response = await apiClient.get('/cart');
        return response.data;
    },

    /**
     * Add item(s) to cart
     * @param {Object} payload - Can be single item {menuItemId, quantity} or multiple {items: [{menuItemId, quantity}]}
     */
    addToCart: async (payload) => {
        // handle payload to be the items format
        if (!payload.items) {
            payload = { items: [payload] };
        }
        const response = await apiClient.post('/cart/items', { items: payload.items });
        return response.data;
    },

    /**
     * Update cart item quantity
     * @param {string} menuItemId
     * @param {number} quantity
     */
    updateCartItem: async (menuItemId, quantity) => {
        const response = await apiClient.patch('/cart/items', {
            menuItemId,
            quantity,
        });
        return response.data;
    },

    /**
     * Remove item from cart
     * @param {string} menuItemId
     */
    removeFromCart: async (menuItemId) => {
        const response = await apiClient.delete('/cart/items', {
            data: { menuItemId },
        });
        return response.data;
    },

    /**
     * Clear entire cart
     */
    clearCart: async () => {
        const response = await apiClient.delete('/cart');
        return response.data;
    },
};

export default cartServices;
