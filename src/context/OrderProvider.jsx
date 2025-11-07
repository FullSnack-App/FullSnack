import { useEffect, useState, useCallback, useMemo } from 'react';
import apiClient from '../config/axiosConfig';
import { OrdersContext } from './OrderContext';

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiClient.get('/orders/all');
                setOrders(response.data.items);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getOrderById = useCallback(
        (id) => orders.find((item) => item._id === id),
        [orders]
    );

    return (
        <OrdersContext.Provider
            value={{
                orders,
                loading,
                getOrderById,
                setLoading,
                setOrders,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
}
