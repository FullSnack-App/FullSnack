import apiClient from "../config/axiosConfig";

export async function toggleActivateOffer(id, currentValue) {
  try {
    const { data } = await apiClient.put(`/offers/${id}`, { isActive: !currentValue });
    return data; 
  } catch (error) {
    console.error("Error during updating item:", error);
    throw error;
  }
}


export async function addOffer(itemData) {
    try {
        const response = await apiClient.post("/offers", itemData);
        return response.data
    } catch (error) {
        console.error("Server Error:", error.response?.data || error.message);
        throw error;
    }
}

export async function updateOffer(id, updatedData) {
    try {
        const response = await apiClient.put(`/offers/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
}
