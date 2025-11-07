import { useContext } from 'react';
import { CartProvider } from '../context/CartContext';
import AuthContext from '../context/AuthContext';

/**
 * AuthWrapper Component
 * Wraps CartProvider with authentication state from AuthContext
 * This allows CartProvider to access isAuthenticated prop
 */
const AuthWrapper = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    return <CartProvider isAuthenticated={isAuthenticated}>{children}</CartProvider>;
};

export default AuthWrapper;
