import { Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../config/routes';

const ProtectedAminRoute = ({ children }) => {
    const { isAuthenticated, isLoading, role } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated || role === 'admin') {
        if (!location.pathname.startsWith(ROUTES.ADMIN)) {
            return <Navigate to={ROUTES.ADMIN} replace />;
        }
        return children;
    }

    if (location.pathname.startsWith(ROUTES.ADMIN)) {
        return <Navigate to={ROUTES.HOME} replace />;
    }


    return children;
};

export default ProtectedAminRoute;
