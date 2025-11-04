import { useEffect, useState, useCallback } from 'react';
import { MenuContext } from './MenuContext';
import apiClient from '../config/axiosConfig';

export function MenuProvider({ children }) {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get('/menu-items');
                setMenuItems(response.data.items);
            } catch (error) {
                console.error('Failed to fetch menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getMenuItemById = useCallback(
        (id) => menuItems.find((item) => item._id === id),
        [menuItems]
    );

    return (
        <MenuContext.Provider value={{ menuItems, loading, getMenuItemById }}>
            {children}
        </MenuContext.Provider>
    );
}
