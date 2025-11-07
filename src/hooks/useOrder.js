import { useContext } from 'react';
import { OrdersContext } from '../context/OrderContext';

export function useOrder() {
    const context = useContext(OrdersContext);
    if (!context) {
        throw new Error('useOrder must be used within a OrderProvider');
    }
    return context;
}
