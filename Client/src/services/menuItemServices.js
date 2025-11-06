import apiClient from "../config/axiosConfig";
import { useMenu } from "../hooks/useMenu";


export async function toggleActivateItem(id, menuItems, setMenuItems) {
    try {
        const [item] = menuItems.filter((i) => { return i._id === id })
        console.log(item)
        const { data: updatedItem } = await apiClient.put(`/menu-items/${id}`, { isAvailable: !item.isAvailable });
        const newMenu = menuItems.map(item =>
            item._id === id ? updatedItem : item
        );
        console.log(updatedItem)
        setMenuItems(newMenu);
    } catch (error) {
        console.error("Error during deleting item")
    }

}
export async function addMenuItem(itemData) {
    try {
        const response = await apiClient.post("/menu-items", itemData);
        return response.data
    } catch (error) {
        console.error("Server Error:", error.response?.data || error.message);
        throw error;
    }
}

export async function updateMenuItem(id, updatedData) {
  try {
    const response = await apiClient.put(`/menu-items/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
}
