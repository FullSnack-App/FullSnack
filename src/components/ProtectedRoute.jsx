import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, role } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to={ROUTES.HOME} replace />;
    }


    return children;
};

export default ProtectedRoute;
