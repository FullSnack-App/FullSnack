import apiClient from '../config/axiosConfig';

const commentServices = {
    // Create a new comment/review
    createComment: async (commentData) => {
        const response = await apiClient.post('/comments', commentData);
        return response.data;
    },

    // Get all comments for a specific menu item
    getCommentsByMenuItem: async (menuItemId) => {
        console.log(menuItemId);
        const response = await apiClient.get(`/comments/menu-item/${menuItemId}`);
        console.log("response is: ", response);
        // The API returns the data directly, not nested in response.data
        return response.data;
    },
};

export default commentServices;
