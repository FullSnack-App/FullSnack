import { useEffect, useState, useCallback, createContext, useMemo } from 'react';
import apiClient from '../config/axiosConfig';

export const MenuContext = createContext();

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

  // ✅ Automatically update filtered items when menuItems changes
  const filteredMenuItems = useMemo(
    () => menuItems.filter((item) => item.isAvailable === true),
    [menuItems]
  );

  return (
    <MenuContext.Provider
      value={{
        menuItems,          // for admin
        filteredMenuItems,  // for normal menu display
        loading,
        getMenuItemById,
        setLoading,
        setMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}
