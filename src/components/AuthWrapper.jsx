import { CartProvider } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const AuthWrapper = ({ children }) => {
    const { isAuthenticated } = useAuth();

    return <CartProvider isAuthenticated={isAuthenticated}>{children}</CartProvider>;
};

export default AuthWrapper;
