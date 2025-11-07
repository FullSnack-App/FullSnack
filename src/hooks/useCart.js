import { useContext } from 'react';
import CartContext from '../context/CartContext';

/**
 * Custom hook to use Cart Context
 * @returns {Object} Cart context value with all cart methods and state
 */
export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};

export default useCart;
