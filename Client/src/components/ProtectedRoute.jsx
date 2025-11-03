import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    console.log('hi');
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.LOGIN} replace />;
    }

    return children;
};

export default ProtectedRoute;
